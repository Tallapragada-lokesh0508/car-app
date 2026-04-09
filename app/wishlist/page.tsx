"use client"

import Link from "next/link"
import { Heart, Trash2, ArrowRight, Scale, Calendar, Fuel, Users, Shield, Star } from "lucide-react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useCarContext } from "@/lib/car-context"
import { formatPrice } from "@/lib/car-data"
import { CarImage } from "@/components/car-image"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

export default function WishlistPage() {
  const { 
    wishlist, 
    getCarById, 
    removeFromWishlist, 
    addToCompare, 
    isInCompare, 
    compareList 
  } = useCarContext()

  const wishlistCars = wishlist
    .map(id => getCarById(id))
    .filter(Boolean)

  const handleRemove = (carId: string, carName: string) => {
    removeFromWishlist(carId)
    toast.success(`${carName} removed from wishlist`)
  }

  const handleAddToCompare = (carId: string, carName: string) => {
    if (compareList.length >= 3) {
      toast.error("You can compare up to 3 cars only")
      return
    }
    addToCompare(carId)
    toast.success(`${carName} added to comparison`)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">My Wishlist</h1>
            <p className="text-muted-foreground mt-1">
              {wishlistCars.length} car{wishlistCars.length !== 1 ? "s" : ""} saved
            </p>
          </div>
        </div>

        {wishlistCars.length === 0 ? (
          <EmptyWishlist />
        ) : (
          <div className="grid gap-4">
            {wishlistCars.map((car) => (
              <Card key={car!.id} className="overflow-hidden">
                <div className="flex flex-col sm:flex-row">
                  {/* Image */}
                  <div className="relative w-full sm:w-64 h-48 bg-muted flex-shrink-0">
                    <CarImage 
                      src={car!.image} 
                      alt={car!.name} 
                      className="object-cover"
                    />
                  </div>

                  {/* Content */}
                  <CardContent className="p-4 flex-1">
                    <div className="flex flex-col h-full">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="text-xs text-muted-foreground font-medium uppercase">{car!.brand}</p>
                          <h3 className="font-semibold text-lg text-foreground">{car!.name}</h3>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-muted-foreground hover:text-destructive"
                          onClick={() => handleRemove(car!.id, car!.name)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <p className="text-xl font-bold text-primary mb-3">
                        {formatPrice(car!.price)}
                      </p>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <span className="flex items-center gap-1">
                          <Fuel className="h-4 w-4" />
                          {car!.fuelType}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {car!.seatingCapacity} Seats
                        </span>
                        <span className="flex items-center gap-1">
                          <Shield className="h-4 w-4" />
                          {car!.safetyRating}
                          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-auto">
                        <Button asChild size="sm">
                          <Link href={`/cars/${car!.id}`}>
                            View Details
                            <ArrowRight className="h-4 w-4 ml-1" />
                          </Link>
                        </Button>
                        <Button asChild variant="outline" size="sm">
                          <Link href={`/book/${car!.id}`}>
                            <Calendar className="h-4 w-4 mr-1" />
                            Book Test Drive
                          </Link>
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          disabled={isInCompare(car!.id)}
                          onClick={() => handleAddToCompare(car!.id, car!.name)}
                        >
                          <Scale className={cn(
                            "h-4 w-4 mr-1",
                            isInCompare(car!.id) && "text-primary"
                          )} />
                          {isInCompare(car!.id) ? "In Compare" : "Compare"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function EmptyWishlist() {
  return (
    <div className="text-center py-16">
      <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
        <Heart className="h-10 w-10 text-muted-foreground" />
      </div>
      <h2 className="text-xl font-semibold text-foreground mb-2">Your wishlist is empty</h2>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        Save cars you like by clicking the heart icon. This helps you keep track of cars you are interested in.
      </p>
      <Button asChild>
        <Link href="/cars">
          Browse Cars
          <ArrowRight className="h-4 w-4 ml-2" />
        </Link>
      </Button>
    </div>
  )
}
