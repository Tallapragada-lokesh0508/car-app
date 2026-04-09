"use client"

import { SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { CarFilters } from "./car-filters"
import { useCarContext } from "@/lib/car-context"

export function CarFiltersSheet() {
  const { filters } = useCarContext()
  
  const activeFilterCount = 
    (filters.budget[0] > 0 || filters.budget[1] < 10000000 ? 1 : 0) +
    (filters.fuelType.length > 0 ? 1 : 0) +
    (filters.carType.length > 0 ? 1 : 0) +
    (filters.category ? 1 : 0)

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          Filters
          {activeFilterCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
              {activeFilterCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 overflow-y-auto">
        <SheetHeader className="mb-4">
          <SheetTitle>Filter Cars</SheetTitle>
        </SheetHeader>
        <CarFilters />
      </SheetContent>
    </Sheet>
  )
}
