"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Users, Award, TrendingUp, Shield, CheckCircle2, ArrowRight, Phone, Mail } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

const benefits = [
  {
    icon: TrendingUp,
    title: 'High Commissions',
    description: 'Earn industry-leading commission rates on every successful transaction.'
  },
  {
    icon: Shield,
    title: 'Verified Listings',
    description: 'Access to our entire database of verified and premium property listings.'
  },
  {
    icon: Users,
    title: 'Training & Support',
    description: 'Regular training sessions and dedicated support from our expert team.'
  },
  {
    icon: Award,
    title: 'Recognition Programs',
    description: 'Quarterly awards and incentives for top-performing channel partners.'
  }
]

const requirements = [
  'Valid RERA registration (or willingness to obtain)',
  'Minimum 2 years experience in real estate',
  'Strong local market knowledge',
  'Professional network and client base',
  'Commitment to ethical business practices',
  'Good communication skills'
]

const testimonials = [
  {
    name: 'Suresh Menon',
    role: 'CP since 2020',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
    content: 'Partnering with GreenNest has been transformative for my business. The quality of listings and support is unmatched.'
  },
  {
    name: 'Kavitha Rao',
    role: 'CP since 2019',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
    content: 'The commission structure and timely payments make GreenNest my preferred partner for property sales.'
  },
  {
    name: 'Mohammed Rafi',
    role: 'CP since 2021',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
    content: 'Excellent training programs and a supportive team. I have grown my business significantly since joining.'
  }
]

export default function AuthorizedCPPage() {
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
            <span className="text-primary font-medium text-sm uppercase tracking-wider">
              Channel Partner Program
            </span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mt-2 mb-6">
              Become an Authorized CP
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              Join our network of trusted channel partners and grow your real estate business 
              with access to premium properties, higher commissions, and dedicated support.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Apply Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Link href="/properties">
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  View Properties
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-primary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '200+', label: 'Active CPs' },
              { value: '₹50Cr+', label: 'Commission Paid' },
              { value: '15%', label: 'Avg Commission' },
              { value: '48hrs', label: 'Payout Time' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center text-primary-foreground"
              >
                <div className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</div>
                <div className="text-primary-foreground/80 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-primary font-medium text-sm uppercase tracking-wider">
              Why Partner With Us
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-2">
              Partner Benefits
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl p-6 shadow-lg text-center"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 lg:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-primary font-medium text-sm uppercase tracking-wider">
              How It Works
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-2">
              Simple 4-Step Process
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: 1, title: 'Apply Online', description: 'Fill out the application form with your details' },
              { step: 2, title: 'Verification', description: 'Our team verifies your credentials and experience' },
              { step: 3, title: 'Onboarding', description: 'Complete training and get access to our platform' },
              { step: 4, title: 'Start Earning', description: 'Access listings and start closing deals' }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-card rounded-2xl p-6 shadow-lg h-full">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-lg text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-primary" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-primary font-medium text-sm uppercase tracking-wider">
                Eligibility
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">
                Requirements to Join
              </h2>
              <div className="space-y-4">
                {requirements.map((req, index) => (
                  <motion.div
                    key={req}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{req}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Application Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-2xl p-6 lg:p-8 shadow-xl"
            >
              <h3 className="font-serif text-2xl font-bold text-foreground mb-6">
                Apply to Become a CP
              </h3>
              <form className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Your name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="+91 98765 43210" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="you@example.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience">Years of Experience</Label>
                  <select
                    id="experience"
                    className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground"
                    required
                  >
                    <option value="">Select experience</option>
                    <option value="2-5">2-5 years</option>
                    <option value="5-10">5-10 years</option>
                    <option value="10+">10+ years</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rera">RERA Registration Number (if any)</Label>
                  <Input id="rera" placeholder="Enter RERA number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Tell us about yourself</Label>
                  <Textarea
                    id="message"
                    placeholder="Your experience, specialization, etc."
                    rows={4}
                  />
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  Submit Application
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 lg:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-primary font-medium text-sm uppercase tracking-wider">
              Success Stories
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-2">
              What Our CPs Say
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl p-6 shadow-lg"
              >
                <p className="text-muted-foreground mb-6 italic">&quot;{testimonial.content}&quot;</p>
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4">
              Have Questions?
            </h2>
            <p className="text-primary-foreground/80 mb-6 max-w-xl mx-auto">
              Our partnership team is ready to help you understand how you can benefit from joining our network.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="tel:+919876543210"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-background text-foreground rounded-lg hover:bg-background/90 transition-colors"
              >
                <Phone className="w-5 h-5" />
                Call Us
              </a>
              <a
                href="mailto:partners@greennest.com"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-primary-foreground/30 rounded-lg hover:bg-primary-foreground/10 transition-colors"
              >
                <Mail className="w-5 h-5" />
                Email Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
