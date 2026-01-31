export type ScheduleGroup = {
  name: string;
  pdfUrl: string;
};

export type ScheduleSession = {
  title: string;
  groups: ScheduleGroup[];
};

export type SchedulePeriod = {
  id: string;
  title: string;
  academicYear: string;
  studyForm: "Денна" | "Заочна";
  sessions: ScheduleSession[];
};
