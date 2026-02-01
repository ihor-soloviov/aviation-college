export type ContractType = "year" | "contract" | "budget";

export type ContractItem = {
  id: string;
  title: string;
  description: string;
  pdfUrl: string;
  type: ContractType;
  highlight?: boolean;
};

export const contractsData: ContractItem[] = [
  {
    id: "contracts-2025-2026",
    title: "Договори 2025-2026 навчальний рік",
    description: "Актуальні договори на поточний навчальний рік для всіх форм навчання",
    pdfUrl: "http://kk.nau.edu.ua/uploads/files/files/%D0%94%D0%BE%D0%B3%D0%BE%D0%B2%D0%BE%D1%80%D0%B8%202025-2026.pdf",
    type: "year",
    highlight: true,
  },
  {
    id: "contract-paid",
    title: "Договір про надання платної освітньої послуги (КОНТРАКТ)",
    description: "Договір для здобувачів освіти, які навчаються на контрактній основі",
    pdfUrl: "http://kk.nau.edu.ua/uploads/files/files/%D0%94%D0%BE%D0%B3%D0%BE%D0%B2%D1%96%D1%80%20%D0%BF%D1%80%D0%BE%20%D0%BD%D0%B0%D0%B4%D0%B0%D0%BD%D0%BD%D1%8F%20%D0%BF%D0%BB%D0%B0%D1%82%D0%BD%D0%BE%D1%97%20%D0%BE%D1%81%D0%B2%D1%96%D1%82%D0%BD%D1%8C%D0%BE%D1%97%20%D0%BF%D0%BE%D1%81%D0%BB%D1%83%D0%B3%D0%B8%20%D0%B4%D0%BB%D1%8F%20%D0%BF%D1%96%D0%B4%D0%B3%D0%BE%D1%82%D0%BE%D0%B2%D0%BA%D0%B8%20%D1%84%D0%B0%D1%85%D1%96%D0%B2%D1%86%D1%96%D0%B2%20%28%D0%9A%D0%9E%D0%9D%D0%A2%D0%A0%D0%90%D0%9A%D0%A2%29.pdf",
    type: "contract",
  },
  {
    id: "contract-budget",
    title: "Договір про надання освітніх послуг (БЮДЖЕТ)",
    description: "Договір для здобувачів освіти, які навчаються за державним замовленням",
    pdfUrl: "http://kk.nau.edu.ua/uploads/files/files/%D0%94%D0%BE%D0%B3%D0%BE%D0%B2%D1%96%D1%80%20%D0%BF%D1%80%D0%BE%20%D0%BD%D0%B0%D0%B4%D0%B0%D0%BD%D0%BD%D1%8F%20%D0%BE%D1%81%D0%B2%D1%96%D1%82%D0%BD%D1%96%D1%85%20%D0%BF%D0%BE%D1%81%D0%BB%D1%83%D0%B3%20%D0%B7%D0%B0%D0%BA%D0%BB%D0%B0%D0%B4%D0%BE%D0%BC%20%D1%84%D0%B0%D1%85%D0%BE%D0%B2%D0%BE%D1%97%20%D0%BF%D0%B5%D1%80%D0%B5%D0%B4%D0%B2%D0%B8%D1%89%D0%BE%D1%97%20%D0%BE%D1%81%D0%B2%D1%96%D1%82%D0%B8%20%28%D0%91%D0%AE%D0%94%D0%96%D0%95%D0%A2%29.pdf",
    type: "budget",
  },
];
