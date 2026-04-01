"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Key, Building2, Home, Warehouse, MapPin, Bed, Bath, Maximize2 } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { PropertyModal } from '@/components/property-modal'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Property, formatPrice } from '@/lib/properties-data'

// Rental properties data
const rentalProperties: Property[] = [
  {
    id: 'r1',
    title: '2BHK Furnished Apartment in Indiranagar',
    price: 45000,
    priceUnit: 'per_month',
     location: 'Madhapur',
    city: 'Hyderabad',
    propertyType: 'apartment',
    bhk: 2,
    sqft: 1100,
    category: 'resale',
    status: 'ready-to-move',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800'
    ],
    description: 'Beautifully furnished 2BHK apartment in the heart of Indiranagar. Walking distance to metro station, restaurants, and shopping.',
    amenities: ['Fully Furnished', 'Gym', 'Security', 'Power Backup', 'Parking'],
    tags: ['featured'],
    isRecent: true,
    createdAt: new Date('2026-03-28'),
    bedrooms: 2,
    bathrooms: 2,
    parking: 1,
    facing: 'East'
  },
  {
    id: 'r2',
    title: '3BHK Semi-Furnished in HSR Layout',
    price: 55000,
    priceUnit: 'per_month',
    location: 'Madhapur',
    city: 'Hyderabad',
    propertyType: 'apartment',
    bhk: 3,
    sqft: 1600,
    category: 'resale',
    status: 'ready-to-move',
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800'
    ],
    description: 'Spacious 3BHK semi-furnished apartment in HSR Layout. Close to tech parks and all amenities.',
    amenities: ['Semi Furnished', 'Swimming Pool', 'Gym', 'Clubhouse', 'Security'],
    tags: ['new'],
    isRecent: true,
    createdAt: new Date('2026-03-26'),
    bedrooms: 3,
    bathrooms: 3,
    parking: 2,
    facing: 'North'
  },
  {
    id: 'r3',
    title: 'Commercial Office Space in Koramangala',
    price: 150000,
    priceUnit: 'per_month',
     location: 'Madhapur',
    city: 'Hyderabad',
    propertyType: 'commercial',
    sqft: 2000,
    category: 'investor',
    status: 'ready-to-move',
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800'
    ],
    description: 'Prime commercial office space in Koramangala. Ideal for startups and established businesses.',
    amenities: ['Plug & Play', 'Conference Room', 'Parking', 'Cafeteria', '24/7 Access'],
    tags: ['hot-deal'],
    isRecent: false,
    createdAt: new Date('2026-03-20'),
    parking: 5,
    facing: 'East'
  },
  {
    id: 'r4',
    title: '1BHK Studio in Whitefield',
    price: 25000,
    priceUnit: 'per_month',
     location: 'Madhapur',
    city: 'Hyderabad',
    propertyType: 'apartment',
    bhk: 1,
    sqft: 650,
    category: 'resale',
    status: 'ready-to-move',
    images: [
      'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'
    ],
    description: 'Cozy 1BHK studio apartment perfect for working professionals. Near IT parks.',
    amenities: ['Furnished', 'Security', 'Power Backup', 'Gym'],
    tags: [],
    isRecent: true,
    createdAt: new Date('2026-03-25'),
    bedrooms: 1,
    bathrooms: 1,
    parking: 1,
    facing: 'West'
  },
  {
    id: 'r5',
    title: 'Warehouse Space in Peenya',
    price: 200000,
    priceUnit: 'per_month',
     location: 'Madhapur',
    city: 'Hyderabad',
    propertyType: 'commercial',
    sqft: 10000,
    category: 'investor',
    status: 'ready-to-move',
    images: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800',
      'https://images.unsplash.com/photo-1553413077-190dd305871c?w=800'
    ],
    description: 'Large warehouse space in industrial area. Perfect for logistics and storage.',
    amenities: ['Loading Dock', 'Security', 'Fire Safety', 'Power Supply'],
    tags: ['featured'],
    isRecent: false,
    createdAt: new Date('2026-03-15'),
    parking: 10,
    facing: 'North'
  },
  {
    id: 'r6',
    title: '4BHK Villa with Garden',
    price: 125000,
    priceUnit: 'per_month',
  location: 'Madhapur',
    city: 'Hyderabad',
    propertyType: 'villa',
    bhk: 4,
    sqft: 3200,
    category: 'mandatory-projects',
    status: 'ready-to-move',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'
    ],
    description: 'Luxurious 4BHK villa with private garden. Perfect for families seeking space and privacy.',
    amenities: ['Private Garden', 'Swimming Pool', 'Gym', 'Clubhouse', 'Security'],
    tags: ['featured', 'new'],
    isRecent: true,
    createdAt: new Date('2026-03-27'),
    bedrooms: 4,
    bathrooms: 4,
    parking: 3,
    facing: 'East'
  }
]

