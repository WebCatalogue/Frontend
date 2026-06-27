import { CtaBanner } from "@/components/layout";
import {
  HomeFaq,
  HomeFeatures,
  HomeHero,
  HomeIndustries,
  HomeIntro,
  HomeProcess,
  HomeShowcase,
  HomeTestimonials,
  HomeWhy,
} from "@/components/marketing/home-sections";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeIntro />
      <HomeWhy />
      <HomeIndustries />
      <HomeShowcase />
      <HomeProcess />
      <HomeFeatures />
      <HomeTestimonials />
      <HomeFaq />
      <CtaBanner />
    </>
  );
}
