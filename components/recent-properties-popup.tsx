"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { X, Clock, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getRecentProperties, Property, formatPrice } from '@/lib/properties-data'

interface RecentPropertiesPopupProps {
  isOpen: boolean
  onClose: () => void
  onViewProperty: (property: Property) => void
}

export function RecentPropertiesPopup({ isOpen, onClose, onViewProperty }: RecentPropertiesPopupProps) {
  const recentProperties = getRecentProperties(7).slice(0, 3)

  if (recentProperties.length === 0) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: 50 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 50, x: 50 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-20 right-4 md:bottom-8 md:right-8 z-40 w-[calc(100%-2rem)] md:w-96 bg-card rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-primary text-primary-foreground">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span className="font-semibold">Recently Added</span>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center hover:bg-primary-foreground/30 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Properties List */}
          <div className="p-4 space-y-3">
            {recentProperties.map((property, index) => (
              <motion.button
                key={property.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => {
                  onViewProperty(property)
                  onClose()
                }}
                className="w-full flex gap-3 p-2 rounded-xl hover:bg-secondary transition-colors text-left"
              >
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground text-sm line-clamp-1">
                    {property.title}
                  </h4>
                  <div className="flex items-center text-muted-foreground text-xs mt-1">
                    <MapPin className="w-3 h-3 mr-1" />
                    <span className="truncate">{property.location}</span>
                  </div>
                  <div className="text-primary font-semibold text-sm mt-1">
                    ₹{formatPrice(property.price)}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-border">
            <Button
              onClick={onClose}
              variant="outline"
              className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              View All Recent Properties
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
