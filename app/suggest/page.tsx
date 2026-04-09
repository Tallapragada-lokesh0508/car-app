"use client"

import { useState } from "react"
import Link from "next/link"
import { Lightbulb, ArrowRight, ArrowLeft, Check, Sparkles, Fuel, Users, Shield, Star } from "lucide-react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { cars, formatPrice } from "@/lib/car-data"
import { CarImage } from "@/components/car-image"
import { cn } from "@/lib/utils"

interface Preferences {
  budget: number
  usage: "city" | "highway" | "both"
  fuelPreference: "petrol" | "diesel" | "electric" | "any"
  priority: "mileage" | "safety" | "features" | "comfort"
}

const steps = [
  { id: 1, title: "Budget", description: "How much do you want to spend?" },
  { id: 2, title: "Usage", description: "Where will you drive the most?" },
  { id: 3, title: "Fuel", description: "What fuel type do you prefer?" },
  { id: 4, title: "Priority", description: "What matters most to you?" },
]

export default function SuggestPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [preferences, setPreferences] = useState<Preferences>({
    budget: 1000000,
    usage: "city",
    fuelPreference: "any",
    priority: "safety"
  })
  const [showResults, setShowResults] = useState(false)

  const updatePreference = <K extends keyof Preferences>(key: K, value: Preferences[K]) => {
    setPreferences(prev => ({ ...prev, [key]: value }))
  }

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1)
    } else {
      setShowResults(true)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const getSuggestedCars = () => {
    return cars
      .filter(car => {
        // Budget filter
        if (car.price > preferences.budget) return false

        // Fuel preference
        if (preferences.fuelPreference !== "any") {
          const fuelMap: Record<string, string> = {
            petrol: "Petrol",
            diesel: "Diesel",
            electric: "Electric"
          }
          if (car.fuelType !== fuelMap[preferences.fuelPreference]) return false
        }

        return true
      })
      .sort((a, b) => {
        // Sort by priority
        switch (preferences.priority) {
          case "mileage":
            const mileageA = parseFloat(a.mileage) || 0
            const mileageB = parseFloat(b.mileage) || 0
            return mileageB - mileageA
          case "safety":
            return b.safetyRating - a.safetyRating
          case "features":
            return b.features.length - a.features.length
          case "comfort":
            return b.seatingCapacity - a.seatingCapacity
          default:
            return 0
        }
      })
      .slice(0, 5)
  }

  if (showResults) {
    const suggestedCars = getSuggestedCars()
    
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-6">
          <Button 
            variant="ghost" 
            onClick={() => setShowResults(false)}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Change Preferences
          </Button>

          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
              <Sparkles className="h-5 w-5" />
              <span className="font-medium">AI Recommendations</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Perfect Cars For You
            </h1>
            <p className="text-muted-foreground">
              Based on your preferences: Budget up to {formatPrice(preferences.budget)}, 
              {preferences.usage === "city" ? " city driving" : preferences.usage === "highway" ? " highway driving" : " mixed driving"},
              {preferences.fuelPreference !== "any" ? ` ${preferences.fuelPreference} only` : " any fuel"},
              {" "}prioritizing {preferences.priority}
            </p>
          </div>

          {suggestedCars.length === 0 ? (
            <Card className="max-w-md mx-auto">
              <CardContent className="py-8 text-center">
                <p className="text-muted-foreground mb-4">
                  No cars match your exact preferences. Try adjusting your budget or fuel preference.
                </p>
                <Button onClick={() => setShowResults(false)}>
                  Adjust Preferences
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 max-w-3xl mx-auto">
              {suggestedCars.map((car, index) => (
                <Link key={car.id} href={`/cars/${car.id}`}>
                  <Card className={cn(
                    "overflow-hidden hover:shadow-lg transition-all",
                    index === 0 && "border-2 border-primary"
                  )}>
                    <div className="flex flex-col sm:flex-row">
                      <div className="relative w-full sm:w-48 h-40 bg-muted flex-shrink-0">
                        <CarImage src={car.image} alt={car.name} className="object-cover" />
                        {index === 0 && (
                          <Badge className="absolute top-2 left-2 bg-primary">
                            Best Match
                          </Badge>
                        )}
                      </div>
                      <CardContent className="p-4 flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-xs text-muted-foreground">{car.brand}</p>
                            <h3 className="font-semibold text-lg text-foreground">{car.name}</h3>
                            <p className="text-xl font-bold text-primary mt-1">{formatPrice(car.price)}</p>
                          </div>
                          <Button size="sm">
                            View
                            <ArrowRight className="h-4 w-4 ml-1" />
                          </Button>
                        </div>
                        <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Fuel className="h-4 w-4" />
                            {car.fuelType}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {car.seatingCapacity} Seats
                          </span>
                          <span className="flex items-center gap-1">
                            <Shield className="h-4 w-4" />
                            {car.safetyRating}
                            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                          {car.whoShouldBuy}
                        </p>
                      </CardContent>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Lightbulb className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Get Smart Suggestions
            </h1>
            <p className="text-muted-foreground">
              Answer a few questions and we will find the perfect car for you
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                  currentStep > step.id 
                    ? "bg-primary text-primary-foreground" 
                    : currentStep === step.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                )}>
                  {currentStep > step.id ? <Check className="h-4 w-4" /> : step.id}
                </div>
                {index < steps.length - 1 && (
                  <div className={cn(
                    "w-12 sm:w-20 h-1 mx-2",
                    currentStep > step.id ? "bg-primary" : "bg-muted"
                  )} />
                )}
              </div>
            ))}
          </div>

          {/* Step Content */}
          <Card>
            <CardHeader>
              <CardTitle>{steps[currentStep - 1].description}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <span className="text-4xl font-bold text-primary">{formatPrice(preferences.budget)}</span>
                  </div>
                  <Slider
                    value={[preferences.budget]}
                    onValueChange={([value]) => updatePreference("budget", value)}
                    min={400000}
                    max={10000000}
                    step={100000}
                    className="py-4"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>4 Lakhs</span>
                    <span>1 Crore</span>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <RadioGroup
                  value={preferences.usage}
                  onValueChange={(value) => updatePreference("usage", value as Preferences["usage"])}
                  className="space-y-3"
                >
                  {[
                    { value: "city", label: "Mostly City", description: "Daily commute, short trips, traffic" },
                    { value: "highway", label: "Mostly Highway", description: "Long drives, road trips, fast roads" },
                    { value: "both", label: "Mixed (Both)", description: "A bit of everything" }
                  ].map((option) => (
                    <Label
                      key={option.value}
                      htmlFor={option.value}
                      className={cn(
                        "flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-colors",
                        preferences.usage === option.value 
                          ? "border-primary bg-primary/5" 
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <RadioGroupItem value={option.value} id={option.value} />
                      <div>
                        <p className="font-medium text-foreground">{option.label}</p>
                        <p className="text-sm text-muted-foreground">{option.description}</p>
                      </div>
                    </Label>
                  ))}
                </RadioGroup>
              )}

              {currentStep === 3 && (
                <RadioGroup
                  value={preferences.fuelPreference}
                  onValueChange={(value) => updatePreference("fuelPreference", value as Preferences["fuelPreference"])}
                  className="space-y-3"
                >
                  {[
                    { value: "petrol", label: "Petrol Only", description: "Traditional, widely available" },
                    { value: "diesel", label: "Diesel Only", description: "Better mileage, great for long drives" },
                    { value: "electric", label: "Electric Only", description: "Zero emissions, lowest running cost" },
                    { value: "any", label: "No Preference", description: "Show me all options" }
                  ].map((option) => (
                    <Label
                      key={option.value}
                      htmlFor={option.value}
                      className={cn(
                        "flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-colors",
                        preferences.fuelPreference === option.value 
                          ? "border-primary bg-primary/5" 
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <RadioGroupItem value={option.value} id={option.value} />
                      <div>
                        <p className="font-medium text-foreground">{option.label}</p>
                        <p className="text-sm text-muted-foreground">{option.description}</p>
                      </div>
                    </Label>
                  ))}
                </RadioGroup>
              )}

              {currentStep === 4 && (
                <RadioGroup
                  value={preferences.priority}
                  onValueChange={(value) => updatePreference("priority", value as Preferences["priority"])}
                  className="space-y-3"
                >
                  {[
                    { value: "safety", label: "Safety First", description: "Highest safety ratings and features" },
                    { value: "mileage", label: "Best Mileage", description: "Save money on fuel costs" },
                    { value: "features", label: "Most Features", description: "Loaded with tech and comfort" },
                    { value: "comfort", label: "Maximum Comfort", description: "Spacious and smooth ride" }
                  ].map((option) => (
                    <Label
                      key={option.value}
                      htmlFor={option.value}
                      className={cn(
                        "flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-colors",
                        preferences.priority === option.value 
                          ? "border-primary bg-primary/5" 
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <RadioGroupItem value={option.value} id={option.value} />
                      <div>
                        <p className="font-medium text-foreground">{option.label}</p>
                        <p className="text-sm text-muted-foreground">{option.description}</p>
                      </div>
                    </Label>
                  ))}
                </RadioGroup>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-3 pt-4">
                {currentStep > 1 && (
                  <Button variant="outline" onClick={prevStep} className="flex-1">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                )}
                <Button onClick={nextStep} className="flex-1">
                  {currentStep === 4 ? "Get Recommendations" : "Continue"}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
