"use client"

import { useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { RotateCcw } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { useCarContext } from "@/lib/car-context"
import { formatPrice } from "@/lib/car-data"

const fuelTypes = ["Petrol", "Diesel", "Electric", "Hybrid"]
const carTypes = ["Sedan", "SUV", "Hatchback", "Luxury"]

export function CarFilters() {
  const searchParams = useSearchParams()
  const { filters, setFilters, resetFilters } = useCarContext()

  // Handle category from URL params
  useEffect(() => {
    const category = searchParams.get("category")
    if (category) {
      setFilters({ category })
    }
  }, [searchParams, setFilters])

  const handleBudgetChange = (value: number[]) => {
    setFilters({ budget: [value[0], value[1]] as [number, number] })
  }

  const handleFuelTypeChange = (fuelType: string, checked: boolean) => {
    const newFuelTypes = checked
      ? [...filters.fuelType, fuelType]
      : filters.fuelType.filter(f => f !== fuelType)
    setFilters({ fuelType: newFuelTypes })
  }

  const handleCarTypeChange = (carType: string, checked: boolean) => {
    const newCarTypes = checked
      ? [...filters.carType, carType]
      : filters.carType.filter(c => c !== carType)
    setFilters({ carType: newCarTypes })
  }

  const hasActiveFilters = 
    filters.budget[0] > 0 || 
    filters.budget[1] < 10000000 ||
    filters.fuelType.length > 0 || 
    filters.carType.length > 0 ||
    filters.category !== ""

  return (
    <Card className="border-2">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Filters</CardTitle>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={resetFilters}
              className="h-8 text-xs"
            >
              <RotateCcw className="h-3 w-3 mr-1" />
              Reset
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Budget Range */}
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-sm text-foreground mb-1">Budget Range</h4>
            <p className="text-xs text-muted-foreground">
              How much do you want to spend?
            </p>
          </div>
          <Slider
            value={[filters.budget[0], filters.budget[1]]}
            onValueChange={handleBudgetChange}
            min={0}
            max={10000000}
            step={100000}
            className="mt-6"
          />
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{formatPrice(filters.budget[0])}</span>
            <span className="text-muted-foreground">{formatPrice(filters.budget[1])}</span>
          </div>
        </div>

        {/* Fuel Type */}
        <div className="space-y-3">
          <div>
            <h4 className="font-medium text-sm text-foreground mb-1">Fuel Type</h4>
            <p className="text-xs text-muted-foreground">
              What powers your car?
            </p>
          </div>
          <div className="space-y-2">
            {fuelTypes.map((fuel) => (
              <div key={fuel} className="flex items-center space-x-2">
                <Checkbox
                  id={`fuel-${fuel}`}
                  checked={filters.fuelType.includes(fuel)}
                  onCheckedChange={(checked) => 
                    handleFuelTypeChange(fuel, checked as boolean)
                  }
                />
                <Label 
                  htmlFor={`fuel-${fuel}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {fuel}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Car Type */}
        <div className="space-y-3">
          <div>
            <h4 className="font-medium text-sm text-foreground mb-1">Car Type</h4>
            <p className="text-xs text-muted-foreground">
              What style of car do you prefer?
            </p>
          </div>
          <div className="space-y-2">
            {carTypes.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={`type-${type}`}
                  checked={filters.carType.includes(type)}
                  onCheckedChange={(checked) => 
                    handleCarTypeChange(type, checked as boolean)
                  }
                />
                <Label 
                  htmlFor={`type-${type}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {type}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
