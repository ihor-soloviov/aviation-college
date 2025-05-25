import { Button } from '@/components/ui/button'
import { CheckCircle2, MapPin } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const Benefits = () => {
    return (
        <section className="bg-gray-50 py-16 md:py-24">
            <div className="container mx-auto">
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
                            <Button className="bg-blue-600 hover:bg-blue-700 cursor-pointer">Schedule a Campus Tour</Button>
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
    )
}

export default Benefits
