"use client"

import { useState } from "react"
import Link from "next/link"
import { MapPin, Phone, Clock, Navigation, Search, Building2 } from "lucide-react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { showrooms } from "@/lib/car-data"

export default function ShowroomsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredShowrooms = showrooms.filter(showroom => 
    showroom.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    showroom.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    showroom.brands.some(brand => brand.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Find Showrooms</h1>
          <p className="text-muted-foreground mt-1">
            Locate nearby dealerships and book your test drive
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-md mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by name, location, or brand..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Showroom Grid */}
        {filteredShowrooms.length === 0 ? (
          <div className="text-center py-16">
            <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No showrooms found</h3>
            <p className="text-muted-foreground">Try a different search term</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredShowrooms.map((showroom) => (
              <Card key={showroom.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{showroom.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1 flex items-start gap-1">
                        <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                        {showroom.address}, {showroom.city}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {showroom.brands.map((brand) => (
                      <Badge key={brand} variant="secondary" className="text-xs">
                        {brand}
                      </Badge>
                    ))}
                  </div>

                  <div className="space-y-2 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      {showroom.phone}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {showroom.timings}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => window.open(`https://maps.google.com/?q=${showroom.lat},${showroom.lng}`, "_blank")}
                    >
                      <Navigation className="h-4 w-4 mr-1" />
                      Directions
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => window.open(`tel:${showroom.phone}`, "_self")}
                    >
                      <Phone className="h-4 w-4 mr-1" />
                      Call
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
