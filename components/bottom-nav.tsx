"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Search, Scale, Heart, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"
import { useCarContext } from "@/lib/car-context"

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/cars", icon: Search, label: "Browse" },
  { href: "/compare", icon: Scale, label: "Compare" },
  { href: "/wishlist", icon: Heart, label: "Wishlist" },
  { href: "/bookings", icon: Calendar, label: "Bookings" },
]

export function BottomNav() {
  const pathname = usePathname()
  const { wishlist, compareList, bookings } = useCarContext()

  const activeBookings = bookings.filter(b => b.status === "confirmed").length

  const getBadgeCount = (href: string) => {
    switch (href) {
      case "/wishlist":
        return wishlist.length
      case "/compare":
        return compareList.length
      case "/bookings":
        return activeBookings
      default:
        return 0
    }
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border md:hidden">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const badgeCount = getBadgeCount(item.href)
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors relative",
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <div className="relative">
                <item.icon className="h-5 w-5" />
                {badgeCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-primary text-primary-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium">
                    {badgeCount > 9 ? "9+" : badgeCount}
                  </span>
                )}
              </div>
              <span className="text-xs font-medium">{item.label}</span>
              {isActive && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full" />
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
