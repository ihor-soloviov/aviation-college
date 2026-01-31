"use client";

import { FileText, FolderOpen } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import type { DocumentItem } from "@/lib/enterants/entrance-2025-documents";

interface DocumentTreeProps {
  items: DocumentItem[];
  level?: number;
  selectedDocument: string | null;
  onDocumentSelect: (pdfUrl: string, title: string) => void;
}

export function DocumentTree({
  items,
  level = 0,
  selectedDocument,
  onDocumentSelect,
}: DocumentTreeProps) {
  return (
    <>
      {items.map((item) => {
        const hasChildren = item.children && item.children.length > 0;
        const hasPdf = !!item.pdfUrl;
        const paddingLeft = level * 16 + 12;

        if (hasChildren) {
          return (
            <AccordionItem key={item.id} value={item.id} className="border-none">
              <AccordionTrigger
                className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md px-3 py-2 text-left"
                style={{ paddingLeft: `${paddingLeft}px` }}
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <FolderOpen className="h-4 w-4 text-blue-600 flex-shrink-0" />
                  <span className="text-sm font-medium line-clamp-2 break-words">
                    {item.title}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-1">
                <Accordion type="multiple" className="space-y-1">
                  <DocumentTree
                    items={item.children!}
                    level={level + 1}
                    selectedDocument={selectedDocument}
                    onDocumentSelect={onDocumentSelect}
                  />
                </Accordion>
              </AccordionContent>
            </AccordionItem>
          );
        }

        if (hasPdf) {
          return (
            <button
              key={item.id}
              onClick={() => {
                onDocumentSelect(item.pdfUrl!, item.title);
              }}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-left text-sm transition-colors min-w-0 ${
                selectedDocument === item.pdfUrl
                  ? "bg-blue-900 text-white"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
              style={{ paddingLeft: `${paddingLeft}px` }}
            >
              <FileText
                className={`h-4 w-4 flex-shrink-0 ${
                  selectedDocument === item.pdfUrl
                    ? "text-white"
                    : "text-gray-600 dark:text-gray-400"
                }`}
              />
              <span className="line-clamp-2 break-words flex-1">
                {item.title}
              </span>
            </button>
          );
        }

        return null;
      })}
    </>
  );
}

