import CinematicHero from "@/components/cinematic/CinematicHero";
import ClarityScene from "@/components/home/ClarityScene";
import JourneyScene from "@/components/home/JourneyScene";
import CapabilitiesScene from "@/components/home/CapabilitiesScene";
import IndustryScene from "@/components/home/IndustryScene";
import ProductsScene from "@/components/home/ProductsScene";
import WorkScene from "@/components/home/WorkScene";
import ProcessScene from "@/components/home/ProcessScene";
import FaqScene from "@/components/home/FaqScene";
import FinalScene from "@/components/home/FinalScene";

/**
 * The hero is untouched. Everything below it is one continuous narrative:
 * complexity -> connected systems -> capabilities -> industries -> products and hardware -> work -> process -> questions -> next step.
 */
export default function Home() {
  return (
    <>
      <CinematicHero />
      <ClarityScene />
      <JourneyScene />
      <CapabilitiesScene />
      <IndustryScene />
      <ProductsScene />
      <WorkScene />
      <ProcessScene />
      <FaqScene />
      <FinalScene />
    </>
  );
}
