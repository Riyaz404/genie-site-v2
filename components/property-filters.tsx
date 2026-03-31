"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Filter, X, ChevronDown, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { locations, categories, propertyTypes, bhkOptions, formatPrice } from '@/lib/properties-data'
import { cn } from '@/lib/utils'

export interface FilterState {
  category: string
  location: string
  propertyType: string
  bhk: number | null
  minPrice: number
  maxPrice: number
  status: string
  recentOnly: boolean
}

interface PropertyFiltersProps {
  filters: FilterState
  onFilterChange: (filters: FilterState) => void
  onReset: () => void
  totalResults: number
}

export function PropertyFilters({ filters, onFilterChange, onReset, totalResults }: PropertyFiltersProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    onFilterChange({ ...filters, [key]: value })
  }

  const handlePriceChange = (values: number[]) => {
    onFilterChange({
      ...filters,
      minPrice: values[0],
      maxPrice: values[1]
    })
  }

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="font-semibold text-foreground mb-3">Category</h3>
        <div className="space-y-2">
          <button
            onClick={() => updateFilter('category', '')}
            className={cn(
              "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
              filters.category === '' 
                ? "bg-primary text-primary-foreground" 
                : "bg-secondary hover:bg-secondary/80 text-foreground"
            )}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => updateFilter('category', cat.id)}
              className={cn(
                "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                filters.category === cat.id 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-secondary hover:bg-secondary/80 text-foreground"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Location */}
      <div>
        <h3 className="font-semibold text-foreground mb-3">Location</h3>
        <div className="relative">
          <select
            value={filters.location}
            onChange={(e) => updateFilter('location', e.target.value)}
            className="w-full px-3 py-2 bg-secondary rounded-lg border-0 text-foreground appearance-none cursor-pointer focus:ring-2 focus:ring-primary text-sm"
          >
            <option value="">All Locations</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        </div>
      </div>

      {/* Property Type */}
      <div>
        <h3 className="font-semibold text-foreground mb-3">Property Type</h3>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => updateFilter('propertyType', '')}
            className={cn(
              "px-3 py-2 rounded-lg text-sm transition-colors capitalize",
              filters.propertyType === '' 
                ? "bg-primary text-primary-foreground" 
                : "bg-secondary hover:bg-secondary/80 text-foreground"
            )}
          >
            All
          </button>
          {propertyTypes.map((type) => (
            <button
              key={type}
              onClick={() => updateFilter('propertyType', type)}
              className={cn(
                "px-3 py-2 rounded-lg text-sm transition-colors capitalize",
                filters.propertyType === type 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-secondary hover:bg-secondary/80 text-foreground"
              )}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* BHK */}
      <div>
        <h3 className="font-semibold text-foreground mb-3">BHK Type</h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => updateFilter('bhk', null)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm transition-colors",
              filters.bhk === null 
                ? "bg-primary text-primary-foreground" 
                : "bg-secondary hover:bg-secondary/80 text-foreground"
            )}
          >
            Any
          </button>
          {bhkOptions.map((bhk) => (
            <button
              key={bhk}
              onClick={() => updateFilter('bhk', bhk)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm transition-colors",
                filters.bhk === bhk 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-secondary hover:bg-secondary/80 text-foreground"
              )}
            >
              {bhk} BHK
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-semibold text-foreground mb-3">Budget Range</h3>
        <div className="px-2">
          <Slider
            value={[filters.minPrice, filters.maxPrice]}
            min={0}
            max={100000000}
            step={1000000}
            onValueChange={handlePriceChange}
            className="mb-4"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>₹{formatPrice(filters.minPrice)}</span>
            <span>₹{formatPrice(filters.maxPrice)}</span>
          </div>
        </div>
      </div>

      {/* Status */}
      <div>
        <h3 className="font-semibold text-foreground mb-3">Status</h3>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => updateFilter('status', '')}
            className={cn(
              "px-3 py-2 rounded-lg text-sm transition-colors",
              filters.status === '' 
                ? "bg-primary text-primary-foreground" 
                : "bg-secondary hover:bg-secondary/80 text-foreground"
            )}
          >
            All
          </button>
          <button
            onClick={() => updateFilter('status', 'ready-to-move')}
            className={cn(
              "px-3 py-2 rounded-lg text-sm transition-colors",
              filters.status === 'ready-to-move' 
                ? "bg-primary text-primary-foreground" 
                : "bg-secondary hover:bg-secondary/80 text-foreground"
            )}
          >
            Ready to Move
          </button>
          <button
            onClick={() => updateFilter('status', 'under-construction')}
            className={cn(
              "px-3 py-2 rounded-lg text-sm transition-colors col-span-2",
              filters.status === 'under-construction' 
                ? "bg-primary text-primary-foreground" 
                : "bg-secondary hover:bg-secondary/80 text-foreground"
            )}
          >
            Under Construction
          </button>
        </div>
      </div>

      {/* Recent Only Toggle */}
      <div className="flex items-center justify-between py-3 px-3 bg-secondary rounded-lg">
        <Label htmlFor="recent-toggle" className="text-sm font-medium cursor-pointer">
          Show Recent Only
        </Label>
        <Switch
          id="recent-toggle"
          checked={filters.recentOnly}
          onCheckedChange={(checked) => updateFilter('recentOnly', checked)}
        />
      </div>

      {/* Reset Button */}
      <Button
        variant="outline"
        onClick={onReset}
        className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
      >
        <RotateCcw className="w-4 h-4 mr-2" />
        Reset Filters
      </Button>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-72 flex-shrink-0">
        <div className="sticky top-24 bg-card rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-semibold text-lg text-foreground">Filters</h2>
            <span className="text-sm text-muted-foreground">{totalResults} results</span>
          </div>
          <FilterContent />
        </div>
      </aside>

      {/* Mobile Filter Button */}
      <div className="lg:hidden fixed bottom-4 left-4 right-4 z-40">
        <Button
          onClick={() => setIsMobileOpen(true)}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl"
        >
          <Filter className="w-5 h-5 mr-2" />
          Filters ({totalResults} results)
        </Button>
      </div>

      {/* Mobile Filter Sheet */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50 lg:hidden"
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 bg-card rounded-t-3xl shadow-2xl z-50 lg:hidden max-h-[85vh] overflow-hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h2 className="font-semibold text-lg text-foreground">Filters</h2>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="p-2 rounded-lg hover:bg-primary/10 transition-colors"
                >
                  <X className="w-5 h-5 text-foreground" />
                </button>
              </div>
              <div className="p-4 overflow-y-auto max-h-[calc(85vh-80px)]">
                <FilterContent />
              </div>
              <div className="p-4 border-t border-border">
                <Button
                  onClick={() => setIsMobileOpen(false)}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Show {totalResults} Results
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
