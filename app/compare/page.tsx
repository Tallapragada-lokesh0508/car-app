"use client"

import Link from "next/link"
import { Plus, X, Scale, Check, Minus, ArrowRight } from "lucide-react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCarContext } from "@/lib/car-context"
import { formatPrice, cars } from "@/lib/car-data"
import { CarImage } from "@/components/car-image"
import { cn } from "@/lib/utils"

export default function ComparePage() {
  const { compareList, removeFromCompare, getCarById, clearCompare } = useCarContext()

  const comparedCars = compareList
    .map(id => getCarById(id))
    .filter(Boolean)

  const emptySlots = 3 - comparedCars.length

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Compare Cars</h1>
            <p className="text-muted-foreground mt-1">
              See the differences side by side to make the best choice
            </p>
          </div>
          {compareList.length > 0 && (
            <Button variant="outline" onClick={clearCompare}>
              Clear All
            </Button>
          )}
        </div>

        {compareList.length === 0 ? (
          <EmptyCompare />
        ) : (
          <div className="space-y-6">
            {/* Car Cards Row */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {/* Comparison Label Card (hidden on mobile) */}
              <div className="hidden lg:block" />

              {/* Selected Cars */}
              {comparedCars.map((car) => (
                <Card key={car!.id} className="relative overflow-hidden">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8 z-10 bg-background/80"
                    onClick={() => removeFromCompare(car!.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <div className="aspect-[4/3] relative bg-muted">
                    <CarImage
                      src={car!.image}
                      alt={car!.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4 text-center">
                    <p className="text-xs text-muted-foreground">{car!.brand}</p>
                    <h3 className="font-semibold text-foreground">{car!.name}</h3>
                    <p className="text-lg font-bold text-primary mt-1">{formatPrice(car!.price)}</p>
                    <Button asChild size="sm" className="mt-3 w-full">
                      <Link href={`/book/${car!.id}`}>Book Test Drive</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}

              {/* Empty Slots */}
              {Array.from({ length: emptySlots }).map((_, index) => (
                <Card key={`empty-${index}`} className="border-dashed">
                  <Link href="/cars">
                    <CardContent className="aspect-[4/3] flex flex-col items-center justify-center text-center p-4 h-full min-h-[300px]">
                      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
                        <Plus className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <p className="text-sm text-muted-foreground">Add a car to compare</p>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>

            {/* Comparison Table */}
            {comparedCars.length >= 2 && (
              <ComparisonTable cars={comparedCars as NonNullable<typeof comparedCars[0]>[]} />
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function EmptyCompare() {
  const { cars: allCars } = useCarContext()
  const suggestedCars = allCars.filter(c => c.beginnerFriendly).slice(0, 3)

  return (
    <div className="text-center py-16">
      <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
        <Scale className="h-10 w-10 text-muted-foreground" />
      </div>
      <h2 className="text-xl font-semibold text-foreground mb-2">No cars to compare yet</h2>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        Add 2-3 cars to compare them side by side. This helps you see the differences and make the best choice.
      </p>
      <Button asChild>
        <Link href="/cars">
          Browse Cars
          <ArrowRight className="h-4 w-4 ml-2" />
        </Link>
      </Button>

      {/* Suggested Cars */}
      <div className="mt-12">
        <h3 className="text-lg font-semibold text-foreground mb-4">Popular cars to start with</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {suggestedCars.map(car => (
            <Link key={car.id} href={`/cars/${car.id}`}>
              <Card className="hover:border-primary/50 transition-colors">
                <div className="aspect-video relative bg-muted rounded-t-lg overflow-hidden">
                  <CarImage src={car.image} alt={car.name} className="object-cover" />
                </div>
                <CardContent className="p-3 text-center">
                  <p className="font-medium text-foreground">{car.name}</p>
                  <p className="text-sm text-primary">{formatPrice(car.price)}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

function ComparisonTable({ cars }: { cars: NonNullable<ReturnType<typeof useCarContext>["getCarById"]>[] }) {
  const specs = [
    { key: "price", label: "Price", format: (car: typeof cars[0]) => formatPrice(car.price), highlight: "lowest" },
    { key: "fuelType", label: "Fuel Type", format: (car: typeof cars[0]) => car.fuelType },
    { key: "carType", label: "Car Type", format: (car: typeof cars[0]) => car.carType },
    { key: "transmission", label: "Transmission", format: (car: typeof cars[0]) => car.transmission },
    { key: "seatingCapacity", label: "Seating Capacity", format: (car: typeof cars[0]) => `${car.seatingCapacity} People` },
    { key: "mileage", label: "Mileage / Range", format: (car: typeof cars[0]) => car.fuelType === "Electric" ? car.batteryRange || "N/A" : car.mileage },
    { key: "safetyRating", label: "Safety Rating", format: (car: typeof cars[0]) => `${car.safetyRating} Stars`, highlight: "highest" },
    { key: "year", label: "Year", format: (car: typeof cars[0]) => car.year.toString() },
  ]

  const getBestValue = (key: string, highlight?: string) => {
    if (!highlight) return null
    const values = cars.map(car => {
      if (key === "price") return car.price
      if (key === "safetyRating") return car.safetyRating
      return null
    }).filter(Boolean) as number[]
    
    if (highlight === "lowest") return Math.min(...values)
    if (highlight === "highest") return Math.max(...values)
    return null
  }

  const isHighlighted = (car: typeof cars[0], key: string, highlight?: string) => {
    if (!highlight) return false
    const best = getBestValue(key, highlight)
    if (key === "price") return car.price === best
    if (key === "safetyRating") return car.safetyRating === best
    return false
  }

  return (
    <Card>
      <CardContent className="p-0 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-4 font-semibold text-foreground bg-muted/50 min-w-[150px]">
                Specification
              </th>
              {cars.map(car => (
                <th key={car.id} className="text-center p-4 font-semibold text-foreground bg-muted/50 min-w-[150px]">
                  {car.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {specs.map((spec) => (
              <tr key={spec.key} className="border-b last:border-0">
                <td className="p-4 text-muted-foreground font-medium">{spec.label}</td>
                {cars.map(car => {
                  const highlighted = isHighlighted(car, spec.key, spec.highlight)
                  return (
                    <td 
                      key={car.id} 
                      className={cn(
                        "p-4 text-center",
                        highlighted && "bg-primary/5"
                      )}
                    >
                      <span className={cn(
                        "inline-flex items-center gap-1",
                        highlighted && "text-primary font-semibold"
                      )}>
                        {spec.format(car)}
                        {highlighted && <Check className="h-4 w-4" />}
                      </span>
                    </td>
                  )
                })}
              </tr>
            ))}

            {/* Pros Row */}
            <tr className="border-b">
              <td className="p-4 text-emerald-600 font-medium align-top">Pros</td>
              {cars.map(car => (
                <td key={car.id} className="p-4">
                  <ul className="space-y-1">
                    {car.pros.slice(0, 3).map((pro, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start gap-1">
                        <Check className="h-3 w-3 text-emerald-500 flex-shrink-0 mt-1" />
                        <span className="line-clamp-2">{pro}</span>
                      </li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>

            {/* Cons Row */}
            <tr>
              <td className="p-4 text-amber-600 font-medium align-top">Cons</td>
              {cars.map(car => (
                <td key={car.id} className="p-4">
                  <ul className="space-y-1">
                    {car.cons.slice(0, 2).map((con, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start gap-1">
                        <Minus className="h-3 w-3 text-amber-500 flex-shrink-0 mt-1" />
                        <span className="line-clamp-2">{con}</span>
                      </li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </CardContent>
    </Card>
  )
}
