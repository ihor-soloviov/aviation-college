import { Metadata } from "next";
import { ElectiveCoursesPage } from "@/components/Students/ElectiveCourses";

export const metadata: Metadata = {
  title: "Каталог дисциплін за вибором | Криворізький фаховий коледж НАУ",
  description:
    "Каталог вибіркових навчальних дисциплін для здобувачів освіти Криворізького фахового коледжу НАУ",
  keywords: [
    "вибіркові дисципліни",
    "каталог дисциплін",
    "навчальний план",
    "криворізький коледж",
  ],
};

export default function ElectiveCoursesRoute() {
  return <ElectiveCoursesPage />;
}
