import { notFound } from "next/navigation";
import "./styles.scss";
import { BackLink } from "@/components/common/BackLink/BackLink";
import { EntranceDocsClient } from "@/components/Entrants/Documents/EntranceDocsClient";
import { getDocumentTreeBySlug } from "@/lib/document-trees";
import { isUnavailable } from "@/lib/data-result";
import { DataUnavailable } from "@/components/common/DataUnavailable/DataUnavailable";

export const dynamic = "force-dynamic";

export default async function DocumentsPage() {
    const tree = await getDocumentTreeBySlug("entrance-2025");
    if (isUnavailable(tree)) return <DataUnavailable />;
    if (!tree) notFound();

    return (
        <section className="bg-gray-50 dark:bg-blue-900/10 min-h-screen">
            <div className="container mx-auto py-8 px-4">
                <BackLink href="/entrants" />
                <EntranceDocsClient items={tree.items} />
            </div>
        </section>
    );
}
