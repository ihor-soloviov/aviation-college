"use client";

import { useState } from "react";
import useCardScrollAnimation from "@/hooks/cardScrollAnimation";
import { DocumentSidebar } from "./DocumentSidebar";
import { DocumentViewer } from "./DocumentViewer";
import type { TreeNode } from "@/lib/document-trees";

interface Props {
    items: TreeNode[];
}

export function EntranceDocsClient({ items }: Props) {
    useCardScrollAnimation();
    const [selectedDocument, setSelectedDocument] = useState<string | null>(null);
    const [selectedTitle, setSelectedTitle] = useState<string>("");

    const handleDocumentSelect = (fileUrl: string, title: string) => {
        setSelectedDocument(fileUrl);
        setSelectedTitle(title);
    };

    return (
        <div
            className="grid lg:grid-cols-[380px_1fr] gap-6 animation-card"
            data-id="2"
        >
            <DocumentSidebar
                documents={items}
                selectedDocument={selectedDocument}
                onDocumentSelect={handleDocumentSelect}
            />
            <DocumentViewer pdfUrl={selectedDocument} title={selectedTitle} />
        </div>
    );
}
