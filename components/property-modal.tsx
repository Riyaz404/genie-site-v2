"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, ChevronLeft, ChevronRight, MapPin, Maximize2, Bed, Bath, 
  Car, Compass, Calendar, Building2, Phone, MessageCircle, 
  Heart, Share2, CheckCircle2 
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Property, formatPrice } from '@/lib/properties-data'
import { cn } from '@/lib/utils'

interface PropertyModalProps {
  property: Property | null
  isOpen: boolean
  onClose: () => void
  onWishlistToggle: (propertyId: string) => void
  isWishlisted: boolean
}

export function PropertyModal({ property, isOpen, onClose, onWishlistToggle, isWishlisted }: PropertyModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showLeadForm, setShowLeadForm] = useState(false)
  const [leadFormData, setLeadFormData] = useState({ name: '', phone: '', email: '', message: '' })

  if (!property) return null

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length)
  }

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Hi, I'm interested in this property:\n\n${property.title}\nPrice: ₹${formatPrice(property.price)}\nLocation: ${property.location}, ${property.city}\n\nPlease share more details.`
    )
    window.open(`https://wa.me/919876543210?text=${message}`, '_blank')
  }

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle lead submission
    console.log('Lead submitted:', leadFormData)
    setShowLeadForm(false)
    setLeadFormData({ name: '', phone: '', email: '', message: '' })
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-8 lg:inset-16 bg-card rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors shadow-lg"
            >
              <X className="w-5 h-5 text-foreground" />
            </button>

            <div className="flex-1 overflow-y-auto">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Image Carousel */}
                <div className="relative h-64 md:h-80 lg:h-full lg:min-h-[500px]">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentImageIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      src={property.images[currentImageIndex]}
                      alt={`${property.title} - Image ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </AnimatePresence>

                  {/* Navigation Buttons */}
                  {property.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5 text-foreground" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors"
                      >
                        <ChevronRight className="w-5 h-5 text-foreground" />
                      </button>
                    </>
                  )}

                  {/* Image Indicators */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {property.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={cn(
                          "w-2 h-2 rounded-full transition-colors",
                          index === currentImageIndex ? "bg-primary" : "bg-card/60"
                        )}
                      />
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    {property.tags.includes('new') && (
                      <Badge className="bg-accent text-accent-foreground">New</Badge>
                    )}
                    {property.tags.includes('featured') && (
                      <Badge className="bg-primary text-primary-foreground">Featured</Badge>
                    )}
                    {property.tags.includes('hot-deal') && (
                      <Badge className="bg-destructive text-destructive-foreground">Hot Deal</Badge>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 lg:p-8 lg:overflow-y-auto lg:max-h-[calc(100vh-8rem)]">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="text-3xl font-bold text-primary mb-1">
                        ₹{formatPrice(property.price)}
                      </div>
                      <Badge 
                        variant={property.status === 'ready-to-move' ? 'default' : 'secondary'}
                        className={cn(
                          property.status === 'ready-to-move' 
                            ? "bg-accent text-accent-foreground" 
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        {property.status === 'ready-to-move' ? 'Ready to Move' : 'Under Construction'}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => onWishlistToggle(property.id)}
                        className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                          isWishlisted 
                            ? "bg-destructive text-destructive-foreground" 
                            : "bg-secondary text-foreground hover:bg-secondary/80"
                        )}
                      >
                        <Heart className={cn("w-5 h-5", isWishlisted && "fill-current")} />
                      </button>
                      <button className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors">
                        <Share2 className="w-5 h-5 text-foreground" />
                      </button>
                    </div>
                  </div>

                  <h1 className="font-serif text-2xl font-bold text-foreground mb-2">
                    {property.title}
                  </h1>

                  <div className="flex items-center text-muted-foreground mb-6">
                    <MapPin className="w-5 h-5 mr-2 text-primary" />
                    <span>{property.location}, {property.city}</span>
                  </div>

                  {/* Key Features */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {property.bedrooms && (
                      <div className="bg-secondary rounded-xl p-4 text-center">
                        <Bed className="w-6 h-6 mx-auto text-primary mb-2" />
                        <div className="text-sm text-muted-foreground">Bedrooms</div>
                        <div className="font-semibold text-foreground">{property.bedrooms}</div>
                      </div>
                    )}
                    {property.bathrooms && (
                      <div className="bg-secondary rounded-xl p-4 text-center">
                        <Bath className="w-6 h-6 mx-auto text-primary mb-2" />
                        <div className="text-sm text-muted-foreground">Bathrooms</div>
                        <div className="font-semibold text-foreground">{property.bathrooms}</div>
                      </div>
                    )}
                    <div className="bg-secondary rounded-xl p-4 text-center">
                      <Maximize2 className="w-6 h-6 mx-auto text-primary mb-2" />
                      <div className="text-sm text-muted-foreground">Area</div>
                      <div className="font-semibold text-foreground">{property.sqft.toLocaleString()} sqft</div>
                    </div>
                    {property.parking && (
                      <div className="bg-secondary rounded-xl p-4 text-center">
                        <Car className="w-6 h-6 mx-auto text-primary mb-2" />
                        <div className="text-sm text-muted-foreground">Parking</div>
                        <div className="font-semibold text-foreground">{property.parking}</div>
                      </div>
                    )}
                  </div>

                  {/* Additional Details */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {property.facing && (
                      <div className="flex items-center gap-3 text-sm">
                        <Compass className="w-5 h-5 text-primary" />
                        <div>
                          <div className="text-muted-foreground">Facing</div>
                          <div className="font-medium text-foreground">{property.facing}</div>
                        </div>
                      </div>
                    )}
                    {property.possession && (
                      <div className="flex items-center gap-3 text-sm">
                        <Calendar className="w-5 h-5 text-primary" />
                        <div>
                          <div className="text-muted-foreground">Possession</div>
                          <div className="font-medium text-foreground">{property.possession}</div>
                        </div>
                      </div>
                    )}
                    {property.developer && (
                      <div className="flex items-center gap-3 text-sm">
                        <Building2 className="w-5 h-5 text-primary" />
                        <div>
                          <div className="text-muted-foreground">Developer</div>
                          <div className="font-medium text-foreground">{property.developer}</div>
                        </div>
                      </div>
                    )}
                    {property.floors && (
                      <div className="flex items-center gap-3 text-sm">
                        <Building2 className="w-5 h-5 text-primary" />
                        <div>
                          <div className="text-muted-foreground">Total Floors</div>
                          <div className="font-medium text-foreground">{property.floors}</div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-foreground mb-2">Description</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {property.description}
                    </p>
                  </div>

                  {/* Amenities */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-foreground mb-3">Amenities</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {property.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                          <span className="text-muted-foreground">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Lead Form */}
                  {showLeadForm ? (
                    <motion.form
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      onSubmit={handleLeadSubmit}
                      className="space-y-4 bg-secondary rounded-xl p-4"
                    >
                      <h3 className="font-semibold text-foreground">Request a Callback</h3>
                      <Input
                        placeholder="Your Name"
                        value={leadFormData.name}
                        onChange={(e) => setLeadFormData({ ...leadFormData, name: e.target.value })}
                        required
                      />
                      <Input
                        placeholder="Phone Number"
                        type="tel"
                        value={leadFormData.phone}
                        onChange={(e) => setLeadFormData({ ...leadFormData, phone: e.target.value })}
                        required
                      />
                      <Input
                        placeholder="Email"
                        type="email"
                        value={leadFormData.email}
                        onChange={(e) => setLeadFormData({ ...leadFormData, email: e.target.value })}
                      />
                      <Textarea
                        placeholder="Your Message (Optional)"
                        value={leadFormData.message}
                        onChange={(e) => setLeadFormData({ ...leadFormData, message: e.target.value })}
                        rows={3}
                      />
                      <div className="flex gap-2">
                        <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
                          Submit
                        </Button>
                        <Button type="button" variant="outline" onClick={() => setShowLeadForm(false)}>
                          Cancel
                        </Button>
                      </div>
                    </motion.form>
                  ) : (
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <Button
                          onClick={() => setShowLeadForm(true)}
                          className="bg-primary hover:bg-primary/90 text-primary-foreground"
                        >
                          <Phone className="w-4 h-4 mr-2" />
                          Contact
                        </Button>
                        <Button
                          onClick={handleWhatsApp}
                          className="bg-accent hover:bg-accent/90 text-accent-foreground"
                        >
                          <MessageCircle className="w-4 h-4 mr-2" />
                          WhatsApp
                        </Button>
                      </div>
                      <Button
                        variant="outline"
                        className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                        onClick={() => setShowLeadForm(true)}
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        Schedule a Visit
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
