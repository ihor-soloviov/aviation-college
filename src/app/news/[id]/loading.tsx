export default function Loading() {
    return (
        <main className="flex-1 bg-background dark:bg-blue-900/10">
            <section className="py-8">
                <div className="container max-w-4xl mx-auto">
                    <div className="space-y-6 animate-pulse">
                        <div className="space-y-4">
                            <div className="h-6 w-24 rounded bg-muted" />
                            <div className="space-y-3">
                                <div className="h-10 w-3/4 rounded bg-muted" />
                                <div className="h-10 w-1/2 rounded bg-muted" />
                            </div>
                            <div className="h-4 w-32 rounded bg-muted" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-12 dark:bg-blue-900/10">
                <div className="container max-w-4xl mx-auto">
                    <div className="space-y-4 animate-pulse">
                        <div className="h-4 w-full rounded bg-muted" />
                        <div className="h-4 w-full rounded bg-muted" />
                        <div className="h-4 w-5/6 rounded bg-muted" />
                        <div className="h-4 w-full rounded bg-muted" />
                        <div className="h-4 w-4/6 rounded bg-muted" />
                        <div className="h-48 w-full rounded bg-muted mt-6" />
                        <div className="h-4 w-full rounded bg-muted" />
                        <div className="h-4 w-3/4 rounded bg-muted" />
                    </div>
                </div>
            </section>
        </main>
    )
}
