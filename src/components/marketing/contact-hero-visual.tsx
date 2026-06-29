import Image from "next/image";

export function ContactHeroVisual() {
  return (
    <div className="visualise-hero-visual contact-hero-visual relative mx-auto w-full max-w-[min(100%,440px)] lg:mx-0 lg:max-w-none">
      <div
        className="visualise-hero-glow visualise-hero-glow--purple"
        aria-hidden
      />
      <div
        className="visualise-hero-glow visualise-hero-glow--magenta"
        aria-hidden
      />
      <Image
        src="/contact/contact.png"
        alt="Neon envelope illustration inviting you to get in touch"
        width={1024}
        height={1536}
        priority
        sizes="(max-width: 1024px) 85vw, 42vw"
        className="relative z-10 mx-auto h-auto w-full object-contain"
      />
    </div>
  );
}
