"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calendar, Clock, ArrowRight, User } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Badge } from '@/components/ui/badge'

const blogPosts = [
  {
    id: 1,
    title: '10 Things to Check Before Buying Your First Home',
    excerpt: 'Buying your first home is exciting but can be overwhelming. Here are the essential things you need to check before making that big decision.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800',
    category: 'Buying Guide',
    author: 'Rajesh Kumar',
    date: 'March 25, 2026',
    readTime: '8 min read',
    featured: true
  },
  {
    id: 2,
    title: 'Understanding Property Registration in Karnataka',
    excerpt: 'A comprehensive guide to property registration process, stamp duty, and documentation required in Karnataka state.',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800',
    category: 'Legal',
    author: 'Priya Sharma',
    date: 'March 22, 2026',
    readTime: '6 min read',
    featured: false
  },
  {
    id: 3,
    title: 'Top 5 Upcoming Localities in Bangalore for Investment',
    excerpt: 'Discover the emerging real estate hotspots in Bangalore that offer excellent investment potential and appreciation.',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800',
    category: 'Investment',
    author: 'Amit Patel',
    date: 'March 18, 2026',
    readTime: '10 min read',
    featured: true
  },
  {
    id: 4,
    title: 'Home Loan vs Self-Funding: Which is Better?',
    excerpt: 'Analyze the pros and cons of taking a home loan versus self-funding your property purchase.',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800',
    category: 'Finance',
    author: 'Sneha Reddy',
    date: 'March 15, 2026',
    readTime: '7 min read',
    featured: false
  },
  {
    id: 5,
    title: 'Vastu Tips for Your New Home',
    excerpt: 'Learn about Vastu Shastra principles and how to apply them when selecting or designing your new home.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
    category: 'Lifestyle',
    author: 'Rajesh Kumar',
    date: 'March 10, 2026',
    readTime: '5 min read',
    featured: false
  },
  {
    id: 6,
    title: 'RERA: How It Protects Home Buyers',
    excerpt: 'Understanding the Real Estate Regulatory Authority and how it safeguards the interests of property buyers.',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800',
    category: 'Legal',
    author: 'Priya Sharma',
    date: 'March 5, 2026',
    readTime: '8 min read',
    featured: false
  }
]

const categories = ['All', 'Buying Guide', 'Investment', 'Legal', 'Finance', 'Lifestyle']

export default function BlogPage() {
  const featuredPosts = blogPosts.filter(post => post.featured)
  const regularPosts = blogPosts.filter(post => !post.featured)

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
              Real Estate Blog
            </span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mt-2 mb-6">
              Insights & Advice
            </h1>
            <p className="text-muted-foreground text-lg">
              Stay informed with the latest real estate trends, buying guides, investment tips, 
              and legal insights from our industry experts.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  index === 0 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-secondary text-foreground hover:bg-primary/10'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-8"
          >
            Featured Articles
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {featuredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Link href={`/blog/${post.id}`}>
                  <div className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-primary text-primary-foreground">
                          {post.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-serif text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {post.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {post.date}
                          </span>
                        </div>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.readTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* All Posts */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-8"
          >
            Latest Articles
          </motion.h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Link href={`/blog/${post.id}`}>
                  <div className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow h-full">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge variant="secondary" className="bg-card/90">
                          {post.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          {/* Load More */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              Load More Articles
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-primary-foreground/80 mb-6">
              Get the latest real estate insights, market updates, and expert advice delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary-foreground/50"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-background text-foreground rounded-lg hover:bg-background/90 transition-colors font-medium"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
