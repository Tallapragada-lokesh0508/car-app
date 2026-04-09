export interface Car {
  id: string
  name: string
  brand: string
  price: number
  year: number
  fuelType: "Petrol" | "Diesel" | "Electric" | "Hybrid"
  carType: "Sedan" | "SUV" | "Hatchback" | "Luxury"
  category: "budget" | "family" | "electric" | "luxury"
  mileage: string
  batteryRange?: string
  seatingCapacity: number
  transmission: "Manual" | "Automatic" | "Both"
  safetyRating: number
  image: string
  features: string[]
  pros: string[]
  cons: string[]
  whoShouldBuy: string
  beginnerFriendly: boolean
  discount?: number
  description: string
}

export interface Showroom {
  id: string
  name: string
  address: string
  city: string
  lat: number
  lng: number
  brands: string[]
  phone: string
  timings: string
}

export const cars: Car[] = [
  {
    id: "maruti-swift",
    name: "Maruti Swift",
    brand: "Maruti Suzuki",
    price: 649000,
    year: 2024,
    fuelType: "Petrol",
    carType: "Hatchback",
    category: "budget",
    mileage: "22.56 km/l",
    seatingCapacity: 5,
    transmission: "Both",
    safetyRating: 4,
    image: "/cars/swift.jpg",
    features: ["Touchscreen Infotainment", "Rear Parking Sensors", "Dual Airbags", "ABS with EBD", "Auto AC"],
    pros: ["Great fuel efficiency - saves money on petrol", "Easy to drive in city traffic", "Low maintenance cost", "Widely available service centers"],
    cons: ["Small boot space for luggage", "Basic safety features in base variant"],
    whoShouldBuy: "Perfect for first-time buyers, daily commuters, or anyone wanting a reliable city car that is easy on the pocket.",
    beginnerFriendly: true,
    discount: 25000,
    description: "India's most popular hatchback known for its peppy performance and excellent fuel efficiency."
  },
  {
    id: "hyundai-i20",
    name: "Hyundai i20",
    brand: "Hyundai",
    price: 749000,
    year: 2024,
    fuelType: "Petrol",
    carType: "Hatchback",
    category: "budget",
    mileage: "20.35 km/l",
    seatingCapacity: 5,
    transmission: "Both",
    safetyRating: 4,
    image: "/cars/i20.jpg",
    features: ["10.25 inch Touchscreen", "Wireless Charging", "Sunroof", "Connected Car Tech", "6 Airbags"],
    pros: ["Premium interiors with modern features", "Comfortable ride quality", "Good safety with 6 airbags", "Stylish looks"],
    cons: ["Higher price than competitors", "Diesel variant discontinued"],
    whoShouldBuy: "Ideal for young professionals who want a feature-rich car with premium feel without going for expensive sedans.",
    beginnerFriendly: true,
    discount: 15000,
    description: "A premium hatchback offering segment-leading features and a comfortable driving experience."
  },
  {
    id: "tata-nexon",
    name: "Tata Nexon",
    brand: "Tata",
    price: 849000,
    year: 2024,
    fuelType: "Petrol",
    carType: "SUV",
    category: "family",
    mileage: "17.33 km/l",
    seatingCapacity: 5,
    transmission: "Both",
    safetyRating: 5,
    image: "/cars/nexon.jpg",
    features: ["10.25 inch Floating Screen", "Ventilated Seats", "Air Purifier", "360 Camera", "Electric Sunroof"],
    pros: ["5-star safety rating - very safe for families", "Bold SUV looks", "Spacious interiors", "Good ground clearance"],
    cons: ["Average fuel efficiency", "Firm ride on bad roads"],
    whoShouldBuy: "Best for families who prioritize safety and want a stylish SUV for both city and occasional highway trips.",
    beginnerFriendly: true,
    discount: 30000,
    description: "India's safest SUV with 5-star Global NCAP rating, perfect for safety-conscious families."
  },
  {
    id: "hyundai-creta",
    name: "Hyundai Creta",
    brand: "Hyundai",
    price: 1099000,
    year: 2024,
    fuelType: "Petrol",
    carType: "SUV",
    category: "family",
    mileage: "16.8 km/l",
    seatingCapacity: 5,
    transmission: "Both",
    safetyRating: 5,
    image: "/cars/creta.jpg",
    features: ["Panoramic Sunroof", "ADAS Level 2", "Bose Sound System", "Ventilated Seats", "Wireless Android Auto/Apple CarPlay"],
    pros: ["Loaded with premium features", "Comfortable for long drives", "Strong brand resale value", "Smooth automatic gearbox"],
    cons: ["Premium pricing", "Rear seat space could be better"],
    whoShouldBuy: "Perfect for families wanting a premium SUV experience with advanced safety features and comfortable long-distance travel.",
    beginnerFriendly: true,
    discount: 20000,
    description: "India's best-selling mid-size SUV known for its premium features and comfortable ride."
  },
  {
    id: "tata-nexon-ev",
    name: "Tata Nexon EV",
    brand: "Tata",
    price: 1499000,
    year: 2024,
    fuelType: "Electric",
    carType: "SUV",
    category: "electric",
    mileage: "N/A",
    batteryRange: "465 km per charge",
    seatingCapacity: 5,
    transmission: "Automatic",
    safetyRating: 5,
    image: "/cars/nexon-ev.jpg",
    features: ["Fast Charging Support", "Connected Car Tech", "Regenerative Braking", "Multi-mode Regen", "7 inch Digital Cluster"],
    pros: ["Zero running cost on fuel", "Silent and smooth drive", "Low maintenance", "Government subsidies available"],
    cons: ["Charging infrastructure still developing", "Higher initial cost"],
    whoShouldBuy: "Ideal for environmentally conscious buyers with home charging facility who primarily drive within city limits.",
    beginnerFriendly: true,
    discount: 50000,
    description: "India's best-selling electric SUV with excellent range and 5-star safety rating."
  },
  {
    id: "mg-zs-ev",
    name: "MG ZS EV",
    brand: "MG",
    price: 1899000,
    year: 2024,
    fuelType: "Electric",
    carType: "SUV",
    category: "electric",
    mileage: "N/A",
    batteryRange: "461 km per charge",
    seatingCapacity: 5,
    transmission: "Automatic",
    safetyRating: 5,
    image: "/cars/zs-ev.jpg",
    features: ["17 inch Alloy Wheels", "Panoramic Sunroof", "PM 2.5 Filter", "6-way Power Seats", "Level 2 ADAS"],
    pros: ["Spacious interiors", "Premium feel", "Good highway range", "Advanced safety features"],
    cons: ["Limited service network", "Higher price point"],
    whoShouldBuy: "Great for those who want a premium electric SUV experience with more space and advanced technology.",
    beginnerFriendly: false,
    discount: 40000,
    description: "A premium electric SUV offering excellent range and spacious interiors."
  },
  {
    id: "toyota-innova-crysta",
    name: "Toyota Innova Crysta",
    brand: "Toyota",
    price: 1999000,
    year: 2024,
    fuelType: "Diesel",
    carType: "SUV",
    category: "family",
    mileage: "15.1 km/l",
    seatingCapacity: 7,
    transmission: "Both",
    safetyRating: 4,
    image: "/cars/innova.jpg",
    features: ["Captain Seats", "Ambient Lighting", "Roof-mounted AC", "9 inch Touchscreen", "7 Airbags"],
    pros: ["Legendary reliability", "Spacious 7-seater", "Excellent comfort for passengers", "Strong resale value"],
    cons: ["High fuel consumption", "Boxy design"],
    whoShouldBuy: "Perfect for large families or those who frequently travel with extended family and need maximum space and comfort.",
    beginnerFriendly: false,
    discount: 0,
    description: "The benchmark MPV in India, known for unmatched reliability and spacious interiors."
  },
  {
    id: "mahindra-xuv700",
    name: "Mahindra XUV700",
    brand: "Mahindra",
    price: 1449000,
    year: 2024,
    fuelType: "Diesel",
    carType: "SUV",
    category: "family",
    mileage: "16 km/l",
    seatingCapacity: 7,
    transmission: "Both",
    safetyRating: 5,
    image: "/cars/xuv700.jpg",
    features: ["10.25 inch Twin Screens", "ADAS", "Alexa Built-in", "Flush Door Handles", "Sony 3D Sound"],
    pros: ["Best-in-class features", "Powerful engine options", "5-star safety", "Value for money"],
    cons: ["Long waiting period", "Some quality issues reported"],
    whoShouldBuy: "Best for those who want maximum features and space at an attractive price point with advanced safety.",
    beginnerFriendly: true,
    discount: 25000,
    description: "Feature-loaded SUV that offers premium features at an aggressive price point."
  },
  {
    id: "kia-seltos",
    name: "Kia Seltos",
    brand: "Kia",
    price: 1099000,
    year: 2024,
    fuelType: "Petrol",
    carType: "SUV",
    category: "family",
    mileage: "16.5 km/l",
    seatingCapacity: 5,
    transmission: "Both",
    safetyRating: 4,
    image: "/cars/seltos.jpg",
    features: ["Bose Sound System", "Ventilated Seats", "360 Camera", "10.25 inch Screens", "Paddle Shifters"],
    pros: ["Feature-rich cabin", "Multiple powertrain options", "Bold design", "Good after-sales service"],
    cons: ["Firm ride quality", "Average rear seat comfort"],
    whoShouldBuy: "Ideal for young buyers who want a stylish SUV with lots of features and don't mind a slightly firm ride.",
    beginnerFriendly: true,
    discount: 15000,
    description: "A stylish mid-size SUV that offers a perfect blend of features and performance."
  },
  {
    id: "honda-city",
    name: "Honda City",
    brand: "Honda",
    price: 1199000,
    year: 2024,
    fuelType: "Petrol",
    carType: "Sedan",
    category: "family",
    mileage: "18.4 km/l",
    seatingCapacity: 5,
    transmission: "Both",
    safetyRating: 4,
    image: "/cars/city.jpg",
    features: ["Lane Watch Camera", "Honda Connect", "8 inch Touchscreen", "LED Headlamps", "Electric Sunroof"],
    pros: ["Refined petrol engine", "Spacious rear seat", "Premium cabin quality", "Good fuel efficiency"],
    cons: ["Missing some modern features", "Basic safety in lower variants"],
    whoShouldBuy: "Perfect for buyers who prefer the classic sedan body style with reliable Honda engineering.",
    beginnerFriendly: true,
    discount: 20000,
    description: "A refined sedan that offers excellent comfort and Honda's legendary reliability."
  },
  {
    id: "tata-punch",
    name: "Tata Punch",
    brand: "Tata",
    price: 599000,
    year: 2024,
    fuelType: "Petrol",
    carType: "Hatchback",
    category: "budget",
    mileage: "18.97 km/l",
    seatingCapacity: 5,
    transmission: "Both",
    safetyRating: 5,
    image: "/cars/punch.jpg",
    features: ["7 inch Touchscreen", "Harman Audio", "90 degree Door Opening", "Traction Pro Mode", "Projector Headlamps"],
    pros: ["5-star safety at budget price", "High ground clearance", "Peppy engine", "Compact yet spacious"],
    cons: ["No diesel option", "Basic interiors in lower variants"],
    whoShouldBuy: "Best first car for new drivers who want maximum safety without breaking the bank.",
    beginnerFriendly: true,
    discount: 15000,
    description: "India's safest budget car with 5-star safety rating and micro-SUV styling."
  },
  {
    id: "maruti-baleno",
    name: "Maruti Baleno",
    brand: "Maruti Suzuki",
    price: 699000,
    year: 2024,
    fuelType: "Petrol",
    carType: "Hatchback",
    category: "budget",
    mileage: "22.35 km/l",
    seatingCapacity: 5,
    transmission: "Both",
    safetyRating: 3,
    image: "/cars/baleno.jpg",
    features: ["9 inch SmartPlay Pro+", "HUD Display", "360 Camera", "Suzuki Connect", "6 Airbags"],
    pros: ["Best-in-class mileage", "Feature-loaded", "Spacious cabin", "Smooth CVT option"],
    cons: ["Average safety rating", "Firm suspension"],
    whoShouldBuy: "Perfect for those wanting a premium hatchback experience with excellent fuel efficiency.",
    beginnerFriendly: true,
    discount: 20000,
    description: "A premium hatchback offering segment-leading fuel efficiency and features."
  },
  {
    id: "mercedes-c-class",
    name: "Mercedes-Benz C-Class",
    brand: "Mercedes-Benz",
    price: 5700000,
    year: 2024,
    fuelType: "Petrol",
    carType: "Luxury",
    category: "luxury",
    mileage: "14.1 km/l",
    seatingCapacity: 5,
    transmission: "Automatic",
    safetyRating: 5,
    image: "/cars/c-class.jpg",
    features: ["MBUX System", "Burmester Sound", "64 Ambient Colors", "Digital Cockpit", "Wireless Charging"],
    pros: ["World-class luxury", "Advanced technology", "Excellent build quality", "Prestigious brand"],
    cons: ["Expensive maintenance", "Small rear seat"],
    whoShouldBuy: "For those who have arrived in life and want to enjoy true luxury and prestige.",
    beginnerFriendly: false,
    discount: 0,
    description: "The epitome of luxury sedans, offering world-class comfort and cutting-edge technology."
  },
  {
    id: "bmw-3-series",
    name: "BMW 3 Series",
    brand: "BMW",
    price: 4990000,
    year: 2024,
    fuelType: "Petrol",
    carType: "Luxury",
    category: "luxury",
    mileage: "13.27 km/l",
    seatingCapacity: 5,
    transmission: "Automatic",
    safetyRating: 5,
    image: "/cars/3-series.jpg",
    features: ["BMW Live Cockpit", "Gesture Control", "Parking Assistant", "Harman Kardon Sound", "Sport Mode"],
    pros: ["Best driving dynamics", "Iconic design", "Premium interiors", "Excellent performance"],
    cons: ["Firm ride", "Expensive spare parts"],
    whoShouldBuy: "For driving enthusiasts who want the thrill of a sports sedan with everyday luxury.",
    beginnerFriendly: false,
    discount: 100000,
    description: "The ultimate driving machine, combining performance and luxury in perfect harmony."
  },
  {
    id: "audi-q5",
    name: "Audi Q5",
    brand: "Audi",
    price: 6590000,
    year: 2024,
    fuelType: "Petrol",
    carType: "Luxury",
    category: "luxury",
    mileage: "13.41 km/l",
    seatingCapacity: 5,
    transmission: "Automatic",
    safetyRating: 5,
    image: "/cars/q5.jpg",
    features: ["Virtual Cockpit", "Quattro AWD", "Matrix LED", "Bang & Olufsen Sound", "Adaptive Cruise"],
    pros: ["Quattro all-wheel drive", "Premium build quality", "Excellent infotainment", "Comfortable ride"],
    cons: ["High running costs", "Smaller than rivals"],
    whoShouldBuy: "For those who want a compact luxury SUV with excellent all-weather capability.",
    beginnerFriendly: false,
    discount: 200000,
    description: "A premium compact SUV offering Audi's legendary Quattro AWD system."
  },
  {
    id: "hyundai-ioniq-5",
    name: "Hyundai Ioniq 5",
    brand: "Hyundai",
    price: 4499000,
    year: 2024,
    fuelType: "Electric",
    carType: "SUV",
    category: "electric",
    mileage: "N/A",
    batteryRange: "631 km per charge",
    seatingCapacity: 5,
    transmission: "Automatic",
    safetyRating: 5,
    image: "/cars/ioniq5.jpg",
    features: ["800V Ultra-Fast Charging", "Vehicle-to-Load", "Relaxation Seats", "BOSE Premium Sound", "Augmented Reality HUD"],
    pros: ["Futuristic design", "Ultra-fast charging", "Spacious interiors", "Vehicle-to-load feature"],
    cons: ["Premium pricing", "Limited charging network"],
    whoShouldBuy: "For early adopters who want cutting-edge EV technology with statement-making design.",
    beginnerFriendly: false,
    discount: 0,
    description: "A revolutionary electric vehicle offering futuristic design and ultra-fast charging."
  },
  {
    id: "tata-tiago",
    name: "Tata Tiago",
    brand: "Tata",
    price: 549000,
    year: 2024,
    fuelType: "Petrol",
    carType: "Hatchback",
    category: "budget",
    mileage: "19.8 km/l",
    seatingCapacity: 5,
    transmission: "Both",
    safetyRating: 4,
    image: "/cars/tiago.jpg",
    features: ["7 inch Touchscreen", "Harman Audio", "Digital Instrument Cluster", "Follow-me-home Headlamps", "Dual Airbags"],
    pros: ["Most affordable Tata", "Good safety", "Peppy petrol engine", "Value for money"],
    cons: ["Basic interiors", "Limited features in base variant"],
    whoShouldBuy: "Best budget car for first-time buyers who want safety without compromising too much.",
    beginnerFriendly: true,
    discount: 20000,
    description: "An affordable hatchback offering good safety and value for money."
  },
  {
    id: "mg-comet",
    name: "MG Comet EV",
    brand: "MG",
    price: 799000,
    year: 2024,
    fuelType: "Electric",
    carType: "Hatchback",
    category: "electric",
    mileage: "N/A",
    batteryRange: "230 km per charge",
    seatingCapacity: 4,
    transmission: "Automatic",
    safetyRating: 3,
    image: "/cars/comet.jpg",
    features: ["10.25 inch Screen", "Wireless Connectivity", "Flip Key", "LED DRLs", "Digital Cluster"],
    pros: ["Most affordable EV", "Perfect for city commute", "Cute design", "Easy to park"],
    cons: ["Limited range", "Only 4 seater", "Basic safety"],
    whoShouldBuy: "Perfect for city dwellers looking for an affordable electric car for short commutes.",
    beginnerFriendly: true,
    discount: 0,
    description: "India's most affordable electric car, perfect for urban commuters."
  }
]

