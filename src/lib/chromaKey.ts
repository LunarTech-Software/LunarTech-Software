/** Loads an image and rewrites near-black pixels to fully transparent, returning a data URL. */
function chromaKeyBlackToTransparent(src: string, threshold = 24): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("2D canvas context unavailable"));
        return;
      }
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        if (data[i] <= threshold && data[i + 1] <= threshold && data[i + 2] <= threshold) {
          data[i + 3] = 0;
        }
      }
      ctx.putImageData(imageData, 0, 0);
      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
}

const cache = new Map<string, Promise<string>>();

/** Cached chroma-keyed version of an image src — only processes each src once per session. */
export function getChromaKeyedImage(src: string, threshold = 24): Promise<string> {
  const key = `${src}::${threshold}`;
  let entry = cache.get(key);
  if (!entry) {
    entry = chromaKeyBlackToTransparent(src, threshold);
    cache.set(key, entry);
  }
  return entry;
}
