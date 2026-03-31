"use client"

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot, User, MapPin, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { properties, Property, formatPrice, locations, propertyTypes } from '@/lib/properties-data'
import { cn } from '@/lib/utils'

interface Message {
  id: string
  type: 'bot' | 'user'
  content: string
  properties?: Property[]
}

interface ChatBotProps {
  onViewProperty: (property: Property) => void
}

const initialMessages: Message[] = [
  {
    id: '1',
    type: 'bot',
    content: "Hi! I'm your AI Property Assistant. I can help you find your perfect property. What are you looking for today?\n\nYou can tell me about:\n• Your preferred location\n• Your budget\n• Property type (apartment, villa, land, commercial)\n• Number of bedrooms"
  }
]

export function ChatBot({ onViewProperty }: ChatBotProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const findMatchingProperties = (query: string): Property[] => {
    const queryLower = query.toLowerCase()
    
    // Extract criteria from query
    const matchedLocation = locations.find(loc => queryLower.includes(loc.toLowerCase()))
    const matchedType = propertyTypes.find(type => queryLower.includes(type))
    
    // Extract budget
    let maxBudget: number | null = null
    const croreMatch = queryLower.match(/(\d+)\s*(cr|crore)/i)
    const lakhMatch = queryLower.match(/(\d+)\s*(l|lakh|lac)/i)
    if (croreMatch) {
      maxBudget = parseInt(croreMatch[1]) * 10000000
    } else if (lakhMatch) {
      maxBudget = parseInt(lakhMatch[1]) * 100000
    }

    // Extract BHK
    const bhkMatch = queryLower.match(/(\d)\s*bhk/i)
    const bhk = bhkMatch ? parseInt(bhkMatch[1]) : null

    // Filter properties
    let filtered = properties

    if (matchedLocation) {
      filtered = filtered.filter(p => p.location.toLowerCase() === matchedLocation.toLowerCase())
    }
    if (matchedType) {
      filtered = filtered.filter(p => p.propertyType === matchedType)
    }
    if (maxBudget) {
      filtered = filtered.filter(p => p.price <= maxBudget!)
    }
    if (bhk) {
      filtered = filtered.filter(p => p.bhk === bhk)
    }

    // If no specific filters matched, do a general search
    if (!matchedLocation && !matchedType && !maxBudget && !bhk) {
      filtered = properties.filter(p => 
        p.title.toLowerCase().includes(queryLower) ||
        p.location.toLowerCase().includes(queryLower) ||
        p.description.toLowerCase().includes(queryLower) ||
        p.category.toLowerCase().includes(queryLower.replace(' ', '-'))
      )
    }

    return filtered.slice(0, 3)
  }

  const generateResponse = (query: string): { content: string; properties: Property[] } => {
    const queryLower = query.toLowerCase()
    
    // Greetings
    if (queryLower.match(/^(hi|hello|hey|good morning|good afternoon|good evening)/i)) {
      return {
        content: "Hello! Welcome to GreenNest Realty. How can I help you today? Looking for a new property?",
        properties: []
      }
    }

    // Find matching properties
    const matchedProperties = findMatchingProperties(query)

    if (matchedProperties.length > 0) {
      const locationMentioned = locations.find(loc => queryLower.includes(loc.toLowerCase()))
      const typeMentioned = propertyTypes.find(type => queryLower.includes(type))
      const bhkMatch = queryLower.match(/(\d)\s*bhk/i)

      let response = "Great! I found some properties that match your criteria"
      
      if (locationMentioned) response += ` in ${locationMentioned}`
      if (typeMentioned) response += ` (${typeMentioned}s)`
      if (bhkMatch) response += ` with ${bhkMatch[1]} bedrooms`
      
      response += ". Here are my top recommendations:"

      return { content: response, properties: matchedProperties }
    }

    // No properties found
    if (queryLower.includes('budget') || queryLower.includes('price') || queryLower.includes('cost')) {
      return {
        content: "I'd love to help you find properties within your budget! Could you tell me your budget range? For example: 'Under 1 Cr' or 'Between 50L to 1 Cr'",
        properties: []
      }
    }

    if (queryLower.includes('location') || queryLower.includes('area') || queryLower.includes('where')) {
      return {
        content: `We have properties in these prime locations: ${locations.join(', ')}. Which area interests you?`,
        properties: []
      }
    }

    if (queryLower.includes('type') || queryLower.includes('kind')) {
      return {
        content: "We offer various property types:\n• Apartments (1-4 BHK)\n• Villas\n• Lands (residential & agricultural)\n• Commercial spaces\n\nWhat type are you looking for?",
        properties: []
      }
    }

    // Default response
    return {
      content: "I couldn't find exact matches for your query. Could you provide more details? For example:\n• Location preference (e.g., Whitefield, Koramangala)\n• Budget range (e.g., under 1 Cr)\n• Property type (apartment, villa, land)\n• BHK requirement (e.g., 3 BHK)",
      properties: []
    }
  }

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulate AI response delay
    setTimeout(() => {
      const { content, properties: matchedProperties } = generateResponse(input)
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content,
        properties: matchedProperties.length > 0 ? matchedProperties : undefined
      }

      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1000 + Math.random() * 500)
  }

  return (
    <>
      {/* Chat Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-20 right-4 md:bottom-8 md:right-8 z-30 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-xl flex items-center justify-center",
          isOpen && "hidden"
        )}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 w-[calc(100%-2rem)] md:w-[400px] h-[600px] max-h-[80vh] bg-card rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-primary text-primary-foreground">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Property Assistant</h3>
                  <p className="text-xs text-primary-foreground/80">AI-powered help</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center hover:bg-primary-foreground/30 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "flex gap-2",
                    message.type === 'user' && "flex-row-reverse"
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center",
                    message.type === 'bot' 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-secondary text-foreground"
                  )}>
                    {message.type === 'bot' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </div>
                  <div className={cn(
                    "max-w-[80%] rounded-2xl px-4 py-3",
                    message.type === 'bot' 
                      ? "bg-secondary text-foreground rounded-tl-none" 
                      : "bg-primary text-primary-foreground rounded-tr-none"
                  )}>
                    <p className="text-sm whitespace-pre-line">{message.content}</p>
                    
                    {/* Property Cards */}
                    {message.properties && message.properties.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {message.properties.map((property) => (
                          <button
                            key={property.id}
                            onClick={() => {
                              onViewProperty(property)
                              setIsOpen(false)
                            }}
                            className="w-full flex gap-2 p-2 bg-card rounded-xl hover:bg-card/80 transition-colors text-left"
                          >
                            <img
                              src={property.images[0]}
                              alt={property.title}
                              className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-foreground text-xs line-clamp-1">
                                {property.title}
                              </h4>
                              <div className="flex items-center text-muted-foreground text-xs mt-0.5">
                                <MapPin className="w-3 h-3 mr-0.5" />
                                <span className="truncate">{property.location}</span>
                              </div>
                              <div className="text-primary font-semibold text-xs mt-0.5">
                                ₹{formatPrice(property.price)}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2"
                >
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-secondary rounded-2xl rounded-tl-none px-4 py-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            <div className="px-4 py-2 border-t border-border">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {['Under 1 Cr', '2 BHK', 'Whitefield', 'Villa'].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => {
                      setInput(suggestion)
                    }}
                    className="flex-shrink-0 px-3 py-1 text-xs bg-secondary text-foreground rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSend()
                }}
                className="flex gap-2"
              >
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1"
                  disabled={isTyping}
                />
                <Button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  {isTyping ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
