"use client";

import { Folder } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion } from "@/components/ui/accordion";
import { DocumentTree } from "./DocumentTree";
import type { DocumentItem } from "@/lib/entrants/entrance-2025-documents";

interface DocumentSidebarProps {
  documents: DocumentItem[];
  selectedDocument: string | null;
  onDocumentSelect: (pdfUrl: string, title: string) => void;
}

export function DocumentSidebar({
  documents,
  selectedDocument,
  onDocumentSelect,
}: DocumentSidebarProps) {
  return (
    <Card className="h-fit lg:sticky lg:top-4 max-h-[calc(100vh-8rem)] flex flex-col">
      <CardContent className="p-4 flex flex-col min-h-0">
        <div className="mb-3 pb-3 border-b flex-shrink-0">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Folder className="h-5 w-5 text-blue-600" />
            Документи
          </h2>
        </div>
        <div className="overflow-y-auto flex-1 pr-2 custom-scrollbar">
          <Accordion type="multiple" className="space-y-1">
            <DocumentTree
              items={documents}
              selectedDocument={selectedDocument}
              onDocumentSelect={onDocumentSelect}
            />
          </Accordion>
        </div>
      </CardContent>
    </Card>
  );
}
