"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Home, Building2, Users, Key, FileText, Info, Phone, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/properties', label: 'Properties', icon: Building2 },
  { href: '/authorized-cp', label: 'Authorized CP', icon: Users },
  { href: '/rental', label: 'Rental/Leasing', icon: Key },
  { href: '/blog', label: 'Real Estate Trends', icon: FileText },
  { href: '/about', label: 'About Us', icon: Info },
  { href: '/contact', label: 'Contact', icon: Phone },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled 
            ? "bg-card/95 backdrop-blur-md shadow-lg" 
            : "bg-transparent"
        )}
      >
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between h-32 lg:h-36">
            {/* Logo */}
         <img
  src="/logo.png"
  alt="Genie Realty"
  className="h-28 md:h-32 lg:h-36 w-auto object-contain scale-195"
/>
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors rounded-lg hover:bg-primary/5"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <Button variant="ghost" size="sm" className="text-foreground/80 hover:text-primary">
                <User className="w-4 h-4 mr-2" />
                Login
              </Button>
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Sign Up
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-primary/10 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-foreground" />
              ) : (
                <Menu className="w-6 h-6 text-foreground" />
              )}
            </button>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-[280px] bg-card shadow-2xl z-50 lg:hidden"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <span className="font-serif text-xl font-bold text-foreground">Menu</span>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-lg hover:bg-primary/10 transition-colors"
                  >
                    <X className="w-5 h-5 text-foreground" />
                  </button>
                </div>
                
                <div className="flex-1 overflow-y-auto py-4">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-foreground/80 hover:text-primary hover:bg-primary/5 transition-colors"
                      >
                        <link.icon className="w-5 h-5" />
                        <span className="font-medium">{link.label}</span>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <div className="p-4 border-t border-border space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-center border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Login
                  </Button>
                  <Button className="w-full justify-center bg-primary hover:bg-primary/90 text-primary-foreground">
                    Sign Up
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
