import { Button } from '@/components/ui/button'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, GraduationCap } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from 'next/image'
import Link from 'next/link'
import { Calendar } from 'lucide-react'

const Courses = () => {
    return (
        <section className="bg-background py-16 md:py-24">
            <div className="container space-y-12 mx-auto" >
                <div className="flex flex-col items-center space-y-4 text-center">
                    <div className="inline-block rounded-full bg-blue-100 p-2">
                        <GraduationCap className="h-6 w-6 text-blue-600" />
                    </div>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Навчальні програми</h2>
                    <p className="max-w-[700px] text-muted-foreground">
                        Комплексні навчальні програми, розроблені для підготовки до успішної кар'єри в авіації.
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
                                        <Button variant="outline" className="w-full cursor-pointer">
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
                                        <Button variant="outline" className="w-full cursor-pointer">
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
                                        <Button variant="outline" className="w-full cursor-pointer">
                                            Learn More
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>

                <div className="flex justify-center">
                    <Link href="/courses#all" className="group inline-flex items-center gap-1 text-blue-600 hover:text-blue-800">
                        View all programs
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default Courses
