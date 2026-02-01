import { ReactNode } from "react";

export type DocumentItem = {
  id: string;
  title: string;
  subtitle?: string;
  pdfUrl: string;
};

export type ExpandableSection = {
  id: string;
  title: string;
  badge?: string;
  icon?: ReactNode;
  items: DocumentItem[];
  isEmpty?: boolean;
};
