"use client"

import { use } from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Heart, Scale, Calendar, Star, Check, X, Info, Fuel, Users, Gauge, Shield, Settings, Zap, Battery } from "lucide-react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cars, formatPrice, calculateFinalPrice } from "@/lib/car-data"
import { useCarContext } from "@/lib/car-context"
import { CarImage } from "@/components/car-image"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

interface CarDetailsPageProps {
  params: Promise<{ id: string }>
}

export default function CarDetailsPage({ params }: CarDetailsPageProps) {
  const { id } = use(params)
  const car = cars.find(c => c.id === id)

  if (!car) {
    notFound()
  }

  const pricing = calculateFinalPrice(car.price, car.discount)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        {/* Back Button */}
        <Link 
          href="/cars" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all cars
        </Link>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Image & Quick Info */}
          <div className="space-y-6">
            {/* Main Image */}
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-muted">
              <CarImage
                src={car.image}
                alt={car.name}
                className="w-full h-full object-cover"
                priority
              />
              {car.beginnerFriendly && (
                <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">
                  Best for Beginners
                </Badge>
              )}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <QuickStat 
                icon={Fuel} 
                label="Fuel Type" 
                value={car.fuelType}
                tooltip="What powers this car"
              />
              <QuickStat 
                icon={Users} 
                label="Seats" 
                value={`${car.seatingCapacity} People`}
                tooltip="Number of passengers it can carry"
              />
              <QuickStat 
                icon={Settings} 
                label="Transmission" 
                value={car.transmission}
                tooltip="Manual means you change gears, Automatic does it for you"
              />
              <QuickStat 
                icon={Shield} 
                label="Safety" 
                value={`${car.safetyRating} Stars`}
                tooltip="Higher stars = safer car in accidents"
              />
            </div>

            {/* Mileage/Range Info */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  {car.fuelType === "Electric" ? (
                    <>
                      <Battery className="h-8 w-8 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">How far it goes per charge</p>
                        <p className="text-lg font-semibold text-foreground">{car.batteryRange}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <Gauge className="h-8 w-8 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">How far the car goes per liter</p>
                        <p className="text-lg font-semibold text-foreground">{car.mileage}</p>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Details & Actions */}
          <div className="space-y-6">
            {/* Title & Price */}
            <div>
              <p className="text-sm text-muted-foreground font-medium uppercase tracking-wide">
                {car.brand} | {car.year}
              </p>
              <h1 className="text-3xl font-bold text-foreground mt-1">{car.name}</h1>
              <p className="text-muted-foreground mt-2">{car.description}</p>
            </div>

            {/* Price Calculator */}
            <Card className="border-2 border-primary/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  Price Breakdown
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>This is an estimated price. Actual price may vary.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Base Price (Ex-showroom)</span>
                  <span className="font-medium">{formatPrice(pricing.basePrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">GST (28%)</span>
                  <span className="font-medium">+ {formatPrice(pricing.gst)}</span>
                </div>
                {pricing.discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Discount</span>
                    <span className="font-medium">- {formatPrice(pricing.discountAmount)}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-foreground">Final Price</span>
                  <span className="text-2xl font-bold text-primary">{formatPrice(pricing.finalPrice)}</span>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <CarActionButtons carId={car.id} carName={car.name} />

            {/* Who Should Buy */}
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Zap className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Who Should Buy This?</h3>
                    <p className="text-muted-foreground text-sm mt-1">{car.whoShouldBuy}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pros & Cons */}
            <div className="grid sm:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2 text-emerald-600">
                    <Check className="h-5 w-5" />
                    Things We Love
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {car.pros.map((pro, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                        <Check className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        {pro}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2 text-amber-600">
                    <X className="h-5 w-5" />
                    Things to Consider
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {car.cons.map((con, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                        <X className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                        {con}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Features */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Key Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {car.features.map((feature, index) => (
                    <Badge key={index} variant="secondary" className="text-sm">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

function QuickStat({ 
  icon: Icon, 
  label, 
  value, 
  tooltip 
}: { 
  icon: React.ElementType
  label: string
  value: string
  tooltip: string 
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card className="cursor-help">
            <CardContent className="p-3 text-center">
              <Icon className="h-5 w-5 mx-auto text-primary mb-1" />
              <p className="text-xs text-muted-foreground">{label}</p>
              <p className="text-sm font-semibold text-foreground">{value}</p>
            </CardContent>
          </Card>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

function CarActionButtons({ carId, carName }: { carId: string, carName: string }) {
  const { 
    addToWishlist, 
    removeFromWishlist, 
    isInWishlist,
    addToCompare,
    removeFromCompare,
    isInCompare,
    compareList
  } = useCarContext()

  const inWishlist = isInWishlist(carId)
  const inCompare = isInCompare(carId)

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(carId)
      toast.success(`${carName} removed from wishlist`)
    } else {
      addToWishlist(carId)
      toast.success(`${carName} added to wishlist`)
    }
  }

  const handleCompareToggle = () => {
    if (inCompare) {
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

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <Button asChild size="lg" className="flex-1">
        <Link href={`/book/${carId}`}>
          <Calendar className="h-5 w-5 mr-2" />
          Book Test Drive
        </Link>
      </Button>
      <Button 
        variant="outline" 
        size="lg" 
        className="flex-1"
        onClick={handleCompareToggle}
      >
        <Scale className={cn("h-5 w-5 mr-2", inCompare && "text-primary")} />
        {inCompare ? "Added to Compare" : "Compare"}
      </Button>
      <Button 
        variant="outline" 
        size="icon" 
        className="h-12 w-12"
        onClick={handleWishlistToggle}
      >
        <Heart className={cn("h-5 w-5", inWishlist && "fill-red-500 text-red-500")} />
      </Button>
    </div>
  )
}