export const showrooms: Showroom[] = [
  {
    id: "show-1",
    name: "Maruti Suzuki Arena - Koramangala",
    address: "123, 80 Feet Road, Koramangala",
    city: "Bangalore",
    lat: 12.9352,
    lng: 77.6245,
    brands: ["Maruti Suzuki"],
    phone: "+91 80 4567 8901",
    timings: "9:00 AM - 8:00 PM"
  },
  {
    id: "show-2",
    name: "Hyundai - Indiranagar",
    address: "456, 100 Feet Road, Indiranagar",
    city: "Bangalore",
    lat: 12.9716,
    lng: 77.6412,
    brands: ["Hyundai"],
    phone: "+91 80 4567 8902",
    timings: "9:30 AM - 7:30 PM"
  },
  {
    id: "show-3",
    name: "Tata Motors - Whitefield",
    address: "789, ITPL Main Road, Whitefield",
    city: "Bangalore",
    lat: 12.9698,
    lng: 77.7500,
    brands: ["Tata"],
    phone: "+91 80 4567 8903",
    timings: "9:00 AM - 8:00 PM"
  },
  {
    id: "show-4",
    name: "Kia India - Electronic City",
    address: "321, Electronic City Phase 1",
    city: "Bangalore",
    lat: 12.8399,
    lng: 77.6770,
    brands: ["Kia"],
    phone: "+91 80 4567 8904",
    timings: "10:00 AM - 7:00 PM"
  },
  {
    id: "show-5",
    name: "MG Motor - HSR Layout",
    address: "555, Sector 2, HSR Layout",
    city: "Bangalore",
    lat: 12.9081,
    lng: 77.6476,
    brands: ["MG"],
    phone: "+91 80 4567 8905",
    timings: "9:30 AM - 8:00 PM"
  },
  {
    id: "show-6",
    name: "Mercedes-Benz - MG Road",
    address: "789, MG Road, Central Bangalore",
    city: "Bangalore",
    lat: 12.9757,
    lng: 77.6062,
    brands: ["Mercedes-Benz"],
    phone: "+91 80 4567 8906",
    timings: "10:00 AM - 7:00 PM"
  },
  {
    id: "show-7",
    name: "BMW - Lavelle Road",
    address: "246, Lavelle Road",
    city: "Bangalore",
    lat: 12.9667,
    lng: 77.5960,
    brands: ["BMW"],
    phone: "+91 80 4567 8907",
    timings: "10:00 AM - 7:00 PM"
  },
  {
    id: "show-8",
    name: "Toyota - JP Nagar",
    address: "135, 15th Cross, JP Nagar",
    city: "Bangalore",
    lat: 12.9063,
    lng: 77.5857,
    brands: ["Toyota"],
    phone: "+91 80 4567 8908",
    timings: "9:00 AM - 8:00 PM"
  },
  {
    id: "show-9",
    name: "Honda Cars - Marathahalli",
    address: "468, ORR, Marathahalli",
    city: "Bangalore",
    lat: 12.9592,
    lng: 77.6974,
    brands: ["Honda"],
    phone: "+91 80 4567 8909",
    timings: "9:30 AM - 7:30 PM"
  },
  {
    id: "show-10",
    name: "Mahindra - Jayanagar",
    address: "579, 9th Block, Jayanagar",
    city: "Bangalore",
    lat: 12.9279,
    lng: 77.5838,
    brands: ["Mahindra"],
    phone: "+91 80 4567 8910",
    timings: "9:00 AM - 8:00 PM"
  },
  {
    id: "show-11",
    name: "Audi - Richmond Road",
    address: "890, Richmond Road",
    city: "Bangalore",
    lat: 12.9634,
    lng: 77.6009,
    brands: ["Audi"],
    phone: "+91 80 4567 8911",
    timings: "10:00 AM - 7:00 PM"
  }
]

export const categories = [
  {
    id: "budget",
    name: "Budget Cars",
    description: "Great cars under 10 Lakhs",
    icon: "Wallet",
    color: "bg-emerald-500"
  },
  {
    id: "family",
    name: "Family Cars",
    description: "Spacious & comfortable",
    icon: "Users",
    color: "bg-blue-500"
  },
  {
    id: "electric",
    name: "Electric Cars",
    description: "Go green & save fuel costs",
    icon: "Zap",
    color: "bg-amber-500"
  },
  {
    id: "luxury",
    name: "Luxury Cars",
    description: "Premium driving experience",
    icon: "Crown",
    color: "bg-purple-500"
  }
]

export function formatPrice(price: number): string {
  if (price >= 10000000) {
    return `${(price / 10000000).toFixed(2)} Cr`
  }
  return `${(price / 100000).toFixed(2)} L`
}

export function calculateFinalPrice(price: number, discount: number = 0): {
  basePrice: number
  gst: number
  discountAmount: number
  finalPrice: number
} {
  const gst = price * 0.28
  const discountAmount = discount
  const finalPrice = price + gst - discountAmount
  
  return {
    basePrice: price,
    gst,
    discountAmount,
    finalPrice
  }
}
