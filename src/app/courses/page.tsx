import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    Plane,
    Wrench,
    Radio,
    Users,
    MapPin,
    Headphones,
    Shield,
    Zap,
    RotateCcw,
    GraduationCap,
    Clock,
    DollarSign,
} from "lucide-react"
import Hero from "@/components/common/Hero/Hero"

const programs = [
    {
        id: "commercial-pilot",
        title: "Commercial Pilot License",
        description: "Comprehensive training for aspiring commercial airline pilots",
        duration: "18-24 months",
        tuition: "$89,500",
        icon: Plane,
        category: "Pilot Training",
        level: "Advanced",
        popular: true,
    },
    {
        id: "private-pilot",
        title: "Private Pilot License",
        description: "Foundation training for recreational and private flying",
        duration: "6-12 months",
        tuition: "$12,500",
        icon: Plane,
        category: "Pilot Training",
        level: "Beginner",
        popular: false,
    },
    {
        id: "instrument-rating",
        title: "Instrument Rating",
        description: "Advanced training for flying in various weather conditions",
        duration: "4-6 months",
        tuition: "$15,000",
        icon: Plane,
        category: "Pilot Training",
        level: "Intermediate",
        popular: true,
    },
    {
        id: "flight-instructor",
        title: "Flight Instructor Certification",
        description: "Prepare to train the next generation of pilots",
        duration: "3-4 months",
        tuition: "$8,500",
        icon: GraduationCap,
        category: "Pilot Training",
        level: "Advanced",
        popular: false,
    },
    {
        id: "helicopter-pilot",
        title: "Helicopter Pilot License",
        description: "Specialized training for rotorcraft operations",
        duration: "12-18 months",
        tuition: "$75,000",
        icon: RotateCcw,
        category: "Pilot Training",
        level: "Advanced",
        popular: false,
    },
    {
        id: "aircraft-maintenance",
        title: "Aircraft Maintenance Technician",
        description: "FAA-certified training for aircraft maintenance and repair",
        duration: "18-24 months",
        tuition: "$45,000",
        icon: Wrench,
        category: "Maintenance",
        level: "Intermediate",
        popular: true,
    },
    {
        id: "avionics-specialist",
        title: "Avionics Specialist",
        description: "Focus on aircraft electronic systems and navigation",
        duration: "12-18 months",
        tuition: "$38,000",
        icon: Radio,
        category: "Maintenance",
        level: "Advanced",
        popular: false,
    },
    {
        id: "airframe-powerplant",
        title: "Airframe & Powerplant License",
        description: "Comprehensive maintenance certification for all aircraft systems",
        duration: "24 months",
        tuition: "$52,000",
        icon: Wrench,
        category: "Maintenance",
        level: "Advanced",
        popular: true,
    },
    {
        id: "aviation-management",
        title: "Aviation Business Administration",
        description: "Business management focused on aviation industry operations",
        duration: "4 years",
        tuition: "$65,000",
        icon: Users,
        category: "Management",
        level: "Bachelor's",
        popular: false,
    },
    {
        id: "airport-operations",
        title: "Airport Operations Management",
        description: "Training for airport management and ground operations",
        duration: "2 years",
        tuition: "$35,000",
        icon: MapPin,
        category: "Management",
        level: "Associate",
        popular: false,
    },
    {
        id: "air-traffic-control",
        title: "Air Traffic Control",
        description: "Preparation for air traffic control tower operations",
        duration: "2-3 years",
        tuition: "$42,000",
        icon: Headphones,
        category: "Operations",
        level: "Associate",
        popular: true,
    },
    {
        id: "flight-dispatcher",
        title: "Flight Dispatcher Certification",
        description: "Training for airline flight planning and dispatch operations",
        duration: "6-8 months",
        tuition: "$18,000",
        icon: MapPin,
        category: "Operations",
        level: "Certificate",
        popular: false,
    },
    {
        id: "aviation-safety",
        title: "Aviation Safety Management",
        description: "Specialized training in aviation safety protocols and management",
        duration: "18 months",
        tuition: "$28,000",
        icon: Shield,
        category: "Safety",
        level: "Certificate",
        popular: false,
    },
    {
        id: "drone-operations",
        title: "Drone/UAV Operations",
        description: "Commercial drone pilot training and certification",
        duration: "3-6 months",
        tuition: "$5,500",
        icon: Zap,
        category: "Emerging Tech",
        level: "Certificate",
        popular: true,
    },
]

