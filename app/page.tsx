import { HeroSection } from "@/components/home/hero-section"
import { CategorySection } from "@/components/home/category-section"
import { RecommendedSection } from "@/components/home/recommended-section"
import { QuickActions } from "@/components/home/quick-actions"
import { Header } from "@/components/header"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <div className="container mx-auto px-4 pb-8 space-y-8">
        <CategorySection />
        <RecommendedSection />
        <QuickActions />
      </div>
    </div>
  )
}
