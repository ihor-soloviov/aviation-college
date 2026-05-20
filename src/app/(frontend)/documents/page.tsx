import { getPayloadDocuments } from '@/lib/documents'
import { DocumentsList } from '@/components/documents/DocumentsList'

export const dynamic = 'force-dynamic'

export const metadata = {
    title: 'Документи — Авіаційний коледж',
}

export default async function DocumentsPage() {
    const documents = await getPayloadDocuments()

    return (
        <div className="container mx-auto py-8 md:py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-2">
                    Документи
                </h1>
                <p className="text-muted-foreground mb-8">
                    Положення, накази, програми та інші офіційні документи коледжу.
                </p>
                <DocumentsList documents={documents} />
            </div>
        </div>
    )
}
