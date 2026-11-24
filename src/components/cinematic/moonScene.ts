import * as THREE from "three";

/**
 * One continuous 3D space for the LUNAR opening shot.
 *
 * Everything on screen is a pure function of a single scrubbed value `p` (0..1):
 *   - the camera rides a Catmull-Rom spline (one unbroken move, no cuts)
 *   - the Moon never changes size, shape or light direction; only the camera moves
 *   - lighting, atmosphere, orbit rings and the "dawn" composite all derive from `p`
 */

const VOID = 0x090a0e;
const COPPER = new THREE.Color("#ffc9a0");
const IVORY_LIGHT = new THREE.Color("#fff1dc");

const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

/* ---------------------------------------------------------------- textures */

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Procedural lunar surface: albedo + height map, drawn once, no downloaded assets. */
function makeMoonTextures(w: number, h: number, craterCount: number) {
  const rand = mulberry32(1969);
  const color = document.createElement("canvas");
  const bump = document.createElement("canvas");
  color.width = bump.width = w;
  color.height = bump.height = h;
  const c = color.getContext("2d")!;
  const b = bump.getContext("2d")!;

  c.fillStyle = "#9b9a97";
  c.fillRect(0, 0, w, h);
  b.fillStyle = "#808080";
  b.fillRect(0, 0, w, h);

  // Maria: large, soft, darker basalt seas.
  for (let i = 0; i < 9; i++) {
    const x = rand() * w;
    const y = h * (0.28 + rand() * 0.44);
    const r = w * (0.05 + rand() * 0.09);
    for (const ox of [0, -w, w]) {
      const g = c.createRadialGradient(x + ox, y, 0, x + ox, y, r);
      g.addColorStop(0, "rgba(38,38,40,0.7)");
      g.addColorStop(0.7, "rgba(48,48,50,0.42)");
      g.addColorStop(1, "rgba(60,58,57,0)");
      c.fillStyle = g;
      c.beginPath();
      c.ellipse(x + ox, y, r * 1.3, r, 0, 0, Math.PI * 2);
      c.fill();
    }
  }

  // Craters: power-law sizes, drawn into both maps.
  for (let i = 0; i < craterCount; i++) {
    const x = rand() * w;
    const lat = (rand() - 0.5) * Math.PI * 0.92;
    const y = (0.5 + lat / Math.PI) * h;
    const r = (w / 2048) * (2.5 + Math.pow(rand(), 4.6) * 80);
    const stretch = 1 / Math.max(Math.cos(lat), 0.25);
    for (const ox of [0, -w, w]) {
      const px = x + ox;
      if (px < -r * 3 * stretch || px > w + r * 3 * stretch) continue;
      b.save();
      b.translate(px, y);
      b.scale(stretch, 1);
      // rim light, floor dark, soft ejecta
      const g = b.createRadialGradient(0, 0, 0, 0, 0, r * 1.45);
      g.addColorStop(0, "rgba(40,40,40,0.55)");
      g.addColorStop(0.6, "rgba(70,70,70,0.45)");
      g.addColorStop(0.8, "rgba(245,245,245,0.95)");
      g.addColorStop(0.9, "rgba(190,190,190,0.5)");
      g.addColorStop(1, "rgba(128,128,128,0)");
      b.fillStyle = g;
      b.beginPath();
      b.arc(0, 0, r * 1.45, 0, Math.PI * 2);
      b.fill();
      b.restore();

      c.save();
      c.translate(px, y);
      c.scale(stretch, 1);
      const cg = c.createRadialGradient(0, 0, 0, 0, 0, r * 1.7);
      cg.addColorStop(0, "rgba(70,68,66,0.35)");
      cg.addColorStop(0.7, "rgba(150,147,142,0.12)");
      cg.addColorStop(0.9, "rgba(205,200,192,0.28)");
      cg.addColorStop(1, "rgba(205,200,192,0)");
      c.fillStyle = cg;
      c.beginPath();
      c.arc(0, 0, r * 1.7, 0, Math.PI * 2);
      c.fill();
      c.restore();
    }
  }

  // Regolith grain, so the surface never looks airbrushed.
  for (const [ctx, amp] of [
    [c, 16],
    [b, 10],
  ] as const) {
    const img = ctx.getImageData(0, 0, w, h);
    const d = img.data;
    for (let i = 0; i < d.length; i += 4) {
      const n = (rand() - 0.5) * amp;
      d[i] += n;
      d[i + 1] += n;
      d[i + 2] += n;
    }
    ctx.putImageData(img, 0, 0);
  }

  const map = new THREE.CanvasTexture(color);
  map.colorSpace = THREE.SRGBColorSpace;
  const bumpMap = new THREE.CanvasTexture(bump);
  for (const t of [map, bumpMap]) {
    t.wrapS = THREE.RepeatWrapping;
    t.anisotropy = 4;
  }
  return { map, bumpMap };
}

