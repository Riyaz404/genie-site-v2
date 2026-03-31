"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Building2, RefreshCcw, TreePine, TrendingUp, Hammer } from 'lucide-react'
import { categories } from '@/lib/properties-data'

const categoryIcons = {
  'mandatory-projects': Building2,
  'resale': RefreshCcw,
  'agricultural': TreePine,
  'investor': TrendingUp,
  'development': Hammer,
}

const categoryImages = {
  'mandatory-projects': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
  'resale': 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
  'agricultural': 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800',
  'investor': 'https://images.unsplash.com/photo-1460317442991-0ec209397118?w=800',
  'development': 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800',
}

export function CategoriesSection() {
  return (
    <section className="py-16 lg:py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Browse by Category
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2 mb-4">
            Property Categories
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find exactly what you&apos;re looking for with our specialized property categories.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6">
          {categories.map((category, index) => {
            const Icon = categoryIcons[category.id as keyof typeof categoryIcons]
            const image = categoryImages[category.id as keyof typeof categoryImages]
            
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/properties?category=${category.id}`}>
                  <div className="group relative h-64 lg:h-80 rounded-2xl overflow-hidden cursor-pointer">
                    {/* Background Image */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                      style={{ backgroundImage: `url(${image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/50 to-foreground/20 group-hover:from-primary/90 group-hover:via-primary/50 transition-colors duration-300" />
                    
                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                      <div className="w-16 h-16 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Icon className="w-8 h-8 text-background" />
                      </div>
                      <h3 className="font-semibold text-lg text-background mb-2">
                        {category.label}
                      </h3>
                      <p className="text-background/80 text-sm line-clamp-2">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
