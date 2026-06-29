import { HomeBackground } from "@/components/marketing/home-background";
import { Hero } from "@/features/home/hero";
import {
  HomeFaq,
  HomeFeatures,
  HomeIndustries,
  HomeIntro,
  HomeProcess,
  HomeShowcase,
  HomeTestimonials,
  HomeWhy,
} from "@/components/marketing/home-sections";

export default function HomePage() {
  return (
    <HomeBackground>
      <Hero />
      <HomeIntro />
      <HomeWhy />
      <HomeIndustries />
      <HomeShowcase />
      <HomeProcess />
      <HomeFeatures />
      <HomeTestimonials />
      <HomeFaq />
    </HomeBackground>
  );
}
