import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { CarProvider } from "@/lib/car-context"
import { BottomNav } from "@/components/bottom-nav"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "CarMate AI - Smart Car Buying Assistant",
  description: "Your personal assistant for finding and buying the perfect car. Compare cars, get smart suggestions, and book test drives with ease.",
  keywords: ["car buying", "car comparison", "test drive booking", "electric cars", "budget cars"],
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0ea5e9" },
    { media: "(prefers-color-scheme: dark)", color: "#0c4a6e" },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <CarProvider>
            <main className="min-h-screen pb-20 md:pb-0">
              {children}
            </main>
            <BottomNav />
            <Toaster position="top-center" richColors />
          </CarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
