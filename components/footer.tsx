"use client"

import Link from 'next/link'
import { Building2, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const footerLinks = {
  properties: [
    { label: 'Mandatory Projects', href: '/properties?category=mandatory-projects' },
    { label: 'Resale Properties', href: '/properties?category=resale' },
    { label: 'Agricultural Lands', href: '/properties?category=agricultural' },
    { label: 'Investor Units', href: '/properties?category=investor' },
    { label: 'Development Properties', href: '/properties?category=development' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Authorized CP', href: '/authorized-cp' },
    { label: 'Blog', href: '/blog' },
    { label: 'Careers', href: '/careers' },
  ],
  support: [
    { label: 'Help Center', href: '/help' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'FAQs', href: '/faqs' },
  ],
}

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
]

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
           <Link href="/" className="flex justify-center mb-4 overflow-visible">
  <img
    src="/logo.png"
    alt="Genie Realty"
    className="h-28 md:h-32 lg:h-36 w-auto object-contain scale-150"
  />
</Link>
            <p className="text-background/70 mb-6 max-w-sm">
              Your trusted partner in finding the perfect property. We connect dreams with reality through premium real estate solutions.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-background/70">
                <MapPin className="w-5 h-5 text-primary" />
                <span>Sarayu Spring field, 9th Phase Rd, near varmagroup, Kukatpally Housing Board Colony, Kukatpally, Hyderabad, Telangana 500085</span>
              </div>
              <div className="flex items-center gap-3 text-background/70">
                <Phone className="w-5 h-5 text-primary" />
                <span>+91 90638 77877</span>
              </div>
              <div className="flex items-center gap-3 text-background/70">
                <Mail className="w-5 h-5 text-primary" />
                <span>info@genierealty.com</span>
              </div>
            </div>
          </div>

          {/* Properties Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Properties</h4>
            <ul className="space-y-2">
              {footerLinks.properties.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-background/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-background/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Newsletter</h4>
            <p className="text-background/70 mb-4 text-sm">
              Subscribe to get the latest property updates and offers.
            </p>
            <div className="flex flex-col gap-2">
              <Input 
                type="email" 
                placeholder="Enter your email"
                className="bg-background/10 border-background/20 text-background placeholder:text-background/50"
              />
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground w-full">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-background/60 text-sm">
            &copy; {new Date().getFullYear()} Genie Realty. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors group"
              >
                <social.icon className="w-5 h-5 text-background/70 group-hover:text-primary-foreground" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
