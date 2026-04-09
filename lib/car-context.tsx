"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from "react"
import { Car, cars as carData, Showroom, showrooms as showroomData } from "./car-data"

export interface Booking {
  id: string
  carId: string
  carName: string
  showroomId: string
  showroomName: string
  date: string
  time: string
  name: string
  phone: string
  status: "confirmed" | "cancelled" | "completed"
  createdAt: string
}

interface CarContextType {
  cars: Car[]
  showrooms: Showroom[]
  wishlist: string[]
  compareList: string[]
  bookings: Booking[]
  searchQuery: string
  filters: {
    budget: [number, number]
    fuelType: string[]
    carType: string[]
    category: string
  }
  addToWishlist: (carId: string) => void
  removeFromWishlist: (carId: string) => void
  isInWishlist: (carId: string) => boolean
  addToCompare: (carId: string) => void
  removeFromCompare: (carId: string) => void
  isInCompare: (carId: string) => boolean
  clearCompare: () => void
  addBooking: (booking: Omit<Booking, "id" | "status" | "createdAt">) => void
  cancelBooking: (bookingId: string) => void
  setSearchQuery: (query: string) => void
  setFilters: (filters: Partial<CarContextType["filters"]>) => void
  resetFilters: () => void
  getFilteredCars: () => Car[]
  getCarById: (id: string) => Car | undefined
  getShowroomById: (id: string) => Showroom | undefined
  getShowroomsForCar: (carId: string) => Showroom[]
}

const defaultFilters = {
  budget: [0, 10000000] as [number, number],
  fuelType: [] as string[],
  carType: [] as string[],
  category: ""
}

const CarContext = createContext<CarContextType | undefined>(undefined)

export function CarProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<string[]>([])
  const [compareList, setCompareList] = useState<string[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFiltersState] = useState(defaultFilters)

  // Load from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem("carmate-wishlist")
    const savedCompare = localStorage.getItem("carmate-compare")
    const savedBookings = localStorage.getItem("carmate-bookings")
    
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist))
    if (savedCompare) setCompareList(JSON.parse(savedCompare))
    if (savedBookings) setBookings(JSON.parse(savedBookings))
  }, [])

  // Save to localStorage on changes
  useEffect(() => {
    localStorage.setItem("carmate-wishlist", JSON.stringify(wishlist))
  }, [wishlist])

  useEffect(() => {
    localStorage.setItem("carmate-compare", JSON.stringify(compareList))
  }, [compareList])

  useEffect(() => {
    localStorage.setItem("carmate-bookings", JSON.stringify(bookings))
  }, [bookings])

  const addToWishlist = useCallback((carId: string) => {
    setWishlist(prev => [...new Set([...prev, carId])])
  }, [])

  const removeFromWishlist = useCallback((carId: string) => {
    setWishlist(prev => prev.filter(id => id !== carId))
  }, [])

  const isInWishlist = useCallback((carId: string) => {
    return wishlist.includes(carId)
  }, [wishlist])

  const addToCompare = useCallback((carId: string) => {
    setCompareList(prev => {
      if (prev.length >= 3) return prev
      return [...new Set([...prev, carId])]
    })
  }, [])

  const removeFromCompare = useCallback((carId: string) => {
    setCompareList(prev => prev.filter(id => id !== carId))
  }, [])

  const isInCompare = useCallback((carId: string) => {
    return compareList.includes(carId)
  }, [compareList])

  const clearCompare = useCallback(() => {
    setCompareList([])
  }, [])

  const addBooking = useCallback((booking: Omit<Booking, "id" | "status" | "createdAt">) => {
    const newBooking: Booking = {
      ...booking,
      id: `booking-${Date.now()}`,
      status: "confirmed",
      createdAt: new Date().toISOString()
    }
    setBookings(prev => [...prev, newBooking])
  }, [])

  const cancelBooking = useCallback((bookingId: string) => {
    setBookings(prev => 
      prev.map(b => b.id === bookingId ? { ...b, status: "cancelled" as const } : b)
    )
  }, [])

  const setFilters = useCallback((newFilters: Partial<typeof filters>) => {
    setFiltersState(prev => ({ ...prev, ...newFilters }))
  }, [])

  const resetFilters = useCallback(() => {
    setFiltersState(defaultFilters)
  }, [])

  const getFilteredCars = useCallback(() => {
    return carData.filter(car => {
      // Search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesSearch = 
          car.name.toLowerCase().includes(query) ||
          car.brand.toLowerCase().includes(query) ||
          car.carType.toLowerCase().includes(query)
        if (!matchesSearch) return false
      }

      // Budget filter
      if (car.price < filters.budget[0] || car.price > filters.budget[1]) {
        return false
      }

      // Fuel type filter
      if (filters.fuelType.length > 0 && !filters.fuelType.includes(car.fuelType)) {
        return false
      }

      // Car type filter
      if (filters.carType.length > 0 && !filters.carType.includes(car.carType)) {
        return false
      }

      // Category filter
      if (filters.category && car.category !== filters.category) {
        return false
      }

      return true
    })
  }, [searchQuery, filters])

  const getCarById = useCallback((id: string) => {
    return carData.find(car => car.id === id)
  }, [])

  const getShowroomById = useCallback((id: string) => {
    return showroomData.find(showroom => showroom.id === id)
  }, [])

  const getShowroomsForCar = useCallback((carId: string) => {
    const car = carData.find(c => c.id === carId)
    if (!car) return []
    return showroomData.filter(showroom => 
      showroom.brands.includes(car.brand)
    )
  }, [])

  return (
    <CarContext.Provider
      value={{
        cars: carData,
        showrooms: showroomData,
        wishlist,
        compareList,
        bookings,
        searchQuery,
        filters,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        addToCompare,
        removeFromCompare,
        isInCompare,
        clearCompare,
        addBooking,
        cancelBooking,
        setSearchQuery,
        setFilters,
        resetFilters,
        getFilteredCars,
        getCarById,
        getShowroomById,
        getShowroomsForCar
      }}
    >
      {children}
    </CarContext.Provider>
  )
}

export function useCarContext() {
  const context = useContext(CarContext)
  if (context === undefined) {
    throw new Error("useCarContext must be used within a CarProvider")
  }
  return context
}
