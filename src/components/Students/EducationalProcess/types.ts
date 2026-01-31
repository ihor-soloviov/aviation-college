export type ScheduleItem = {
  id: string;
  year: string;
  semester: string | null; // null для повного року
  type: "odd" | "even" | "full";
  pdfUrl: string;
};

export type StudyFormData = {
  id: string;
  title: string;
  studyForm: "Денна" | "Заочна";
  items: ScheduleItem[];
};
