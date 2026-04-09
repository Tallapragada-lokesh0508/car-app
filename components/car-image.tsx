"use client"

import { useState } from "react"
import Image from "next/image"
import { Car } from "lucide-react"
import { cn } from "@/lib/utils"

interface CarImageProps {
  src: string
  alt: string
  className?: string
  priority?: boolean
}

// Map car IDs to Unsplash images
const carImages: Record<string, string> = {
  "/cars/swift.jpg": "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&auto=format&fit=crop&q=80",
  "/cars/i20.jpg": "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800&auto=format&fit=crop&q=80",
  "/cars/nexon.jpg": "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&auto=format&fit=crop&q=80",
  "/cars/creta.jpg": "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800&auto=format&fit=crop&q=80",
  "/cars/nexon-ev.jpg": "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&auto=format&fit=crop&q=80",
  "/cars/zs-ev.jpg": "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&auto=format&fit=crop&q=80",
  "/cars/innova.jpg": "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&auto=format&fit=crop&q=80",
  "/cars/xuv700.jpg": "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&auto=format&fit=crop&q=80",
  "/cars/seltos.jpg": "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800&auto=format&fit=crop&q=80",
  "/cars/city.jpg": "https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&auto=format&fit=crop&q=80",
  "/cars/punch.jpg": "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&auto=format&fit=crop&q=80",
  "/cars/baleno.jpg": "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&auto=format&fit=crop&q=80",
  "/cars/c-class.jpg": "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&auto=format&fit=crop&q=80",
  "/cars/3-series.jpg": "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&auto=format&fit=crop&q=80",
  "/cars/q5.jpg": "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&auto=format&fit=crop&q=80",
  "/cars/ioniq5.jpg": "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&auto=format&fit=crop&q=80",
  "/cars/tiago.jpg": "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&auto=format&fit=crop&q=80",
  "/cars/comet.jpg": "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&auto=format&fit=crop&q=80"
}

export function CarImage({ src, alt, className, priority = false }: CarImageProps) {
  const [hasError, setHasError] = useState(false)
  const imageUrl = carImages[src] || src

  if (hasError) {
    return (
      <div className={cn("flex items-center justify-center bg-muted", className)}>
        <Car className="h-16 w-16 text-muted-foreground/50" />
      </div>
    )
  }

  return (
    <Image
      src={imageUrl}
      alt={alt}
      fill
      className={cn("object-cover", className)}
      onError={() => setHasError(true)}
      priority={priority}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  )
}
