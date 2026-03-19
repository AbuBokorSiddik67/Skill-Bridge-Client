import { CTA } from "@/components/cta";
import { FeaturedCategories } from "@/components/featured-categories";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { WhyChooseUs } from "@/components/logo-cloud";
import { Navbar1 } from "@/components/navbar1";
import { TutorCarousel } from "@/components/top-turors";

export default async function Home() {
  return (
    <div className="relative">
      {/* Navbar Container */}
      <div className="fixed top-0 left-0 w-full z-50 border-b bg-background/80 backdrop-blur-md">
        <Navbar1 />
      </div>

      {/* Main Content - pt-20 adds space for the fixed navbar */}
      <main className="pt-20">
        <Hero />
        <TutorCarousel />
        <FeaturedCategories />
        <WhyChooseUs />
        <CTA />
        <Footer />
      </main>
    </div>
  );
}
