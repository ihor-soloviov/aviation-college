import { Metadata } from "next";
import { PracticalTrainingPage } from "@/components/Students/PracticalTraining";

export const metadata: Metadata = {
  title: "Практичне навчання | Криворізький фаховий коледж НАУ",
  description:
    "Бази практичного навчання, положення про проведення практики та інформація для здобувачів освіти Криворізького фахового коледжу НАУ",
  keywords: [
    "практика",
    "практичне навчання",
    "бази практики",
    "виробнича практика",
    "навчальна практика",
    "криворізький коледж",
  ],
};

export default function PracticalTrainingRoute() {
  return <PracticalTrainingPage />;
}
