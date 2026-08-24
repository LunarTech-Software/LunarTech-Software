"use client";

export default function LivePreviewFrame({ url }: { url: string }) {
  const domain = url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  return (
    <div className="overflow-hidden rounded-t-2xl border border-b-0 border-line bg-panel">
      <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
        <span className="h-2 w-2 rounded-full bg-accent" aria-hidden />
        <span className="font-mono text-[11px] tracking-wide text-muted">{domain}</span>
      </div>
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-void">
        <div className="absolute inset-0 origin-top-left" style={{ width: "400%", height: "400%", transform: "scale(0.25)" }}>
          <iframe src={url} title={domain} loading="lazy" className="h-full w-full border-0" tabIndex={-1} />
        </div>
        <div className="pointer-events-none absolute inset-0" />
      </div>
    </div>
  );
}
