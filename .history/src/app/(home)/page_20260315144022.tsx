import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { LogoCloud } from "@/components/logo-cloud";
import { Navbar1 } from "@/components/navbar1";

export default function Home() {
  return (
    <div>
      <Navbar1 />
      <Hero />
      <LogoCloud />
      
      <Footer />
    </div>
  );
}
