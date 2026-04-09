"use client"

import Link from "next/link"
import { Wallet, Users, Zap, Crown, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const categories = [
  {
    id: "budget",
    name: "Budget Cars",
    description: "Great cars under 10 Lakhs",
    icon: Wallet,
    color: "bg-emerald-500",
    lightBg: "bg-emerald-50 dark:bg-emerald-950/30",
    href: "/cars?category=budget"
  },
  {
    id: "family",
    name: "Family Cars",
    description: "Spacious & comfortable",
    icon: Users,
    color: "bg-blue-500",
    lightBg: "bg-blue-50 dark:bg-blue-950/30",
    href: "/cars?category=family"
  },
  {
    id: "electric",
    name: "Electric Cars",
    description: "Go green & save fuel costs",
    icon: Zap,
    color: "bg-amber-500",
    lightBg: "bg-amber-50 dark:bg-amber-950/30",
    href: "/cars?category=electric"
  },
  {
    id: "luxury",
    name: "Luxury Cars",
    description: "Premium driving experience",
    icon: Crown,
    color: "bg-purple-500",
    lightBg: "bg-purple-50 dark:bg-purple-950/30",
    href: "/cars?category=luxury"
  }
]

export function CategorySection() {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Browse by Category</h2>
          <p className="text-muted-foreground mt-1">Find the right type of car for your needs</p>
        </div>
        <Link 
          href="/cars" 
          className="hidden md:flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          View all cars
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category) => (
          <Link key={category.id} href={category.href}>
            <Card className={cn(
              "group cursor-pointer border-2 border-transparent hover:border-primary/20 transition-all duration-300",
              category.lightBg
            )}>
              <CardContent className="p-5">
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
                  category.color
                )}>
                  <category.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {category.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
