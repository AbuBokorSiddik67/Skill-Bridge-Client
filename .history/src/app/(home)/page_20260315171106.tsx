import { CTA } from "@/components/cta";
import { FeaturedCategories } from "@/components/featured-categories";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { WhyChooseUs } from "@/components/logo-cloud";
import { Navbar1 } from "@/components/navbar1";
import { TutorCarousel } from "@/components/top-turors";

export default function Home() {
  return (
    <div>
      <div className="fixed">
        <Navbar1 />
      </div>
      <Hero />
      <TutorCarousel />
      <FeaturedCategories />
      <WhyChooseUs />
      <CTA />
      <Footer />
    </div>
  );
}
