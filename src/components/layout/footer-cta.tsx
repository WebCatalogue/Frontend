import Link from "next/link";
import { Button } from "@/components/ui";
import { ROUTES } from "@/constants";

export function FooterCta() {
  return (
    <section
      className="footer-cta relative flex min-h-[36rem] items-center justify-center overflow-visible px-5 py-20 sm:min-h-[42rem] sm:px-6 sm:py-24 lg:min-h-[46rem] lg:px-12 lg:py-28"
      aria-labelledby="footer-cta-title"
    >
      <div className="footer-cta-glow footer-cta-glow--left" aria-hidden />
      <div className="footer-cta-glow footer-cta-glow--right" aria-hidden />

      <div
        className="footer-hands pointer-events-none absolute inset-0"
        aria-hidden
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/footer/footer-hand-top.png?v=3"
          alt=""
          className="footer-hand footer-hand--down"
          draggable={false}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/footer/footer-hand-bottom.png?v=3"
          alt=""
          className="footer-hand footer-hand--up"
          draggable={false}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-xl px-4 text-center lg:max-w-2xl">
        <h2
          id="footer-cta-title"
          className="type-display-md text-foreground font-[family-name:var(--font-display)] tracking-tight"
        >
          Build premium websites without starting from scratch.
        </h2>
        <p className="type-body-lg text-foreground-muted mt-4 max-w-lg">
          Combine industry templates, premium components, and themes — then we
          build it professionally for you.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <Button
            variant="primary"
            size="lg"
            className="rounded-full px-8"
            asChild
          >
            <Link href={ROUTES.visualise}>Visualise your website</Link>
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className="rounded-full px-6"
            asChild
          >
            <Link href={ROUTES.enquiry}>Submit enquiry</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
