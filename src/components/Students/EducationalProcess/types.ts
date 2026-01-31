export type SemesterDocument = {
  name: string;
  pdfUrl: string;
};

export type AcademicYearData = {
  year: string;
  semesters: {
    title: string;
    type: "odd" | "even" | "full";
    documents: SemesterDocument[];
  }[];
};

export type StudyFormData = {
  id: string;
  title: string;
  studyForm: "Денна" | "Заочна";
  academicYears: AcademicYearData[];
};
