"use client"

import { use, useState } from "react"
import { useRouter, notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, MapPin, Phone, User, CheckCircle2, Navigation } from "lucide-react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cars, showrooms, formatPrice } from "@/lib/car-data"
import { useCarContext } from "@/lib/car-context"
import { CarImage } from "@/components/car-image"
import { cn } from "@/lib/utils"
import { format, addDays, isBefore, startOfDay } from "date-fns"
import { toast } from "sonner"

const timeSlots = [
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM"
]

interface BookingPageProps {
  params: Promise<{ id: string }>
}

export default function BookingPage({ params }: BookingPageProps) {
  const router = useRouter()
  const { id } = use(params)
  const { addBooking, getShowroomsForCar } = useCarContext()
  
  const car = cars.find(c => c.id === id)
  
  if (!car) {
    notFound()
  }

  const availableShowrooms = getShowroomsForCar(car.id)

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    showroomId: "",
    date: null as Date | null,
    time: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const updateForm = <K extends keyof typeof formData>(key: K, value: typeof formData[K]) => {
    setFormData(prev => ({ ...prev, [key]: value }))
  }

  const isFormValid = formData.name && formData.phone && formData.showroomId && formData.date && formData.time

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormValid) return

    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    const selectedShowroom = showrooms.find(s => s.id === formData.showroomId)

    addBooking({
      carId: car.id,
      carName: car.name,
      showroomId: formData.showroomId,
      showroomName: selectedShowroom?.name || "",
      date: format(formData.date!, "PPP"),
      time: formData.time,
      name: formData.name,
      phone: formData.phone
    })

    setIsSubmitting(false)
    setIsSuccess(true)
    toast.success("Test drive booked successfully!")
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <Card className="max-w-md mx-auto text-center">
            <CardContent className="py-8">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="h-8 w-8 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Booking Confirmed!</h2>
              <p className="text-muted-foreground mb-6">
                Your test drive for {car.name} has been scheduled. You will receive a confirmation call soon.
              </p>
              <div className="bg-muted rounded-lg p-4 text-left space-y-2 mb-6">
                <p className="text-sm"><strong>Date:</strong> {format(formData.date!, "PPP")}</p>
                <p className="text-sm"><strong>Time:</strong> {formData.time}</p>
                <p className="text-sm"><strong>Showroom:</strong> {showrooms.find(s => s.id === formData.showroomId)?.name}</p>
              </div>
              <div className="flex gap-3">
                <Button asChild variant="outline" className="flex-1">
                  <Link href="/bookings">View Bookings</Link>
                </Button>
                <Button asChild className="flex-1">
                  <Link href="/cars">Browse More Cars</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        {/* Back Button */}
        <Link 
          href={`/cars/${car.id}`} 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to {car.name}
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">Book a Test Drive</h1>
              <p className="text-muted-foreground mt-1">
                Experience the {car.name} in person before you decide
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <User className="h-5 w-5 text-primary" />
                    Your Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => updateForm("name", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={(e) => updateForm("phone", e.target.value)}
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Showroom Selection */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <MapPin className="h-5 w-5 text-primary" />
                    Select Showroom
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {availableShowrooms.length === 0 ? (
                    <p className="text-muted-foreground text-center py-4">
                      No showrooms available for this brand in your area.
                    </p>
                  ) : (
                    <RadioGroup
                      value={formData.showroomId}
                      onValueChange={(value) => updateForm("showroomId", value)}
                      className="space-y-3"
                    >
                      {availableShowrooms.map((showroom) => (
                        <Label
                          key={showroom.id}
                          htmlFor={showroom.id}
                          className={cn(
                            "flex items-start gap-4 p-4 rounded-lg border-2 cursor-pointer transition-colors",
                            formData.showroomId === showroom.id 
                              ? "border-primary bg-primary/5" 
                              : "border-border hover:border-primary/50"
                          )}
                        >
                          <RadioGroupItem value={showroom.id} id={showroom.id} className="mt-1" />
                          <div className="flex-1">
                            <p className="font-medium text-foreground">{showroom.name}</p>
                            <p className="text-sm text-muted-foreground">{showroom.address}</p>
                            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Phone className="h-3 w-3" />
                                {showroom.phone}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {showroom.timings}
                              </span>
                            </div>
                          </div>
                          <Button 
                            type="button"
                            variant="ghost" 
                            size="sm"
                            className="text-primary"
                            onClick={(e) => {
                              e.preventDefault()
                              window.open(`https://maps.google.com/?q=${showroom.lat},${showroom.lng}`, "_blank")
                            }}
                          >
                            <Navigation className="h-4 w-4 mr-1" />
                            Map
                          </Button>
                        </Label>
                      ))}
                    </RadioGroup>
                  )}
                </CardContent>
              </Card>

              {/* Date & Time Selection */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Calendar className="h-5 w-5 text-primary" />
                    Select Date & Time
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Date Picker */}
                  <div className="space-y-2">
                    <Label>Preferred Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !formData.date && "text-muted-foreground"
                          )}
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          {formData.date ? format(formData.date, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={formData.date || undefined}
                          onSelect={(date) => updateForm("date", date || null)}
                          disabled={(date) => isBefore(date, startOfDay(new Date())) || isBefore(addDays(new Date(), 30), date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Time Slots */}
                  <div className="space-y-2">
                    <Label>Preferred Time</Label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {timeSlots.map((slot) => (
                        <Button
                          key={slot}
                          type="button"
                          variant={formData.time === slot ? "default" : "outline"}
                          size="sm"
                          onClick={() => updateForm("time", slot)}
                          className="text-sm"
                        >
                          {slot}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Submit Button */}
              <Button 
                type="submit" 
                size="lg" 
                className="w-full"
                disabled={!isFormValid || isSubmitting}
              >
                {isSubmitting ? "Booking..." : "Confirm Booking"}
              </Button>
            </form>
          </div>

          {/* Car Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card>
                <div className="aspect-video relative bg-muted rounded-t-lg overflow-hidden">
                  <CarImage src={car.image} alt={car.name} className="object-cover" />
                </div>
                <CardContent className="p-4">
                  <p className="text-xs text-muted-foreground font-medium">{car.brand}</p>
                  <h3 className="font-semibold text-lg text-foreground">{car.name}</h3>
                  <p className="text-xl font-bold text-primary mt-1">{formatPrice(car.price)}</p>
                  
                  <div className="mt-4 pt-4 border-t space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Fuel Type</span>
                      <span className="font-medium">{car.fuelType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Transmission</span>
                      <span className="font-medium">{car.transmission}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Seating</span>
                      <span className="font-medium">{car.seatingCapacity} People</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <p className="text-xs text-muted-foreground text-center mt-4">
                Our team will call you to confirm your booking within 24 hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
