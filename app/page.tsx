import { HeroSection } from "@/components/landing/hero-section"
import { FeaturesSection } from "@/components/landing/features-section"
import { MarketplacePreview } from "@/components/landing/marketplace-preview"
import { HarvestBogorSection } from "@/components/landing/harvest-bogor-section"
import { BogorQuestSection } from "@/components/landing/bogor-quest-section"
import { GeminiAISection } from "@/components/landing/gemini-ai-section"
import { AcademySection } from "@/components/landing/academy-section"
import { FooterSection } from "@/components/landing/footer-section"
import { Navbar } from "@/components/landing/navbar"

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
  )
}
