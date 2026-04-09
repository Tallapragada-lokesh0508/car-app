"use client"

import Link from "next/link"
import { Lightbulb, Scale, MapPin, HelpCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const actions = [
  {
    title: "Get Smart Suggestions",
    description: "Tell us your budget and needs, we will recommend the best cars for you",
    icon: Lightbulb,
    href: "/suggest",
    color: "text-amber-500"
  },
  {
    title: "Compare Cars",
    description: "Compare up to 3 cars side by side to make the right choice",
    icon: Scale,
    href: "/compare",
    color: "text-blue-500"
  },
  {
    title: "Find Showrooms",
    description: "Locate nearby showrooms and book a test drive",
    icon: MapPin,
    href: "/showrooms",
    color: "text-emerald-500"
  },
  {
    title: "Car Buying Guide",
    description: "New to cars? Learn the basics of buying your first car",
    icon: HelpCircle,
    href: "/guide",
    color: "text-purple-500"
  }
]

export function QuickActions() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">How Can We Help?</h2>
        <p className="text-muted-foreground mt-1">Quick actions to get you started</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions.map((action) => (
          <Link key={action.title} href={action.href}>
            <Card className="group cursor-pointer h-full hover:shadow-md transition-all duration-300 border-2 border-transparent hover:border-primary/20">
              <CardContent className="p-5 flex gap-4">
                <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-muted flex items-center justify-center ${action.color}`}>
                  <action.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {action.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
