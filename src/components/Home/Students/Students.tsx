import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, Users } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

const Students = () => {
    return (
        <section className="bg-background py-16 md:py-24">
            <div className="container space-y-12 mx-auto">
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
    )
}

export default Students
