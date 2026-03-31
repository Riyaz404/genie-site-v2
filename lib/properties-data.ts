export interface Property {
  id: string
  title: string
  price: number
  priceUnit: 'total' | 'per_sqft' | 'per_month'
  location: string
  city: string
  propertyType: 'apartment' | 'villa' | 'land' | 'commercial'
  bhk?: number
  sqft: number
  category: 'mandatory-projects' | 'resale' | 'agricultural' | 'investor' | 'development'
  status: 'ready-to-move' | 'under-construction'
  images: string[]
  description: string
  amenities: string[]
  tags: ('new' | 'featured' | 'hot-deal')[]
  isRecent: boolean
  createdAt: Date
  developer?: string
  possession?: string
  floors?: number
  bedrooms?: number
  bathrooms?: number
  parking?: number
  facing?: string
}

export const properties: Property[] = [
  {
    id: '1',
    title: 'Luxury 3BHK Apartment in Whitefield',
    price: 12500000,
    priceUnit: 'total',
    location: 'Madhapur',
    city: 'Hyderabad',
    propertyType: 'apartment',
    bhk: 3,
    sqft: 1850,
    category: 'mandatory-projects',
    status: 'ready-to-move',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'
    ],
    description: 'Stunning 3BHK apartment with modern amenities, located in the heart of Whitefield. Features premium finishes, spacious balconies, and breathtaking city views.',
    amenities: ['Swimming Pool', 'Gym', 'Clubhouse', 'Children Play Area', '24/7 Security', 'Power Backup'],
    tags: ['featured', 'hot-deal'],
    isRecent: true,
    createdAt: new Date('2026-03-25'),
    developer: 'Prestige Group',
    possession: 'Immediate',
    floors: 15,
    bedrooms: 3,
    bathrooms: 3,
    parking: 2,
    facing: 'East'
  },
  {
    id: '2',
    title: 'Premium Villa with Garden',
    price: 35000000,
    priceUnit: 'total',
    location: 'Madhapur',
    city: 'Hyderabad',
    propertyType: 'villa',
    bhk: 4,
    sqft: 3500,
    category: 'mandatory-projects',
    status: 'ready-to-move',
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'
    ],
    description: 'Exquisite 4BHK villa with private garden, swimming pool, and state-of-the-art interiors. Perfect for families seeking luxury living.',
    amenities: ['Private Pool', 'Garden', 'Home Theater', 'Modular Kitchen', 'Smart Home', 'Security'],
    tags: ['new', 'featured'],
    isRecent: true,
    createdAt: new Date('2026-03-27'),
    developer: 'Brigade Group',
    possession: 'Immediate',
    floors: 3,
    bedrooms: 4,
    bathrooms: 5,
    parking: 3,
    facing: 'North-East'
  },
  {
    id: '3',
    title: 'Agricultural Land - 5 Acres',
    price: 8000000,
    priceUnit: 'total',
    location: 'Madhapur',
    city: 'Hyderabad',
    propertyType: 'land',
    sqft: 217800,
    category: 'agricultural',
    status: 'ready-to-move',
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800',
      'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800',
      'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800'
    ],
    description: 'Prime agricultural land near Devanahalli airport. Ideal for farming, organic cultivation, or long-term investment.',
    amenities: ['Bore Well', 'Fencing', 'Road Access', 'Electricity'],
    tags: ['hot-deal'],
    isRecent: false,
    createdAt: new Date('2026-03-10'),
    facing: 'South'
  },
  {
    id: '4',
    title: 'Modern 2BHK in Electronic City',
    price: 6500000,
    priceUnit: 'total',
    location: 'Madhapur',
    city: 'Hyderabad',
    propertyType: 'apartment',
    bhk: 2,
    sqft: 1200,
    category: 'resale',
    status: 'ready-to-move',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800'
    ],
    description: 'Well-maintained 2BHK apartment in a prime IT hub location. Close to major tech parks and excellent connectivity.',
    amenities: ['Gym', 'Swimming Pool', 'Security', 'Power Backup', 'Lift'],
    tags: [],
    isRecent: false,
    createdAt: new Date('2026-02-20'),
    possession: 'Immediate',
    floors: 12,
    bedrooms: 2,
    bathrooms: 2,
    parking: 1,
    facing: 'West'
  },
  {
    id: '5',
    title: 'Commercial Office Space',
    price: 18000000,
    priceUnit: 'total',
  location: 'Madhapur',
    city: 'Hyderabad',
    propertyType: 'commercial',
    sqft: 2500,
    category: 'investor',
    status: 'ready-to-move',
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800'
    ],
    description: 'Premium commercial office space on MG Road. Ideal for corporate offices, co-working spaces, or retail businesses.',
    amenities: ['Central AC', 'Lift', 'Parking', 'Fire Safety', 'Reception', 'Conference Room'],
    tags: ['featured'],
    isRecent: true,
    createdAt: new Date('2026-03-28'),
    floors: 8,
    parking: 10,
    facing: 'North'
  },
  {
    id: '6',
    title: 'Under Construction 3BHK - HSR Layout',
    price: 9500000,
    priceUnit: 'total',
    location: 'Madhapur',
    city: 'Hyderabad',
    propertyType: 'apartment',
    bhk: 3,
    sqft: 1650,
    category: 'development',
    status: 'under-construction',
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800'
    ],
    description: 'Upcoming luxury 3BHK in the sought-after HSR Layout. Book now at pre-launch prices and enjoy premium amenities.',
    amenities: ['Rooftop Garden', 'Gym', 'Swimming Pool', 'Clubhouse', 'EV Charging'],
    tags: ['new', 'hot-deal'],
    isRecent: true,
    createdAt: new Date('2026-03-26'),
    developer: 'Sobha Limited',
    possession: 'December 2027',
    floors: 20,
    bedrooms: 3,
    bathrooms: 3,
    parking: 2,
    facing: 'East'
  },
  {
    id: '7',
    title: 'Spacious 4BHK Penthouse',
    price: 45000000,
    priceUnit: 'total',
    location: 'Madhapur',
    city: 'Hyderabad',
    propertyType: 'apartment',
    bhk: 4,
    sqft: 4200,
    category: 'mandatory-projects',
    status: 'ready-to-move',
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
      'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800'
    ],
    description: 'Breathtaking penthouse with panoramic city views, private terrace, and world-class amenities. The epitome of luxury living.',
    amenities: ['Private Terrace', 'Jacuzzi', 'Home Theater', 'Wine Cellar', 'Concierge', 'Helipad Access'],
    tags: ['featured'],
    isRecent: false,
    createdAt: new Date('2026-02-15'),
    developer: 'Embassy Group',
    possession: 'Immediate',
    floors: 25,
    bedrooms: 4,
    bathrooms: 5,
    parking: 4,
    facing: 'North-East'
  },
  {
    id: '8',
    title: 'Investment Plot - 30x40',
    price: 4500000,
    priceUnit: 'total',
   location: 'Madhapur',
    city: 'Hyderabad',
    propertyType: 'land',
    sqft: 1200,
    category: 'investor',
    status: 'ready-to-move',
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800',
      'https://images.unsplash.com/photo-1628624747186-a941c476b7ef?w=800',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800'
    ],
    description: 'Prime residential plot in Yelahanka with excellent appreciation potential. BDA approved with clear title.',
    amenities: ['Corner Plot', 'Road Access', 'Electricity', 'Water Connection'],
    tags: ['hot-deal'],
    isRecent: true,
    createdAt: new Date('2026-03-24'),
    facing: 'East'
  },
  {
    id: '9',
    title: 'Resale 2BHK - Marathahalli',
    price: 5800000,
    priceUnit: 'total',
   location: 'Madhapur',
    city: 'Hyderabad',
    propertyType: 'apartment',
    bhk: 2,
    sqft: 1100,
    category: 'resale',
    status: 'ready-to-move',
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800'
    ],
    description: 'Excellent resale opportunity in Marathahalli. Well-maintained apartment with modern amenities and great connectivity.',
    amenities: ['Gym', 'Security', 'Power Backup', 'Lift', 'Car Parking'],
    tags: [],
    isRecent: false,
    createdAt: new Date('2026-03-01'),
    possession: 'Immediate',
    floors: 10,
    bedrooms: 2,
    bathrooms: 2,
    parking: 1,
    facing: 'South'
  },
  {
    id: '10',
    title: 'Luxury Villa Project - Launching Soon',
    price: 55000000,
    priceUnit: 'total',
    location: 'Madhapur',
    city: 'Hyderabad',
    propertyType: 'villa',
    bhk: 5,
    sqft: 5000,
    category: 'development',
    status: 'under-construction',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'
    ],
    description: 'Exclusive 5BHK villas in a gated community. World-class amenities, lush landscaping, and unparalleled luxury.',
    amenities: ['Clubhouse', 'Tennis Court', 'Swimming Pool', 'Spa', 'Private Garden', 'Smart Home'],
    tags: ['new', 'featured'],
    isRecent: true,
    createdAt: new Date('2026-03-29'),
    developer: 'Total Environment',
    possession: 'March 2028',
    floors: 3,
    bedrooms: 5,
    bathrooms: 6,
    parking: 4,
    facing: 'North'
  },
  {
    id: '11',
    title: 'Farm House with Coconut Grove',
    price: 15000000,
    priceUnit: 'total',
  location: 'Madhapur',
    city: 'Hyderabad',
    propertyType: 'land',
    sqft: 43560,
    category: 'agricultural',
    status: 'ready-to-move',
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800',
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800',
      'https://images.unsplash.com/photo-1591825729269-caeb344f6df2?w=800'
    ],
    description: 'Beautiful 1-acre farmhouse with mature coconut grove. Perfect for weekend getaway or organic farming.',
    amenities: ['Farm House', 'Bore Well', 'Coconut Trees', 'Mango Trees', 'Caretaker Room'],
    tags: ['featured'],
    isRecent: false,
    createdAt: new Date('2026-02-28'),
    facing: 'West'
  },
  {
    id: '12',
    title: 'Retail Space - Brigade Road',
    price: 25000000,
    priceUnit: 'total',
    location: 'Madhapur',
    city: 'Hyderabad',
    propertyType: 'commercial',
    sqft: 1800,
    category: 'investor',
    status: 'ready-to-move',
    images: [
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
      'https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=800',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800'
    ],
    description: 'Prime retail space on Brigade Road with heavy footfall. Excellent rental income potential.',
    amenities: ['Ground Floor', 'Glass Frontage', 'AC', 'Storage', 'Washroom'],
    tags: ['hot-deal'],
    isRecent: true,
    createdAt: new Date('2026-03-22'),
    floors: 1,
    parking: 0,
    facing: 'East'
  }
]

