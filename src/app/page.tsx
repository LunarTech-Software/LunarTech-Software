import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Position from "@/components/sections/Position";
import Results from "@/components/sections/Results";
import WhyLunar from "@/components/sections/WhyLunar";
import Solutions from "@/components/sections/Solutions";
import SystemsInAction from "@/components/sections/SystemsInAction";
import Support from "@/components/sections/Support";
import Packages from "@/components/sections/Packages";
import Process from "@/components/sections/Process";
import FAQ from "@/components/sections/FAQ";
import FinalCta from "@/components/FinalCta";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Position />
      <Results />
      <WhyLunar />
      <Solutions />
      <SystemsInAction />
      <Support />
      <Packages />
      <Process />
      <FAQ />
      <FinalCta />
    </>
  );
}
