"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Search, MapPin, IndianRupee, Home, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { locations, propertyTypes } from '@/lib/properties-data'

export function HeroSection() {
  const router = useRouter()
  const [location, setLocation] = useState('')
  const [propertyType, setPropertyType] = useState('')
  const [budget, setBudget] = useState('')

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (location) params.set('location', location)
    if (propertyType) params.set('propertyType', propertyType)
    if (budget) params.set('budget', budget)
    router.push(`/properties?${params.toString()}`)
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80)',
          }}
        />
       <div className="absolute inset-0 bg-gradient-to-b from-white/65 via-white/50 to-white/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-block px-4 py-2 bg-primary/20 backdrop-blur-sm rounded-full text-primary-foreground text-sm font-medium mb-6"
          >
            Welcome to Genie Realty
          </motion.span>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 leading-tight text-balance">
            <span className="block">Find Your Perfect</span>
            <span className="text-green-700">Dream Property</span>
          </h1>
          
          <p className="text-black/70 text-lg md:text-xl max-w-2xl mx-auto">
            Discover premium apartments, luxurious villas, prime lands, and lucrative investment opportunities across Hyderabad.
          </p>
        </motion.div>

        {/* Search Box */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-card/95 backdrop-blur-md rounded-2xl shadow-2xl p-4 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {/* Location */}
              <div className="relative">
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full pl-10 pr-10 py-3 bg-secondary rounded-lg border-0 text-foreground appearance-none cursor-pointer focus:ring-2 focus:ring-primary"
                  >
                    <option value="">All Locations</option>
                    {locations.map((loc) => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                </div>
              </div>

              {/* Property Type */}
              <div className="relative">
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Property Type
                </label>
                <div className="relative">
                  <Home className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full pl-10 pr-10 py-3 bg-secondary rounded-lg border-0 text-foreground appearance-none cursor-pointer focus:ring-2 focus:ring-primary capitalize"
                  >
                    <option value="">All Types</option>
                    {propertyTypes.map((type) => (
                      <option key={type} value={type} className="capitalize">{type}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                </div>
              </div>

              {/* Budget */}
              <div className="relative">
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Budget
                </label>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full pl-10 pr-10 py-3 bg-secondary rounded-lg border-0 text-foreground appearance-none cursor-pointer focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Any Budget</option>
                    <option value="0-5000000">Up to 50 Lakhs</option>
                    <option value="5000000-10000000">50 L - 1 Cr</option>
                    <option value="10000000-25000000">1 Cr - 2.5 Cr</option>
                    <option value="25000000-50000000">2.5 Cr - 5 Cr</option>
                    <option value="50000000-999999999">5 Cr+</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                </div>
              </div>
            </div>

            <Button 
              onClick={handleSearch}
              className="w-full md:w-auto md:min-w-[200px] bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg font-semibold"
            >
              <Search className="w-5 h-5 mr-2" />
              Search Properties
            </Button>
          </div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-8 mt-8 text-background/80"
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary">1000+</div>
              <div className="text-gray-700">Properties Listed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary">250+</div>
              <div className="text-gray-700">Happy Customers</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary">50+</div>
              <div className="text-gray-700">Expert Agents</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary">2+</div>
              <div className="text-gray-700">Years Experience</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-background/50 rounded-full flex items-start justify-center p-2"
        >
          <div className="w-1.5 h-3 bg-background/50 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}
