export type ConsultationItem = {
  id: string;
  year: string;
  semester?: string;
  pdfUrl: string;
};

export type AcademicYearData = {
  id: string;
  year: string;
  items: ConsultationItem[];
};
