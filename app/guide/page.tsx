"use client"

import Link from "next/link"
import { ArrowRight, BookOpen, HelpCircle, CheckCircle2, AlertTriangle, Lightbulb, DollarSign, Car, Shield, Fuel } from "lucide-react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const tips = [
  {
    icon: DollarSign,
    title: "Set Your Budget First",
    description: "Decide how much you can afford including EMI, insurance, and maintenance costs. A good rule: your car EMI should not exceed 15% of your monthly income."
  },
  {
    icon: Car,
    title: "Know Your Needs",
    description: "Think about how you will use the car. Daily commute in city traffic? Long highway drives? Family trips? This helps narrow down the right type of car."
  },
  {
    icon: Fuel,
    title: "Choose the Right Fuel Type",
    description: "Petrol cars are cheaper to buy but cost more to run. Diesel is better for long distances. Electric saves the most on fuel but needs charging infrastructure."
  },
  {
    icon: Shield,
    title: "Don't Compromise on Safety",
    description: "Look for cars with at least 4-star safety rating. Essential features: airbags, ABS, and rear parking sensors. Safety should be non-negotiable."
  }
]

const faqs = [
  {
    question: "What is the difference between ex-showroom and on-road price?",
    answer: "Ex-showroom price is the car's base price at the dealership. On-road price includes everything you actually pay: ex-showroom price + GST (28%) + insurance + registration + road tax + accessories. On-road price is typically 10-15% higher than ex-showroom."
  },
  {
    question: "Should I buy a new car or used car?",
    answer: "New cars come with warranty, latest features, and zero worries about history. Used cars are 30-50% cheaper but may have hidden issues. For beginners, we recommend new cars for peace of mind, or certified pre-owned vehicles from authorized dealers."
  },
  {
    question: "What does mileage mean?",
    answer: "Mileage tells you how far the car can go on one liter of fuel (for petrol/diesel) or one full charge (for electric). Higher mileage = lower running costs. For example, 15 km/l means the car travels 15 kilometers on just 1 liter of petrol."
  },
  {
    question: "Manual vs Automatic - which is better?",
    answer: "Manual transmission gives you control over gear changes - it's cheaper to buy and maintain but requires more effort in traffic. Automatic changes gears for you - perfect for city driving and traffic jams but costs more. For heavy city traffic, automatic is more convenient."
  },
  {
    question: "What is a safety rating?",
    answer: "Safety ratings (1-5 stars) show how well a car protects occupants in crashes. Tested by organizations like Global NCAP. 5 stars = excellent protection, 3 or less = concerning. Always prioritize 4-5 star rated cars for your family's safety."
  },
  {
    question: "What is insurance and why do I need it?",
    answer: "Car insurance is mandatory in India. It covers damages to your car and liability if you hurt someone or damage their property. Third-party insurance is minimum required by law. Comprehensive insurance covers your car too - highly recommended."
  },
  {
    question: "What should I check during a test drive?",
    answer: "Check: 1) Comfort of seats and driving position, 2) Visibility from all angles, 3) How smooth the car accelerates and brakes, 4) Noise levels inside, 5) Air conditioning performance, 6) Infotainment system ease of use, 7) Parking and turning ease."
  },
  {
    question: "What is EMI and how is it calculated?",
    answer: "EMI (Equated Monthly Installment) is the fixed amount you pay monthly for your car loan. It depends on: loan amount, interest rate, and tenure. Longer tenure = lower EMI but more total interest paid. Most banks offer 7-8% interest rates for car loans."
  }
]

export default function GuidePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <BookOpen className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Car Buying Guide for Beginners
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            New to buying a car? Don&apos;t worry! This guide explains everything in simple terms to help you make the right decision.
          </p>
        </div>

        {/* Tips Section */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-amber-500" />
            Top Tips Before You Buy
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {tips.map((tip, index) => (
              <Card key={index}>
                <CardContent className="p-4 flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <tip.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{tip.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{tip.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Buying Checklist */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
            <CheckCircle2 className="h-6 w-6 text-emerald-500" />
            Your Buying Checklist
          </h2>
          <Card>
            <CardContent className="p-6">
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  "Research cars online (you're doing it!)",
                  "Set a realistic budget",
                  "Shortlist 3-4 cars",
                  "Book test drives for all",
                  "Compare features side-by-side",
                  "Check after-sales service network",
                  "Get insurance quotes",
                  "Negotiate the best deal",
                  "Review all documents carefully",
                  "Celebrate your new car!"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 text-sm font-medium">
                      {index + 1}
                    </div>
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Common Mistakes */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-amber-500" />
            Common Mistakes to Avoid
          </h2>
          <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
            <CardContent className="p-6">
              <ul className="space-y-3">
                {[
                  "Buying a car just because it looks good - always test drive first",
                  "Ignoring total cost of ownership (insurance, fuel, maintenance)",
                  "Rushing the decision - take your time to compare options",
                  "Skipping the test drive - you must experience the car yourself",
                  "Choosing the cheapest option - sometimes paying slightly more gives better value",
                  "Ignoring resale value - some brands hold value better than others"
                ].map((mistake, index) => (
                  <li key={index} className="flex items-start gap-2 text-amber-900 dark:text-amber-100">
                    <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                    {mistake}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* FAQs */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
            <HelpCircle className="h-6 w-6 text-primary" />
            Frequently Asked Questions
          </h2>
          <Card>
            <CardContent className="p-0">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="px-4 text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-4 text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </section>

        {/* CTA */}
        <div className="text-center py-8 bg-primary/5 rounded-2xl">
          <h2 className="text-xl font-bold text-foreground mb-2">Ready to Find Your Car?</h2>
          <p className="text-muted-foreground mb-6">
            Let our smart assistant help you find the perfect car based on your needs.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild>
              <Link href="/suggest">
                Get Recommendations
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/cars">
                Browse All Cars
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
