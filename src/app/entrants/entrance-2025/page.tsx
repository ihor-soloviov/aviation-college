"use client";

import "./styles.scss";
import { useState } from "react";
import useCardScrollAnimation from "@/hooks/cardScrollAnimation";
import { BackLink } from "@/components/common/BackLink/BackLink";
import { DocumentSidebar } from "@/components/Entrants/Documents/DocumentSidebar";
import { DocumentViewer } from "@/components/Entrants/Documents/DocumentViewer";
import { documents } from "@/lib/entrants/entrance-2025-documents";

export default function DocumentsPage() {
  useCardScrollAnimation();
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);
  const [selectedTitle, setSelectedTitle] = useState<string>("");

  const handleDocumentSelect = (pdfUrl: string, title: string) => {
    setSelectedDocument(pdfUrl);
    setSelectedTitle(title);
  };

  return (
    <section className="bg-gray-50 dark:bg-blue-900/10 min-h-screen">
      <div className="container mx-auto py-8 px-4">
        <BackLink href="/entrants" />
        <div
          className="grid lg:grid-cols-[380px_1fr] gap-6 animation-card"
          data-id="2"
        >
          <DocumentSidebar
            documents={documents}
            selectedDocument={selectedDocument}
            onDocumentSelect={handleDocumentSelect}
          />
          <DocumentViewer pdfUrl={selectedDocument} title={selectedTitle} />
        </div>
      </div>
    </section>
  );
}
