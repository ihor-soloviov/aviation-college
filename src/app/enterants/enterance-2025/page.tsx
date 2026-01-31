"use client";

import "./styles.scss";
import { useState } from "react";
import type * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Folder, FolderOpen, ChevronDownIcon } from 'lucide-react';
import useCardScrollAnimation from "@/hooks/cardScrollAnimation";
import { cn } from "@/lib/utils";
import { BackLink } from "@/components/common/BackLink/BackLink";


export default function DocumentsPage() {
  useCardScrollAnimation();
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);
  const [selectedTitle, setSelectedTitle] = useState<string>("");

  const renderDocumentTree = (items: DocumentItem[], level = 0) => {
    return items.map((item) => {
      const hasChildren = item.children && item.children.length > 0;
      const hasPdf = !!item.pdfUrl;
      const paddingLeft = 12 + level * 16;

      if (hasChildren) {
        return (
          <AccordionItem key={item.id} value={item.id} className="border-none">
            <AccordionTrigger
              className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md py-2 text-left"
              style={{ paddingLeft: `${paddingLeft}px`, paddingRight: '12px' }}
            >
              <div className="flex items-center gap-2 min-w-0">
                <FolderOpen className="h-4 w-4 text-blue-600 flex-shrink-0" />
                <span className="text-sm font-medium truncate">{item.title}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-1 pb-0">
              <Accordion type="multiple" className="space-y-1">
                {renderDocumentTree(item.children!, level + 1)}
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
              setSelectedDocument(item.pdfUrl!);
              setSelectedTitle(item.title);
            }}
            className={`w-full flex items-center gap-2 py-2 rounded-md text-left text-sm transition-colors min-w-0 ${
              selectedDocument === item.pdfUrl
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
            style={{ paddingLeft: `${paddingLeft}px`, paddingRight: '12px' }}
          >
            <FileText
              className={`h-4 w-4 flex-shrink-0 ${
                selectedDocument === item.pdfUrl
                  ? "text-white"
                  : "text-gray-600"
              }`}
            />
            <span className="line-clamp-2 text-sm">{item.title}</span>
          </button>
        );
      }

      return null;
    });
  };

  return (
    <section className="bg-gray-50 dark:bg-blue-900/10 min-h-screen">
      <div className="container mx-auto py-8 px-4">
        <BackLink href="/enterants" />
        <div
          className="grid lg:grid-cols-[380px_1fr] gap-6 animation-card items-start"
          data-id="2"
        >
          {/* Left sidebar: Document tree */}
          <Card className="lg:sticky lg:top-4 max-h-[calc(100vh-8rem)] flex flex-col">
            <CardContent className="p-4 flex flex-col h-full">
              <div className="mb-3 pb-3 border-b flex-shrink-0">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <Folder className="h-5 w-5 text-blue-600" />
                  Документи
                </h2>
              </div>
              <div className="overflow-y-auto flex-1 pr-2">
                <Accordion type="multiple" className="space-y-1">
                  {renderDocumentTree(documents)}
                </Accordion>
              </div>
            </CardContent>
          </Card>

          {/* Right panel: PDF viewer */}
          <Card className="overflow-hidden h-[calc(100vh-8rem)] sticky top-4">
            <CardContent className="p-0 h-full">
              {selectedDocument ? (
                <div className="flex flex-col h-full">
                  {/* Document header */}
                  <div className="bg-blue-600 text-white px-6 py-4 flex items-center gap-3 flex-shrink-0">
                    <FileText className="h-5 w-5 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold line-clamp-2">{selectedTitle}</h3>
                      <p className="text-xs text-blue-100">PDF документ</p>
                    </div>
                  </div>

                  {/* PDF viewer iframe */}
                  <div className="flex-1 bg-gray-100 dark:bg-gray-900 min-h-0">
                    <iframe
                      src={selectedDocument}
                      className="w-full h-full border-none"
                      title={selectedTitle}
                    />
                  </div>
                </div>
              ) : (
                // Empty state
                <div className="flex flex-col items-center justify-center h-full text-center p-8">
                  <div className="rounded-full bg-gray-100 dark:bg-gray-800 p-6 mb-4">
                    <FileText className="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                    Оберіть документ
                  </h3>
                  <p className="text-muted-foreground max-w-sm">
                    Виберіть документ зі списку ліворуч для перегляду його
                    вмісту
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
