"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Maximize2, Bed, Bath, Heart, Share2, Eye, MessageCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Property, formatPrice } from '@/lib/properties-data'
import { cn } from '@/lib/utils'

interface PropertyCardProps {
  property: Property
  onQuickView: (property: Property) => void
  onWishlistToggle: (propertyId: string) => void
  isWishlisted: boolean
  index?: number
}

export function PropertyCard({ 
  property, 
  onQuickView, 
  onWishlistToggle, 
  isWishlisted,
  index = 0 
}: PropertyCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: property.title,
          text: `Check out this property: ${property.title}`,
          url: `${window.location.origin}/properties?id=${property.id}`,
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/properties?id=${property.id}`)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group"
    >
      <div className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
        {/* Image Container */}
        <div className="relative h-56 md:h-64 overflow-hidden">
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
          
          {/* Tags */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {property.tags.includes('new') && (
              <Badge className="bg-accent text-accent-foreground text-xs">New</Badge>
            )}
            {property.tags.includes('featured') && (
              <Badge className="bg-primary text-primary-foreground text-xs">Featured</Badge>
            )}
            {property.tags.includes('hot-deal') && (
              <Badge className="bg-destructive text-destructive-foreground text-xs">Hot Deal</Badge>
            )}
            {property.isRecent && (
              <Badge variant="secondary" className="bg-card/90 text-foreground text-xs">Recently Added</Badge>
            )}
          </div>

          {/* Action Buttons */}
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation()
                onWishlistToggle(property.id)
              }}
              className={cn(
                "w-9 h-9 rounded-full flex items-center justify-center transition-colors",
                isWishlisted 
                  ? "bg-destructive text-destructive-foreground" 
                  : "bg-card/80 backdrop-blur-sm text-foreground hover:bg-card"
              )}
            >
              <Heart className={cn("w-4 h-4", isWishlisted && "fill-current")} />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation()
                handleShare()
              }}
              className="w-9 h-9 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors"
            >
              <Share2 className="w-4 h-4 text-foreground" />
            </motion.button>
          </div>

          {/* Quick View Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            className="absolute bottom-3 left-3 right-3"
          >
            <Button
              onClick={() => onQuickView(property)}
              className="w-full bg-primary/90 backdrop-blur-sm hover:bg-primary text-primary-foreground"
            >
              <Eye className="w-4 h-4 mr-2" />
              Quick View
            </Button>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Price & Type */}
          <div className="flex items-center justify-between mb-2">
            <div className="text-xl font-bold text-primary">
              ₹{formatPrice(property.price)}
            </div>
            <Badge variant="outline" className="capitalize text-xs border-primary/30 text-primary">
              {property.propertyType}
            </Badge>
          </div>

          {/* Title */}
          <h3 className="font-semibold text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors">
            {property.title}
          </h3>
          
          {/* Location */}
          <div className="flex items-center text-muted-foreground mb-3">
            <MapPin className="w-4 h-4 mr-1 text-primary flex-shrink-0" />
            <span className="text-sm truncate">{property.location}, {property.city}</span>
          </div>

          {/* Features */}
          <div className="flex items-center justify-between text-sm text-muted-foreground border-t border-border pt-3">
            {property.bedrooms ? (
              <div className="flex items-center gap-1">
                <Bed className="w-4 h-4" />
                <span>{property.bedrooms} Beds</span>
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <Badge variant="secondary" className="text-xs">{property.category.replace('-', ' ')}</Badge>
              </div>
            )}
            {property.bathrooms ? (
              <div className="flex items-center gap-1">
                <Bath className="w-4 h-4" />
                <span>{property.bathrooms} Baths</span>
              </div>
            ) : null}
            <div className="flex items-center gap-1">
              <Maximize2 className="w-4 h-4" />
              <span>{property.sqft.toLocaleString()} sqft</span>
            </div>
          </div>

          {/* Status Badge */}
          <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
            <Badge 
              variant={property.status === 'ready-to-move' ? 'default' : 'secondary'}
              className={cn(
                "text-xs",
                property.status === 'ready-to-move' 
                  ? "bg-accent text-accent-foreground" 
                  : "bg-muted text-muted-foreground"
              )}
            >
              {property.status === 'ready-to-move' ? 'Ready to Move' : 'Under Construction'}
            </Badge>
            <button className="flex items-center gap-1 text-xs text-primary hover:underline">
              <MessageCircle className="w-3 h-3" />
              Contact
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
