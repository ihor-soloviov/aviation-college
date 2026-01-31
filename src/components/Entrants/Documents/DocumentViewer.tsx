"use client";

import { FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/entrants/Documents";

interface DocumentViewerProps {
  pdfUrl: string | null;
  title: string;
}

export function DocumentViewer({ pdfUrl, title }: DocumentViewerProps) {
  return (
    <Card className="overflow-hidden h-[calc(100vh-8rem)] sticky top-4">
      <CardContent className="p-0 h-full">
        {pdfUrl ? (
          <div className="flex flex-col h-full">
            {/* Document header */}
            <div className="bg-blue-900 text-white px-6 py-4 flex items-center gap-3 flex-shrink-0">
              <FileText className="h-5 w-5 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold line-clamp-2 break-words">
                  {title}
                </h3>
                <p className="text-xs text-blue-100">PDF документ</p>
              </div>
            </div>

            {/* PDF viewer iframe */}
            <div className="flex-1 bg-gray-100 dark:bg-gray-900 min-h-0">
              <iframe
                src={pdfUrl}
                className="w-full h-full border-none"
                title={title}
              />
            </div>
          </div>
        ) : (
          <EmptyState />
        )}
      </CardContent>
    </Card>
  );
}