export const locations = ['madhapur', 'KPHB colony', 'Gachiwoli', 'Lakadi ka pol']

export const categories = [
  { id: 'mandatory-projects', label: 'Mandatory Projects', description: 'New launches from top developers' },
  { id: 'resale', label: 'Resale Properties', description: 'Pre-owned properties at great prices' },
  { id: 'agricultural', label: 'Agricultural Lands', description: 'Farm lands and agricultural plots' },
  { id: 'investor', label: 'Investor Units', description: 'High ROI investment opportunities' },
  { id: 'development', label: 'Development Properties', description: 'Under construction projects' }
] as const

export const propertyTypes = ['apartment', 'villa', 'land', 'commercial'] as const
export const bhkOptions = [1, 2, 3, 4, 5] as const

export function formatPrice(price: number): string {
  if (price >= 10000000) {
    return `${(price / 10000000).toFixed(2)} Cr`
  } else if (price >= 100000) {
    return `${(price / 100000).toFixed(2)} L`
  }
  return price.toLocaleString('en-IN')
}

export function getRecentProperties(days: number = 7): Property[] {
  const cutoffDate = new Date()
  cutoffDate.setDate(cutoffDate.getDate() - days)
  return properties.filter(p => p.createdAt >= cutoffDate)
}

export function filterProperties(filters: {
  category?: string
  location?: string
  propertyType?: string
  bhk?: number
  minPrice?: number
  maxPrice?: number
  status?: string
  recentOnly?: boolean
}): Property[] {
  return properties.filter(property => {
    if (filters.category && property.category !== filters.category) return false
    if (filters.location && property.location !== filters.location) return false
    if (filters.propertyType && property.propertyType !== filters.propertyType) return false
    if (filters.bhk && property.bhk !== filters.bhk) return false
    if (filters.minPrice && property.price < filters.minPrice) return false
    if (filters.maxPrice && property.price > filters.maxPrice) return false
    if (filters.status && property.status !== filters.status) return false
    if (filters.recentOnly && !property.isRecent) return false
    return true
  })
}
