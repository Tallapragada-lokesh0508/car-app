"use client"

import Link from "next/link"
import { Calendar, Clock, MapPin, X, CheckCircle2, XCircle, ArrowRight, Car } from "lucide-react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useCarContext } from "@/lib/car-context"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

export default function BookingsPage() {
  const { bookings, cancelBooking, getCarById } = useCarContext()

  const sortedBookings = [...bookings].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  const confirmedBookings = sortedBookings.filter(b => b.status === "confirmed")
  const pastBookings = sortedBookings.filter(b => b.status !== "confirmed")

  const handleCancel = (bookingId: string, carName: string) => {
    cancelBooking(bookingId)
    toast.success(`Booking for ${carName} has been cancelled`)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">My Bookings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your test drive appointments
          </p>
        </div>

        {bookings.length === 0 ? (
          <EmptyBookings />
        ) : (
          <div className="space-y-8">
            {/* Upcoming Bookings */}
            {confirmedBookings.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  Upcoming Test Drives ({confirmedBookings.length})
                </h2>
                <div className="grid gap-4">
                  {confirmedBookings.map((booking) => {
                    const car = getCarById(booking.carId)
                    return (
                      <Card key={booking.id} className="border-l-4 border-l-emerald-500">
                        <CardContent className="p-4">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-lg text-foreground">
                                  {booking.carName}
                                </h3>
                                <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                                  Confirmed
                                </Badge>
                              </div>
                              
                              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  {booking.date}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  {booking.time}
                                </span>
                                <span className="flex items-center gap-1">
                                  <MapPin className="h-4 w-4" />
                                  {booking.showroomName}
                                </span>
                              </div>
                            </div>

                            <div className="flex gap-2">
                              {car && (
                                <Button asChild variant="outline" size="sm">
                                  <Link href={`/cars/${car.id}`}>
                                    View Car
                                  </Link>
                                </Button>
                              )}
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                                    <X className="h-4 w-4 mr-1" />
                                    Cancel
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Cancel this booking?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to cancel your test drive for {booking.carName} on {booking.date}? This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Keep Booking</AlertDialogCancel>
                                    <AlertDialogAction 
                                      onClick={() => handleCancel(booking.id, booking.carName)}
                                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    >
                                      Yes, Cancel Booking
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </section>
            )}

            {/* Past/Cancelled Bookings */}
            {pastBookings.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-muted-foreground" />
                  Past & Cancelled ({pastBookings.length})
                </h2>
                <div className="grid gap-4">
                  {pastBookings.map((booking) => (
                    <Card key={booking.id} className="opacity-60">
                      <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-foreground">
                                {booking.carName}
                              </h3>
                              <Badge 
                                variant="secondary" 
                                className={cn(
                                  booking.status === "cancelled" 
                                    ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                    : "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400"
                                )}
                              >
                                {booking.status === "cancelled" ? "Cancelled" : "Completed"}
                              </Badge>
                            </div>
                            
                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {booking.date}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {booking.time}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function EmptyBookings() {
  return (
    <div className="text-center py-16">
      <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
        <Car className="h-10 w-10 text-muted-foreground" />
      </div>
      <h2 className="text-xl font-semibold text-foreground mb-2">No bookings yet</h2>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        Book a test drive to experience your favorite cars in person. It is the best way to find your perfect match!
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
