import { CTA } from "@/components/cta";
import { FeaturedCourses } from "@/components/features";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { LogoCloud, WhyChooseUs } from "@/components/logo-cloud";
import { Navbar1 } from "@/components/navbar1";

export default function Home() {
  return (
    <div>
      <Navbar1 />
      <Hero />
      <WhyChooseUs />
      <FeaturedCourses />
      <CTA />
      <Footer />
    </div>
  );
}
