"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Sparkles } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useCarContext } from "@/lib/car-context"

const suggestions = [
  "Budget cars under 8 lakhs",
  "Electric SUV",
  "Family car with 7 seats",
  "Best mileage cars",
]

export function HeroSection() {
  const router = useRouter()
  const { setSearchQuery } = useCarContext()
  const [query, setQuery] = useState("")

  const handleSearch = (searchTerm: string) => {
    setSearchQuery(searchTerm)
    router.push("/cars")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      handleSearch(query)
    }
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10 py-12 md:py-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Sparkles className="h-4 w-4" />
            <span>Your Smart Car Buying Assistant</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl md:text-5xl font-bold text-foreground leading-tight text-balance">
            Find Your Perfect Car,{" "}
            <span className="text-primary">Without the Confusion</span>
          </h1>

          {/* Subheadline */}
          <p className="text-muted-foreground text-lg md:text-xl text-pretty">
            New to cars? No problem! We explain everything in simple words and help you choose the right car for your needs.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSubmit} className="relative max-w-xl mx-auto mt-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by car name, brand, or type..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full h-14 pl-12 pr-28 text-base rounded-2xl border-2 border-border bg-card shadow-lg focus:border-primary"
              />
              <Button 
                type="submit" 
                className="absolute right-2 top-1/2 -translate-y-1/2 h-10 px-6 rounded-xl"
              >
                Search
              </Button>
            </div>
          </form>

          {/* Quick Suggestions */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
            <span className="text-sm text-muted-foreground">Popular:</span>
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => handleSearch(suggestion)}
                className="text-sm px-3 py-1.5 rounded-full bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
