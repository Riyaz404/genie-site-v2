import { Navbar } from '@/components/navbar'
import { HeroSection } from '@/components/hero-section'
import { CategoriesSection } from '@/components/categories-section'
import { FeaturedProperties } from '@/components/featured-properties'
import { WhyChooseUs } from '@/components/why-choose-us'
import { Footer } from '@/components/footer'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <CategoriesSection />
      <FeaturedProperties />
      <WhyChooseUs />
      <Footer />
    </main>
  )
}
