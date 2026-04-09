"use client"

import Link from "next/link"
import { Heart, Scale, Star, Fuel, Users, Shield } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useCarContext } from "@/lib/car-context"
import { formatPrice } from "@/lib/car-data"
import { CarImage } from "@/components/car-image"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

export function CarGrid() {
  const { 
    getFilteredCars, 
    addToWishlist, 
    removeFromWishlist, 
    isInWishlist,
    addToCompare,
    removeFromCompare,
    isInCompare,
    compareList
  } = useCarContext()

  const filteredCars = getFilteredCars()

  const handleWishlistToggle = (e: React.MouseEvent, carId: string, carName: string) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (isInWishlist(carId)) {
      removeFromWishlist(carId)
      toast.success(`${carName} removed from wishlist`)
    } else {
      addToWishlist(carId)
      toast.success(`${carName} added to wishlist`)
    }
  }

  const handleCompareToggle = (e: React.MouseEvent, carId: string, carName: string) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (isInCompare(carId)) {
      removeFromCompare(carId)
      toast.success(`${carName} removed from comparison`)
    } else {
      if (compareList.length >= 3) {
        toast.error("You can compare up to 3 cars only")
        return
      }
      addToCompare(carId)
      toast.success(`${carName} added to comparison`)
    }
  }

  if (filteredCars.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
          <Fuel className="h-10 w-10 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">No cars found</h3>
        <p className="text-muted-foreground max-w-sm">
          Try adjusting your filters to find cars that match your preferences.
        </p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">
          Showing {filteredCars.length} cars
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCars.map((car) => (
          <Link key={car.id} href={`/cars/${car.id}`}>
            <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-primary/20 h-full">
              {/* Image Container */}
              <div className="relative aspect-[16/10] bg-muted overflow-hidden">
                <CarImage
                  src={car.image}
                  alt={car.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Top Badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                  {car.beginnerFriendly && (
                    <Badge className="bg-accent text-accent-foreground">
                      Best for You
                    </Badge>
                  )}
                </div>
                
                {/* Action Buttons */}
                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="icon"
                    variant="secondary"
                    className="h-8 w-8 rounded-full shadow-md"
                    onClick={(e) => handleWishlistToggle(e, car.id, car.name)}
                  >
                    <Heart 
                      className={cn(
                        "h-4 w-4",
                        isInWishlist(car.id) && "fill-red-500 text-red-500"
                      )} 
                    />
                  </Button>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="h-8 w-8 rounded-full shadow-md"
                    onClick={(e) => handleCompareToggle(e, car.id, car.name)}
                  >
                    <Scale 
                      className={cn(
                        "h-4 w-4",
                        isInCompare(car.id) && "text-primary"
                      )} 
                    />
                  </Button>
                </div>

                {/* Discount Badge */}
                {car.discount && car.discount > 0 && (
                  <Badge variant="destructive" className="absolute bottom-3 left-3">
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
                  <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1">
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
                    <span>{car.seatingCapacity}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Shield className="h-4 w-4" />
                    <span>{car.safetyRating}</span>
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  </div>
                </div>

                {/* Car Type Badge */}
                <div className="mt-3">
                  <Badge variant="outline" className="text-xs">
                    {car.carType}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
