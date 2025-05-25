import Image from 'next/image'
import React from 'react'

const Partners = () => {
    return (
        <section className="bg-white py-12">
            <div className="container mx-auto">
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
    )
}

export default Partners
