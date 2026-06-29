import Image from "next/image";

export function VisualiseHeroVisual() {
  return (
    <div className="visualise-hero-visual relative mx-auto w-full max-w-[min(100%,640px)] lg:mx-0 lg:max-w-none">
      <div
        className="visualise-hero-glow visualise-hero-glow--purple"
        aria-hidden
      />
      <div
        className="visualise-hero-glow visualise-hero-glow--magenta"
        aria-hidden
      />
      <Image
        src="/visualise/laptop.png"
        alt="Laptop displaying a premium BhaiKiSite website preview"
        width={1024}
        height={682}
        priority
        sizes="(max-width: 1024px) 92vw, 46vw"
        className="relative z-10 h-auto w-full object-contain"
      />
    </div>
  );
}
