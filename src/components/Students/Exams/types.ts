export type ExamItem = {
  id: string;
  title: string;
  pdfUrl: string;
};

export type AcademicYearData = {
  id: string;
  year: string;
  items: ExamItem[];
};
