import { HeroSection } from "@/src/components/LandingPage/hero-section";
import { FeaturesSection } from "@/src/components/LandingPage/features-section";
import { MarketplacePreview } from "@/src/components/LandingPage/marketplace-preview";
import { HarvestBogorSection } from "@/src/components/LandingPage/harvest-bogor-section";
import { BogorQuestSection } from "@/src/components/LandingPage/bogor-quest-section";
import { GeminiAISection } from "@/src/components/LandingPage/gemini-ai-section";
import { AcademySection } from "@/src/components/LandingPage/academy-section";
import { FooterSection } from "@/src/components/LandingPage/footer-section";
import { Navbar } from "@/src/components/layouts/navbar";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background overflow-hidden">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <MarketplacePreview />
      <HarvestBogorSection />
      <BogorQuestSection />
      <GeminiAISection />
      <AcademySection />
      <FooterSection />
    </main>
  );
}