const propertyTypeFilters = [
  { id: 'all', label: 'All Properties', icon: Building2 },
  { id: 'apartment', label: 'Apartments', icon: Home },
  { id: 'villa', label: 'Villas', icon: Home },
  { id: 'commercial', label: 'Commercial', icon: Warehouse }
]

export default function RentalPage() {
  const [selectedType, setSelectedType] = useState('all')
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [wishlist, setWishlist] = useState<Set<string>>(new Set())

  const filteredProperties = selectedType === 'all' 
    ? rentalProperties 
    : rentalProperties.filter(p => p.propertyType === selectedType)

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

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-secondary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Key className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              Rental & Leasing
            </h1>
            <p className="text-muted-foreground text-lg">
              Find the perfect rental property for your needs. From cozy apartments to spacious 
              commercial spaces, we have options for every budget.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Property Type Filter */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {propertyTypeFilters.map((filter, index) => (
              <motion.button
                key={filter.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedType(filter.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
                  selectedType === filter.id 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-secondary text-foreground hover:bg-primary/10'
                }`}
              >
                <filter.icon className="w-4 h-4" />
                {filter.label}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-2xl font-bold text-foreground">
              Available Rentals
            </h2>
            <span className="text-muted-foreground">
              {filteredProperties.length} properties found
            </span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                    
                    {/* Tags */}
                    <div className="absolute top-3 left-3 flex gap-2">
                      {property.tags.includes('featured') && (
                        <Badge className="bg-primary text-primary-foreground">Featured</Badge>
                      )}
                      {property.tags.includes('new') && (
                        <Badge className="bg-accent text-accent-foreground">New</Badge>
                      )}
                    </div>

                    {/* Price */}
                    <div className="absolute bottom-3 left-3">
                      <div className="text-2xl font-bold text-background">
                        ₹{property.price.toLocaleString()}<span className="text-sm font-normal">/month</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5">
                    <Badge variant="outline" className="mb-2 capitalize">
                      {property.propertyType}
                    </Badge>
                    
                    <h3 className="font-semibold text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                      {property.title}
                    </h3>
                    
                    <div className="flex items-center text-muted-foreground mb-4">
                      <MapPin className="w-4 h-4 mr-1 text-primary" />
                      <span className="text-sm">{property.location}, {property.city}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm text-muted-foreground border-t border-border pt-4">
                      {property.bedrooms && (
                        <div className="flex items-center gap-1">
                          <Bed className="w-4 h-4" />
                          <span>{property.bedrooms} Beds</span>
                        </div>
                      )}
                      {property.bathrooms && (
                        <div className="flex items-center gap-1">
                          <Bath className="w-4 h-4" />
                          <span>{property.bathrooms} Baths</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Maximize2 className="w-4 h-4" />
                        <span>{property.sqft.toLocaleString()} sqft</span>
                      </div>
                    </div>

                    <Button
                      onClick={() => setSelectedProperty(property)}
                      className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4">
              Looking to List Your Property?
            </h2>
            <p className="text-primary-foreground/80 mb-6 max-w-xl mx-auto">
              List your property with GreenNest and connect with thousands of potential tenants.
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="bg-background text-foreground hover:bg-background/90"
            >
              List Your Property
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />

      {/* Property Modal */}
      <PropertyModal
        property={selectedProperty}
        isOpen={!!selectedProperty}
        onClose={() => setSelectedProperty(null)}
        onWishlistToggle={toggleWishlist}
        isWishlisted={selectedProperty ? wishlist.has(selectedProperty.id) : false}
      />
    </main>
  )
}
