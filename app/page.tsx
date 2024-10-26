import { auth } from "./lib/auth";
import { CTA } from "./components/Cta";
import { Hero } from "./components/Hero";
import { redirect } from "next/navigation";
import { Logos } from "./components/Logos";
import { Navbar } from "./components/Navbar";
import { Features } from "./components/Features";
import { Testimonial } from "./components/Testimonial";
import GalaxyBackground from "./components/GalaxyBackground";
import DarkModeNotification from "./components/DarkModeNotification";

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    return redirect("/dashboard");
  }

  return (
    <div>
      <DarkModeNotification />
      <div className="relative min-h-screen">
        <GalaxyBackground />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Navbar />
          <Hero />
          <Logos />
          <Features />
          <Testimonial />
          <CTA />
        </div>
      </div>
    </div>
  );
}
