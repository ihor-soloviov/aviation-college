export type ScheduleGroup = {
  name: string;
  pdfUrl: string;
};

export type ScheduleSession = {
  title: string;
  groups: ScheduleGroup[];
};

export type AcademicYear = {
  year: string;
  sessions: ScheduleSession[];
};

export type SchedulePeriod = {
  id: string;
  title: string;
  studyForm: "Денна" | "Заочна";
  academicYears: AcademicYear[];
};
