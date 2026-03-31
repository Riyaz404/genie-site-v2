"use client"

import { motion } from 'framer-motion'
import { Shield, Award, Clock, HeartHandshake } from 'lucide-react'

const features = [
  {
    icon: Shield,
    title: 'Verified Properties',
    description: 'All our listings go through a rigorous verification process to ensure authenticity and clear titles.'
  },
  {
    icon: Award,
    title: 'Expert Guidance',
    description: 'Our experienced team provides personalized guidance throughout your property journey.'
  },
  {
    icon: Clock,
    title: 'Quick Process',
    description: 'Streamlined documentation and faster closings with our efficient transaction process.'
  },
  {
    icon: HeartHandshake,
    title: 'Customer First',
    description: 'Your satisfaction is our priority. We go above and beyond to exceed expectations.'
  }
]

export function WhyChooseUs() {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-primary font-medium text-sm uppercase tracking-wider">
              Why Choose Us
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2 mb-6">
              Your Trusted Real Estate Partner
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              With over a decade of experience in the real estate industry, we have helped thousands of families find their dream homes. Our commitment to excellence and customer satisfaction sets us apart.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden h-48">
                  <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600"
                    alt="Modern home exterior"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden h-64">
                  <img
                    src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600"
                    alt="Luxury interior"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="rounded-2xl overflow-hidden h-64">
                  <img
                    src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600"
                    alt="Modern living room"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden h-48">
                  <img
                    src="https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=600"
                    alt="Kitchen design"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Floating Stats Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground rounded-2xl p-6 shadow-xl"
            >
              <div className="text-4xl font-bold mb-1">12+</div>
              <div className="text-primary-foreground/80">Years of Excellence</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
