import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
})

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair'
})

export const metadata: Metadata = {
  title: 'Genie Realty | Premium Real Estate',
  description: 'Discover your dream property with GreenNest Realty. Browse premium apartments, villas, lands, and commercial properties across prime locations.',
  keywords: 'real estate, properties, apartments, villas, land, commercial, buy property, rent property',

  openGraph: {
    title: 'Genie Realty | Premium Real Estate',
    description: 'Discover your dream property with GreenNest Realty.',
    url: 'https://genierealty.com',
    siteName: 'Genie Realty',
    images: [
      {
        url: 'logo.png', // 👈 put your image in public folder
        width: 1200,
        height: 630,
        alt: 'Genie Realty Banner',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Genie Realty | Premium Real Estate',
    description: 'Discover your dream property with GreenNest Realty.',
    images: ['/og-image.jpg'], // same image
  },

  icons: {
    icon: '/logo.png', // 👈 put in public folder
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
