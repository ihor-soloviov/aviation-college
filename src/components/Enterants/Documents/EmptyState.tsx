"use client";

import { FileText } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
      <div className="rounded-full bg-gray-100 dark:bg-gray-800 p-6 mb-4">
        <FileText className="h-12 w-12 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
        Оберіть документ
      </h3>
      <p className="text-muted-foreground max-w-sm">
        Виберіть документ зі списку ліворуч для перегляду його вмісту
      </p>
    </div>
  );
}

