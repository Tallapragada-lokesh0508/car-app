"use client"

import { Suspense } from "react"
import { Header } from "@/components/header"
import { CarGrid } from "@/components/cars/car-grid"
import { CarFilters } from "@/components/cars/car-filters"
import { CarFiltersSheet } from "@/components/cars/car-filters-sheet"
import { Skeleton } from "@/components/ui/skeleton"

export default function CarsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Browse Cars</h1>
            <p className="text-muted-foreground mt-1">Find your perfect car from our collection</p>
          </div>
          
          {/* Mobile Filter Button */}
          <div className="md:hidden">
            <CarFiltersSheet />
          </div>
        </div>

        <div className="flex gap-6">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden md:block w-72 flex-shrink-0">
            <div className="sticky top-24">
              <Suspense fallback={<FiltersSkeleton />}>
                <CarFilters />
              </Suspense>
            </div>
          </aside>

          {/* Car Grid */}
          <main className="flex-1 min-w-0">
            <Suspense fallback={<GridSkeleton />}>
              <CarGrid />
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  )
}

function FiltersSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-32" />
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-32 w-full" />
    </div>
  )
}

function GridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="aspect-[16/10] rounded-lg" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-5 w-24" />
        </div>
      ))}
    </div>
  )
}
