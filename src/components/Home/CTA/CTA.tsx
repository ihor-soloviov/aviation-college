import { Button } from '@/components/ui/button'
import React from 'react'

const CTA = () => {
    return (
        <section className="bg-blue-600 dark:bg-blue-900 py-16 text-white md:py-24">
            <div className="container mx-auto">
                <div className="flex flex-col items-center space-y-6 text-center">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                        Ready to Launch Your Aviation Career?
                    </h2>
                    <p className="max-w-[700px] text-white/90 md:text-xl">
                        Applications are now open for our upcoming semester. Take the first step toward your future in aviation.
                    </p>
                    <div className="flex flex-col gap-4 sm:flex-row">
                        <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 cursor-pointer">
                            Apply Now
                        </Button>
                        <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 cursor-pointer">
                            Request Information
                        </Button>
                    </div>
                    <p className="text-sm text-white/80">Application deadline: August 15, 2025</p>
                </div>
            </div>
        </section>
    )
}

export default CTA