/* ------------------------------------------------------------ dawn shader */

const dawnVert = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}`;

/**
 * The "darkness into light" composite. A warm ivory atmosphere rises from below the
 * horizon with a copper limb, the way daylight comes over a planet's edge. It is drawn
 * in the same frame as the Moon (not a crossfade), and carries the editorial lines.
 */
const dawnFrag = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform float uReveal;
uniform float uGlow;
uniform float uLines;
uniform float uAspect;
uniform vec2 uOrigin;
uniform vec2 uLineOrigin;
uniform float uTime;

float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }

void main() {
  vec3 ivory = vec3(0.9412, 0.9176, 0.8784);       // #F0EAE0
  vec3 copperHot = vec3(0.96, 0.52, 0.27);
  vec3 copperDeep = vec3(0.50, 0.21, 0.10);
  vec3 graphite = vec3(0.0902, 0.098, 0.1176);     // #17191E

  vec2 p = (vUv - uOrigin) * vec2(uAspect, 1.0);
  float d = length(p);
  float R = uReveal * 2.3;
  float edge = d - R;

  float inside = 1.0 - smoothstep(-0.004, 0.03, edge);
  float depth = max(-edge, 0.0);

  // copper limb just inside the edge, melting to ivory
  float limb = exp(-pow(depth / 0.16, 1.4));
  vec3 col = mix(ivory, copperHot, limb * 0.9);
  col = mix(col, copperDeep, exp(-pow(depth / 0.035, 1.2)) * 0.55);

  // soft copper halo outside the edge, lighting the dark scene from below
  float halo = exp(-max(edge, 0.0) / 0.2) * uGlow * (1.0 - inside);
  float alpha = max(inside, halo * 0.6);
  col = mix(copperHot, col, inside);

  // editorial lines: concentric graphite rings, only on the ivory
  vec2 lp = (vUv - uLineOrigin) * vec2(uAspect, 1.0);
  float L = length(lp) / 0.17;
  float w = fwidth(L) * 1.1;
  float ring = 1.0 - smoothstep(0.0, w + 0.004, abs(fract(L + 0.5) - 0.5));
  float lineMask = ring * uLines * smoothstep(0.55, 1.0, inside) * (1.0 - smoothstep(3.2, 6.5, L));
  col = mix(col, graphite, lineMask * 0.5);

  // dither to avoid banding in the long gradient
  col += (hash(gl_FragCoord.xy + uTime) - 0.5) / 255.0;
  gl_FragColor = vec4(col, alpha);
}`;

/* -------------------------------------------------------------- the scene */

export interface MoonScene {
  update(p: number, time: number): void;
  resize(width: number, height: number): void;
  dispose(): void;
}

