import { CTA } from "./components/Cta";
import { Hero } from "./components/Hero";
import { Logos } from "./components/Logos";
import { Navbar } from "./components/Navbar";
import { Features } from "./components/Features";
import { Testimonial } from "./components/Testimonial";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Navbar />
      <Hero />
      <Logos />
      <Features />
      <Testimonial />
      <CTA />
    </div>
  );
}
