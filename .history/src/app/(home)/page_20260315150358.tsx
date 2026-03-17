import { CTA } from "@/components/cta";
import { FeaturedCourses } from "@/components/features";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { WhyChooseUs } from "@/components/logo-cloud";
import { Navbar1 } from "@/components/navbar1";
import { TopCourses, TutorCarousel } from "@/components/top-turors";

export default function Home() {
  return (
    <div>
      <Navbar1 />
      <Hero />
      <TutorCarousel />
      <FeaturedCourses />
      <WhyChooseUs />
      <CTA />
      <Footer />
    </div>
  );
}