export function createMoonScene(canvas: HTMLCanvasElement, opts: { mobile: boolean }): MoonScene {
  const { mobile } = opts;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: !mobile, alpha: false, powerPreference: "high-performance" });
  renderer.setClearColor(VOID, 1);
  renderer.autoClear = false;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 200);

  /* Moon */
  const tex = makeMoonTextures(mobile ? 1024 : 2048, mobile ? 512 : 1024, mobile ? 520 : 1300);
  const moonMat = new THREE.MeshStandardMaterial({
    map: tex.map,
    bumpMap: tex.bumpMap,
    bumpScale: 3.4,
    roughness: 1,
    metalness: 0,
  });
  const moon = new THREE.Mesh(new THREE.SphereGeometry(1, mobile ? 64 : 128, mobile ? 32 : 64), moonMat);
  moon.rotation.set(0.12, 2.4, 0.08);
  scene.add(moon);

  /* Atmosphere: a faint Fresnel shell, copper where the light grazes it. */
  const atmoMat = new THREE.ShaderMaterial({
    transparent: true,
    side: THREE.BackSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: { uColor: { value: COPPER.clone() }, uStrength: { value: 0.3 } },
    vertexShader: /* glsl */ `
      varying vec3 vN; varying vec3 vV;
      void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vN = normalize(normalMatrix * normal);
        vV = normalize(-mv.xyz);
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: /* glsl */ `
      varying vec3 vN; varying vec3 vV;
      uniform vec3 uColor; uniform float uStrength;
      void main() {
        float f = pow(clamp(dot(vN, vV) * -1.0 + 0.0, 0.0, 1.0), 2.6);
        gl_FragColor = vec4(uColor * f * uStrength, f * uStrength);
      }`,
  });
  const atmo = new THREE.Mesh(new THREE.SphereGeometry(1.07, 64, 32), atmoMat);
  scene.add(atmo);

  /* Lights: one copper key (fixed direction), one faint cool fill, one ivory rim. */
  const key = new THREE.DirectionalLight(COPPER, 2.6);
  key.position.set(3.2, 1.6, 2.4);
  const fill = new THREE.AmbientLight(0x2a2e3a, 0.5);
  const rim = new THREE.DirectionalLight(0xf0eae0, 0.28);
  rim.position.set(-3, 0.5, -2);
  scene.add(key, fill, rim);

  /* Orbit rings: fine copper ellipses with a node each, echoing the LUNAR mark. */
  const rings = new THREE.Group();
  scene.add(rings);
  const ringDefs = mobile
    ? [{ r: 1.55, rx: 1.2, rz: 0.32, nodes: 1 }, { r: 2.15, rx: 1.0, rz: -0.5, nodes: 1 }]
    : [
        { r: 1.5, rx: 1.22, rz: 0.32, nodes: 1 },
        { r: 2.0, rx: 1.0, rz: -0.52, nodes: 1 },
        { r: 2.7, rx: 1.36, rz: 0.95, nodes: 2 },
      ];
  const ringMats: THREE.LineBasicMaterial[] = [];
  const nodeMat = new THREE.MeshBasicMaterial({ color: 0xf0eae0, transparent: true });
  const nodeGeo = new THREE.SphereGeometry(0.02, 16, 12);
  const ringObjs = ringDefs.map((d, i) => {
    const pts: THREE.Vector3[] = [];
    const seg = mobile ? 160 : 256;
    for (let k = 0; k < seg; k++) {
      const a = (k / seg) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * d.r, Math.sin(a) * d.r, 0));
    }
    const mat = new THREE.LineBasicMaterial({ color: COPPER, transparent: true, opacity: 0 });
    ringMats.push(mat);
    const line = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(pts), mat);
    const pivot = new THREE.Group();
    pivot.add(line);
    const nodes: { mesh: THREE.Mesh; phase: number; speed: number }[] = [];
    for (let n = 0; n < d.nodes; n++) {
      const m = new THREE.Mesh(nodeGeo, nodeMat);
      pivot.add(m);
      nodes.push({ mesh: m, phase: i * 1.7 + n * Math.PI, speed: 0.18 + i * 0.05 });
    }
    rings.add(pivot);
    return { pivot, d, nodes, r: d.r };
  });

  /* Stars: a restrained field, fading out as the camera leaves the dark. */
  const starCount = mobile ? 260 : 520;
  const starPos = new Float32Array(starCount * 3);
  const rs = mulberry32(7);
  for (let i = 0; i < starCount; i++) {
    const th = rs() * Math.PI * 2;
    const ph = Math.acos(2 * rs() - 1);
    const rad = 60 + rs() * 30;
    starPos[i * 3] = rad * Math.sin(ph) * Math.cos(th);
    starPos[i * 3 + 1] = rad * Math.sin(ph) * Math.sin(th);
    starPos[i * 3 + 2] = rad * Math.cos(ph);
  }
  const starGeo = new THREE.BufferGeometry();
  starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
  const starMat = new THREE.PointsMaterial({ color: 0xf0eae0, size: 0.18, sizeAttenuation: true, transparent: true, opacity: 0.55, depthWrite: false });
  const stars = new THREE.Points(starGeo, starMat);
  scene.add(stars);

  /* Dawn overlay, drawn after the 3D pass in the same frame. */
  const overlayScene = new THREE.Scene();
  const overlayCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const dawnMat = new THREE.ShaderMaterial({
    transparent: true,
    depthTest: false,
    depthWrite: false,
    vertexShader: dawnVert,
    fragmentShader: dawnFrag,
    uniforms: {
      uReveal: { value: 0 },
      uGlow: { value: 0 },
      uLines: { value: 0 },
      uAspect: { value: 1.6 },
      uOrigin: { value: new THREE.Vector2(0.5, -0.32) },
      uLineOrigin: { value: new THREE.Vector2(0.82, 0.5) },
      uTime: { value: 0 },
    },
  });
  overlayScene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), dawnMat));

  /* Camera path: one spline, sampled by progress. Rebuilt per aspect ratio. */
  let posCurve: THREE.CatmullRomCurve3;
  let lookCurve: THREE.CatmullRomCurve3;
  let aspect = 1.6;
  const buildPath = () => {
    const wide = Math.min(1, aspect / 1.6); // 1 on desktop, smaller on tall screens
    const zk = aspect < 1.25 ? 1 + (1.25 - aspect) * 1.1 : 1; // pull back so the Moon is never awkwardly cropped
    const X = (x: number) => x * wide;
    // hero: Moon big, cropped bottom-right | approach | passing the limb | pull back, moon rises | dawn | settle
    const pos = [
      [X(-1.2), -0.1, 3.05 * zk],
      [X(-0.95), -0.02, 2.4 * zk],
      [X(0.1), 1.3, 2.05 * zk],
      [0, 1.0, 6.4 * zk],
      [0, 0.7, 8.6 * zk],
      [0, 0.6, 9.4 * zk],
    ];
    const look = [
      [X(-1.2), -0.1, 0],
      [X(-0.95), -0.02, 0],
      [X(-0.05), 0.82, 0.2],
      [0, -0.95, 0],
      [0, -1.3, 0],
      [0, -1.4, 0],
    ];
    posCurve = new THREE.CatmullRomCurve3(pos.map((v) => new THREE.Vector3(...v)), false, "catmullrom", 0.5);
    lookCurve = new THREE.CatmullRomCurve3(look.map((v) => new THREE.Vector3(...v)), false, "catmullrom", 0.5);
  };
  buildPath();

  const tmpPos = new THREE.Vector3();
  const tmpLook = new THREE.Vector3();
  const keyColor = new THREE.Color();

  const update = (p: number, time: number) => {
    posCurve.getPoint(p, tmpPos);
    lookCurve.getPoint(p, tmpLook);
    camera.position.copy(tmpPos);
    camera.lookAt(tmpLook);

    moon.rotation.y = 2.4 + time * 0.012 + p * 0.25; // constant, slow; never changes the Moon itself

    // lighting: copper key warms toward ivory as daylight arrives, intensity eases off as the Moon is overtaken
    const warm = smooth(0.5, 0.82, p);
    keyColor.copy(COPPER).lerp(IVORY_LIGHT, warm);
    key.color.copy(keyColor);
    key.intensity = 2.6 + 0.4 * smooth(0.2, 0.4, p) - 2.0 * smooth(0.62, 0.86, p);
    rim.intensity = 0.28 + 0.5 * smooth(0.25, 0.45, p);
    atmoMat.uniforms.uStrength.value = 0.28 + 0.55 * smooth(0.15, 0.42, p) - 0.5 * smooth(0.62, 0.84, p);

    // stars leave with the dark
    starMat.opacity = 0.55 * (1 - smooth(0.4, 0.66, p));

    // orbit rings: appear 20-45%, tilt toward the camera 45-75% (3D orbit -> flat diagram), then yield to the ivory
    const ringIn = smooth(0.17, 0.46, p);
    const ringOut = 1 - smooth(0.66, 0.84, p);
    const flat = smooth(0.42, 0.78, p);
    ringObjs.forEach((o, i) => {
      o.pivot.rotation.set(o.d.rx * (1 - flat), 0, o.d.rz * (1 - flat) + time * 0.01 * (i + 1));
      o.nodes.forEach((n) => {
        const a = n.phase + time * n.speed;
        n.mesh.position.set(Math.cos(a) * o.r, Math.sin(a) * o.r, 0);
      });
      ringMats[i].opacity = 0.62 * ringIn * ringOut;
    });
    nodeMat.opacity = smooth(0.44, 0.56, p) * ringOut; // nodes join once the camera has cleared them
    rings.visible = ringIn * ringOut > 0.002;

    // dawn: rises 58-84%, with a copper halo that starts earlier and lights the scene from below
    dawnMat.uniforms.uReveal.value = smooth(0.56, 0.86, p);
    dawnMat.uniforms.uGlow.value = smooth(0.46, 0.7, p) * (1 - smooth(0.82, 0.9, p));
    dawnMat.uniforms.uLines.value = smooth(0.66, 0.96, p);
    dawnMat.uniforms.uTime.value = time % 10;

    renderer.clear();
    renderer.render(scene, camera);
    renderer.clearDepth();
    renderer.render(overlayScene, overlayCam);
  };

  const resize = (w: number, h: number) => {
    renderer.setSize(w, h, false);
    aspect = w / Math.max(h, 1);
    camera.aspect = aspect;
    camera.updateProjectionMatrix();
    dawnMat.uniforms.uAspect.value = aspect;
    // keep the editorial rings on the right of the composition; centre them on tall screens
    dawnMat.uniforms.uLineOrigin.value.set(aspect < 1 ? 0.5 : 0.82, aspect < 1 ? 0.78 : 0.5);
    buildPath();
  };

  const dispose = () => {
    scene.traverse((o) => {
      const m = o as THREE.Mesh;
      m.geometry?.dispose?.();
    });
    [moonMat, atmoMat, nodeMat, starMat, dawnMat, ...ringMats].forEach((m) => m.dispose());
    tex.map.dispose();
    tex.bumpMap.dispose();
    renderer.dispose();
  };

  return { update, resize, dispose };
}
