"use client"

import { useState, useEffect, useMemo, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Grid3X3, List, Sparkles, X } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { PropertyFilters, FilterState } from '@/components/property-filters'
import { PropertyCard } from '@/components/property-card'
import { PropertyModal } from '@/components/property-modal'
import { RecentPropertiesPopup } from '@/components/recent-properties-popup'
import { ChatBot } from '@/components/chatbot'
import { properties, Property, getRecentProperties } from '@/lib/properties-data'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const defaultFilters: FilterState = {
  category: '',
  location: '',
  propertyType: '',
  bhk: null,
  minPrice: 0,
  maxPrice: 100000000,
  status: '',
  recentOnly: false
}

function PropertiesContent() {
  const searchParams = useSearchParams()
  
  const [filters, setFilters] = useState<FilterState>(() => {
    const category = searchParams.get('category') || ''
    const location = searchParams.get('location') || ''
    const propertyType = searchParams.get('propertyType') || ''
    const budget = searchParams.get('budget')
    
    let minPrice = 0
    let maxPrice = 100000000
    
    if (budget) {
      const [min, max] = budget.split('-').map(Number)
      minPrice = min || 0
      maxPrice = max || 100000000
    }
    
    return {
      ...defaultFilters,
      category,
      location,
      propertyType,
      minPrice,
      maxPrice
    }
  })
  
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [wishlist, setWishlist] = useState<Set<string>>(new Set())
  const [showRecentPopup, setShowRecentPopup] = useState(false)
  
  // Get property from URL if present
  useEffect(() => {
    const propertyId = searchParams.get('id')
    if (propertyId) {
      const property = properties.find(p => p.id === propertyId)
      if (property) {
        setSelectedProperty(property)
      }
    }
  }, [searchParams])

  // Show recent properties popup on mount
  useEffect(() => {
    const recentProps = getRecentProperties(7)
    if (recentProps.length > 0) {
      const timer = setTimeout(() => {
        setShowRecentPopup(true)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [])

  const filteredProperties = useMemo(() => {
    return properties.filter(property => {
      if (filters.category && property.category !== filters.category) return false
      if (filters.location && property.location !== filters.location) return false
      if (filters.propertyType && property.propertyType !== filters.propertyType) return false
      if (filters.bhk && property.bhk !== filters.bhk) return false
      if (property.price < filters.minPrice) return false
      if (property.price > filters.maxPrice) return false
      if (filters.status && property.status !== filters.status) return false
      if (filters.recentOnly && !property.isRecent) return false
      return true
    })
  }, [filters])

  const toggleWishlist = (propertyId: string) => {
    setWishlist(prev => {
      const newSet = new Set(prev)
      if (newSet.has(propertyId)) {
        newSet.delete(propertyId)
      } else {
        newSet.add(propertyId)
      }
      return newSet
    })
  }

  const resetFilters = () => {
    setFilters(defaultFilters)
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header */}
      <section className="pt-24 pb-8 bg-secondary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Explore Properties
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Browse through our extensive collection of premium properties across Bangalore
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            {/* Filters Sidebar */}
            <PropertyFilters
              filters={filters}
              onFilterChange={setFilters}
              onReset={resetFilters}
              totalResults={filteredProperties.length}
            />

            {/* Property Grid */}
            <div className="flex-1 pb-20 lg:pb-0">
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-6">
                <div className="text-muted-foreground">
                  <span className="font-semibold text-foreground">{filteredProperties.length}</span> properties found
                </div>
                
                <div className="flex items-center gap-4">
                  {/* View Mode Toggle */}
                  <div className="hidden md:flex items-center gap-1 bg-secondary rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={cn(
                        "p-2 rounded-md transition-colors",
                        viewMode === 'grid' 
                          ? "bg-primary text-primary-foreground" 
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={cn(
                        "p-2 rounded-md transition-colors",
                        viewMode === 'list' 
                          ? "bg-primary text-primary-foreground" 
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Active Filters */}
              {(filters.category || filters.location || filters.propertyType || filters.bhk || filters.status || filters.recentOnly) && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-wrap gap-2 mb-6"
                >
                  {filters.category && (
                    <button
                      onClick={() => setFilters({ ...filters, category: '' })}
                      className="flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                    >
                      {filters.category.replace('-', ' ')}
                      <X className="w-3 h-3" />
                    </button>
                  )}
                  {filters.location && (
                    <button
                      onClick={() => setFilters({ ...filters, location: '' })}
                      className="flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                    >
                      {filters.location}
                      <X className="w-3 h-3" />
                    </button>
                  )}
                  {filters.propertyType && (
                    <button
                      onClick={() => setFilters({ ...filters, propertyType: '' })}
                      className="flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm capitalize"
                    >
                      {filters.propertyType}
                      <X className="w-3 h-3" />
                    </button>
                  )}
                  {filters.bhk && (
                    <button
                      onClick={() => setFilters({ ...filters, bhk: null })}
                      className="flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                    >
                      {filters.bhk} BHK
                      <X className="w-3 h-3" />
                    </button>
                  )}
                  {filters.status && (
                    <button
                      onClick={() => setFilters({ ...filters, status: '' })}
                      className="flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                    >
                      {filters.status.replace('-', ' ')}
                      <X className="w-3 h-3" />
                    </button>
                  )}
                  {filters.recentOnly && (
                    <button
                      onClick={() => setFilters({ ...filters, recentOnly: false })}
                      className="flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                    >
                      Recent Only
                      <X className="w-3 h-3" />
                    </button>
                  )}
                  <button
                    onClick={resetFilters}
                    className="px-3 py-1 text-destructive text-sm hover:underline"
                  >
                    Clear All
                  </button>
                </motion.div>
              )}

              {/* Property Grid */}
              {filteredProperties.length > 0 ? (
                <div className={cn(
                  "grid gap-6",
                  viewMode === 'grid' 
                    ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" 
                    : "grid-cols-1"
                )}>
                  <AnimatePresence mode="popLayout">
                    {filteredProperties.map((property, index) => (
                      <PropertyCard
                        key={property.id}
                        property={property}
                        onQuickView={setSelectedProperty}
                        onWishlistToggle={toggleWishlist}
                        isWishlisted={wishlist.has(property.id)}
                        index={index}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16"
                >
                  <div className="w-20 h-20 rounded-full bg-secondary mx-auto mb-4 flex items-center justify-center">
                    <Sparkles className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">No properties found</h3>
                  <p className="text-muted-foreground mb-4">Try adjusting your filters to see more results</p>
                  <Button onClick={resetFilters} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    Reset Filters
                  </Button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Property Detail Modal */}
      <PropertyModal
        property={selectedProperty}
        isOpen={!!selectedProperty}
        onClose={() => setSelectedProperty(null)}
        onWishlistToggle={toggleWishlist}
        isWishlisted={selectedProperty ? wishlist.has(selectedProperty.id) : false}
      />

      {/* Recent Properties Popup */}
      <RecentPropertiesPopup
        isOpen={showRecentPopup}
        onClose={() => setShowRecentPopup(false)}
        onViewProperty={setSelectedProperty}
      />

      {/* AI Chatbot */}
      <ChatBot onViewProperty={setSelectedProperty} />
    </main>
  )
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
      </div>
    }>
      <PropertiesContent />
    </Suspense>
  )
}
