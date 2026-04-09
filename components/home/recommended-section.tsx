"use client"

import Link from "next/link"
import { ArrowRight, Star, Fuel, Users, Shield } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cars, formatPrice } from "@/lib/car-data"
import { CarImage } from "@/components/car-image"

export function RecommendedSection() {
  // Get beginner-friendly cars
  const recommendedCars = cars
    .filter(car => car.beginnerFriendly)
    .slice(0, 6)

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Recommended for Beginners</h2>
          <p className="text-muted-foreground mt-1">Easy-to-drive cars perfect for first-time buyers</p>
        </div>
        <Link 
          href="/cars" 
          className="hidden md:flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          View all
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {recommendedCars.map((car) => (
          <Link key={car.id} href={`/cars/${car.id}`}>
            <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-primary/20">
              {/* Image Container */}
              <div className="relative aspect-[16/10] bg-muted overflow-hidden">
                <CarImage
                  src={car.image}
                  alt={car.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Best for You Badge */}
                <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">
                  Best for You
                </Badge>
                
                {/* Discount Badge */}
                {car.discount && car.discount > 0 && (
                  <Badge variant="destructive" className="absolute top-3 right-3">
                    Save {formatPrice(car.discount)}
                  </Badge>
                )}
              </div>

              <CardContent className="p-4">
                {/* Brand & Name */}
                <div className="mb-2">
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                    {car.brand}
                  </p>
                  <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                    {car.name}
                  </h3>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-xl font-bold text-primary">
                    {formatPrice(car.price)}
                  </span>
                  <span className="text-sm text-muted-foreground">onwards</span>
                </div>

                {/* Quick Stats */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Fuel className="h-4 w-4" />
                    <span>{car.fuelType}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{car.seatingCapacity} Seats</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Shield className="h-4 w-4" />
                    <span>{car.safetyRating}</span>
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Mobile View All Button */}
      <div className="md:hidden text-center">
        <Button asChild variant="outline" className="w-full">
          <Link href="/cars">
            View All Cars
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      </div>
    </section>
  )
}
