import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Plane, GraduationCap, Calendar, Users, MapPin, ArrowRight, CheckCircle2 } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Plane className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold">Авіаційний коледж</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#" className="text-sm font-medium transition-colors hover:text-primary">
              Programs
            </Link>
            <Link href="#" className="text-sm font-medium transition-colors hover:text-primary">
              Facilities
            </Link>
            <Link href="#" className="text-sm font-medium transition-colors hover:text-primary">
              Student Life
            </Link>
            <Link href="#" className="text-sm font-medium transition-colors hover:text-primary">
              Admissions
            </Link>
            <Link href="#" className="text-sm font-medium transition-colors hover:text-primary">
              About Us
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="hidden md:flex">
              Login
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">Apply Now</Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0 z-0">
            <Image
              src="/hero.jpg"
              alt="Aviation students with aircraft"
              fill
              className="object-cover brightness-[0.7]"
              priority
            />
          </div>
          <div className="container relative z-10 flex flex-col items-center justify-center space-y-4 py-32 text-center text-white md:py-48 lg:py-56">
            <Badge className="bg-blue-600 hover:bg-blue-600">Enrollment Open for Fall 2025</Badge>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Авіаційний коледж
            </h1>
            <p className="max-w-[700px] text-lg text-white/90 md:text-xl">
              Світові класи навчальні програми, стан-оф-а-т-арні навчальні прилади, і промислові зв'язки для запуску вашої
              aviation career.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Explore Programs
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-900"
              >
                Schedule a Tour
              </Button>
            </div>
          </div>
        </section>

        {/* Programs Section */}
        <section className="bg-white py-16 md:py-24">
          <div className="container space-y-12">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="inline-block rounded-full bg-blue-100 p-2">
                <GraduationCap className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Aviation Programs</h2>
              <p className="max-w-[700px] text-muted-foreground">
                Comprehensive training programs designed to prepare you for a successful career in aviation.
              </p>
            </div>

            <Tabs defaultValue="pilot" className="w-full">
              <div className="flex justify-center">
                <TabsList className="mb-8">
                  <TabsTrigger value="pilot">Pilot Training</TabsTrigger>
                  <TabsTrigger value="maintenance">Aircraft Maintenance</TabsTrigger>
                  <TabsTrigger value="management">Aviation Management</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="pilot" className="space-y-8">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {[
                    {
                      title: "Commercial Pilot License",
                      description: "FAA-certified training for aspiring commercial pilots",
                      duration: "18-24 months",
                      image: "https://placehold.co/400x300/blue/white?text=Commercial+Pilot",
                    },
                    {
                      title: "Instrument Rating",
                      description: "Advanced training for flying in various weather conditions",
                      duration: "4-6 months",
                      image: "https://placehold.co/400x300/blue/white?text=Instrument+Rating",
                    },
                    {
                      title: "Flight Instructor Certification",
                      description: "Prepare to train the next generation of pilots",
                      duration: "3-4 months",
                      image: "https://placehold.co/400x300/blue/white?text=Flight+Instructor",
                    },
                  ].map((program, index) => (
                    <Card key={index} className="overflow-hidden">
                      <div className="relative h-48">
                        <Image
                          src={program.image || "https://placehold.co/400x300/blue/white?text=Program+Name"}
                          alt={program.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardHeader>
                        <CardTitle>{program.title}</CardTitle>
                        <CardDescription>{program.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-blue-600" />
                          <span className="text-sm text-muted-foreground">{program.duration}</span>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full">
                          Learn More
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="maintenance" className="space-y-8">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {[
                    {
                      title: "Aircraft Maintenance Technician",
                      description: "FAA-certified training for aircraft maintenance",
                      duration: "18-24 months",
                      image: "https://placehold.co/400x300/blue/white?text=Maintenance+Tech",
                    },
                    {
                      title: "Avionics Specialist",
                      description: "Focus on aircraft electronic systems",
                      duration: "12-18 months",
                      image: "https://placehold.co/400x300/blue/white?text=Avionics",
                    },
                    {
                      title: "Airframe & Powerplant License",
                      description: "Comprehensive maintenance certification",
                      duration: "24 months",
                      image: "https://placehold.co/400x300/blue/white?text=Airframe",
                    },
                  ].map((program, index) => (
                    <Card key={index} className="overflow-hidden">
                      <div className="relative h-48">
                        <Image
                          src={program.image || "https://placehold.co/400x300/blue/white?text=Program+Name"}
                          alt={program.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardHeader>
                        <CardTitle>{program.title}</CardTitle>
                        <CardDescription>{program.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-blue-600" />
                          <span className="text-sm text-muted-foreground">{program.duration}</span>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full">
                          Learn More
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="management" className="space-y-8">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {[
                    {
                      title: "Aviation Business Administration",
                      description: "Business management focused on aviation industry",
                      duration: "4 years",
                      image: "https://placehold.co/400x300/blue/white?text=Business+Admin",
                    },
                    {
                      title: "Airport Operations",
                      description: "Training for airport management careers",
                      duration: "2 years",
                      image: "https://placehold.co/400x300/blue/white?text=Airport+Ops",
                    },
                    {
                      title: "Air Traffic Management",
                      description: "Preparation for air traffic control careers",
                      duration: "2-3 years",
                      image: "https://placehold.co/400x300/blue/white?text=Air+Traffic",
                    },
                  ].map((program, index) => (
                    <Card key={index} className="overflow-hidden">
                      <div className="relative h-48">
                        <Image
                          src={program.image || "https://placehold.co/400x300/blue/white?text=Program+Name"}
                          alt={program.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardHeader>
                        <CardTitle>{program.title}</CardTitle>
                        <CardDescription>{program.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-blue-600" />
                          <span className="text-sm text-muted-foreground">{program.duration}</span>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full">
                          Learn More
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-center">
              <Link href="#" className="group inline-flex items-center gap-1 text-blue-600 hover:text-blue-800">
                View all programs
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>

        {/* Facilities Section */}
        <section className="bg-gray-50 py-16 md:py-24">
          <div className="container">
            <div className="grid gap-12 lg:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="inline-block rounded-full bg-blue-100 p-2 w-fit">
                  <MapPin className="h-6 w-6 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">State-of-the-Art Facilities</h2>
                <p className="text-muted-foreground">
                  Our campus features modern training facilities and a diverse fleet of aircraft to provide hands-on
                  experience in real-world aviation environments.
                </p>

                <ul className="space-y-2">
                  {[
                    "Fleet of training aircraft including single and multi-engine planes",
                    "Advanced flight simulators with realistic cockpit environments",
                    "Aircraft maintenance hangars with industry-standard equipment",
                    "Air traffic control simulation lab",
                    "Modern classrooms with aviation-specific technology",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-blue-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4">
                  <Button className="bg-blue-600 hover:bg-blue-700">Schedule a Campus Tour</Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative aspect-square overflow-hidden rounded-lg">
                    <Image
                      src="https://placehold.co/400x400/blue/white?text=Simulator"
                      alt="Flight simulator"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative aspect-video overflow-hidden rounded-lg">
                    <Image
                      src="https://placehold.co/400x300/blue/white?text=Classroom"
                      alt="Classroom"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="relative aspect-video overflow-hidden rounded-lg">
                    <Image
                      src="https://placehold.co/400x300/blue/white?text=Hangar"
                      alt="Aircraft hangar"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative aspect-square overflow-hidden rounded-lg">
                    <Image
                      src="https://placehold.co/400x400/blue/white?text=Aircraft"
                      alt="Training aircraft"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Student Success Stories */}
        <section className="bg-white py-16 md:py-24">
          <div className="container space-y-12">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="inline-block rounded-full bg-blue-100 p-2">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Student Success Stories</h2>
              <p className="max-w-[700px] text-muted-foreground">
                Our graduates have gone on to successful careers with major airlines, aviation companies, and
                organizations worldwide.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "Sarah Johnson",
                  role: "Commercial Pilot, Delta Airlines",
                  image: "https://placehold.co/300x300/blue/white?text=Sarah",
                  quote:
                    "The hands-on training and industry connections at Skyward Aviation College prepared me for a seamless transition to my dream job.",
                },
                {
                  name: "Michael Chen",
                  role: "Aircraft Maintenance Engineer, Boeing",
                  image: "https://placehold.co/300x300/blue/white?text=Michael",
                  quote:
                    "The technical knowledge and practical experience I gained gave me a competitive edge in the job market.",
                },
                {
                  name: "Aisha Patel",
                  role: "Airport Operations Manager, JFK International",
                  image: "https://placehold.co/300x300/blue/white?text=Aisha",
                  quote:
                    "The aviation management program provided me with the skills and confidence to excel in airport administration.",
                },
              ].map((testimonial, index) => (
                <Card key={index} className="text-center">
                  <CardHeader className="pb-2">
                    <div className="mx-auto mb-4 overflow-hidden rounded-full">
                      <Image
                        src={testimonial.image || "https://placehold.co/300x300/blue/white?text=Student"}
                        alt={testimonial.name}
                        width={100}
                        height={100}
                        className="mx-auto h-24 w-24 object-cover"
                      />
                    </div>
                    <CardTitle>{testimonial.name}</CardTitle>
                    <CardDescription>{testimonial.role}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">&quot;{testimonial.quote}&quot;</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-center">
              <Link href="#" className="group inline-flex items-center gap-1 text-blue-600 hover:text-blue-800">
                Read more success stories
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-600 py-16 text-white md:py-24">
          <div className="container">
            <div className="flex flex-col items-center space-y-6 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Launch Your Aviation Career?
              </h2>
              <p className="max-w-[700px] text-white/90 md:text-xl">
                Applications are now open for our upcoming semester. Take the first step toward your future in aviation.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  Apply Now
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                  Request Information
                </Button>
              </div>
              <p className="text-sm text-white/80">Application deadline: August 15, 2025</p>
            </div>
          </div>
        </section>

        {/* Accreditation & Partners */}
        <section className="bg-white py-12">
          <div className="container">
            <div className="flex flex-col items-center space-y-8">
              <h3 className="text-xl font-semibold">Accredited By & Industry Partners</h3>
              <div className="flex flex-wrap items-center justify-center gap-8 grayscale opacity-70">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Image
                    key={i}
                    src="https://placehold.co/120x60/gray/white?text=Partner"
                    alt={`Partner logo ${i}`}
                    width={120}
                    height={60}
                    className="h-12 w-auto object-contain"
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-gray-50">
        <div className="container py-12">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2">
                <Plane className="h-6 w-6 text-blue-600" />
                <span className="text-xl font-bold">SkywardAviationCollege</span>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Providing world-class aviation education and training since 1985.
              </p>
              <div className="mt-4 flex gap-4">
                {["twitter", "facebook", "instagram", "linkedin"].map((social) => (
                  <Link key={social} href="#" className="text-muted-foreground hover:text-blue-600">
                    <span className="sr-only">{social}</span>
                    <div className="h-6 w-6 rounded-full border border-muted-foreground flex items-center justify-center">
                      <span className="text-xs">{social[0].toUpperCase()}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">Programs</h4>
              <ul className="space-y-2 text-sm">
                {[
                  "Pilot Training",
                  "Aircraft Maintenance",
                  "Aviation Management",
                  "Air Traffic Control",
                  "Flight Dispatcher",
                ].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-muted-foreground hover:text-blue-600">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">Resources</h4>
              <ul className="space-y-2 text-sm">
                {["Admissions", "Financial Aid", "Career Services", "Student Life", "Alumni Network"].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-muted-foreground hover:text-blue-600">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">Contact</h4>
              <address className="not-italic">
                <p className="text-sm text-muted-foreground">123 Aviation Way</p>
                <p className="text-sm text-muted-foreground">Phoenix, AZ 85001</p>
                <p className="mt-2 text-sm text-muted-foreground">info@skywardaviation.edu</p>
                <p className="text-sm text-muted-foreground">(555) 123-4567</p>
              </address>
            </div>
          </div>

          <div className="mt-12 border-t pt-8 text-center">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} Skyward Aviation College. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