const categories = ["All", "Pilot Training", "Maintenance", "Management", "Operations", "Safety", "Emerging Tech"]

export default function CoursesPage() {
    return (
        <main className="flex-1">
            <Hero imgPath="/hero-courses.webp" />
            <section className="bg-white py-16 md:py-24" id="all">
                <div className="container space-y-12 mx-auto">
                    {/* Filter Tabs */}
                    <div className="flex flex-wrap justify-center gap-2">
                        {categories.map((category) => (
                            <Button
                                key={category}
                                variant={category === "All" ? "default" : "outline"}
                                size="sm"
                                className={category === "All" ? "bg-blue-600 hover:bg-blue-700" : ""}
                            >
                                {category}
                            </Button>
                        ))}
                    </div>

                    {/* Programs Grid */}
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {programs.map((program) => {
                            const IconComponent = program.icon
                            return (
                                <Card
                                    key={program.id}
                                    className="group relative overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1"
                                >
                                    {program.popular && (
                                        <div className="absolute right-3 top-3 z-10">
                                            <Badge className="bg-orange-500 hover:bg-orange-500">Popular</Badge>
                                        </div>
                                    )}

                                    <CardHeader className="pb-4">
                                        <div className="flex items-start justify-between">
                                            <div className="rounded-full bg-blue-100 p-3 group-hover:bg-blue-200 transition-colors">
                                                <IconComponent className="h-6 w-6 text-blue-600" />
                                            </div>
                                            <Badge variant="outline" className="text-xs">
                                                {program.category}
                                            </Badge>
                                        </div>
                                        <CardTitle className="text-lg leading-tight">{program.title}</CardTitle>
                                        <CardDescription className="text-sm line-clamp-2">{program.description}</CardDescription>
                                    </CardHeader>

                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between text-sm">
                                                <div className="flex items-center gap-1 text-muted-foreground">
                                                    <Clock className="h-4 w-4" />
                                                    <span>Duration</span>
                                                </div>
                                                <span className="font-medium">{program.duration}</span>
                                            </div>

                                            <div className="flex items-center justify-between text-sm">
                                                <div className="flex items-center gap-1 text-muted-foreground">
                                                    <DollarSign className="h-4 w-4" />
                                                    <span>Tuition</span>
                                                </div>
                                                <span className="font-medium">{program.tuition}</span>
                                            </div>

                                            <div className="flex items-center justify-between text-sm">
                                                <div className="flex items-center gap-1 text-muted-foreground">
                                                    <GraduationCap className="h-4 w-4" />
                                                    <span>Level</span>
                                                </div>
                                                <span className="font-medium">{program.level}</span>
                                            </div>
                                        </div>

                                        <div className="flex gap-2 pt-2">
                                            <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                                                Learn More
                                            </Button>
                                            <Button size="sm" variant="outline" className="flex-1">
                                                Apply
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>

                    {/* Bottom CTA */}
                    <div className="flex flex-col items-center space-y-6 rounded-lg bg-gray-50 p-8 text-center">
                        <h3 className="text-2xl font-bold">Can't Find What You're Looking For?</h3>
                        <p className="max-w-[600px] text-muted-foreground">
                            Our admissions counselors are here to help you find the perfect program for your aviation career goals.
                        </p>
                        <div className="flex flex-col gap-4 sm:flex-row">
                            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                                Speak with a Counselor
                            </Button>
                            <Button size="lg" variant="outline">
                                Download Program Guide
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Stats */}
            <section className="bg-blue-600 py-12 text-white">
                <div className="container mx-auto">
                    <div className="grid gap-8 md:grid-cols-4">
                        <div className="text-center">
                            <div className="text-3xl font-bold">14</div>
                            <div className="text-sm text-white/80">Programs Available</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold">95%</div>
                            <div className="text-sm text-white/80">Job Placement Rate</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold">1,200+</div>
                            <div className="text-sm text-white/80">Graduates Annually</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold">40+</div>
                            <div className="text-sm text-white/80">Years of Excellence</div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
