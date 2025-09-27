import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { subjectsNotes } from "@/lib/part-147/subjects";

export const Note = () => {
  return (
    <Card className="bg-blue-100 dark:bg-blue-900/50">
      <CardHeader>
        <strong>Примітка</strong>
      </CardHeader>
      <CardContent>
        <p className="mb-4 font-medium">
          У таблиці під записом «B1» без цифрових індексів мається на увазі усі
          можливі підвиди доступні, згідно ліцензії організації PART-147
          (В1.1,1.3).
        </p>
        <p className="mb-4 font-medium">
          Аналогічно для запису «B2» (В2). Інструктори з теоретичної підготовки
          з модулів які мають практичну частину є одночасно і інструкторами з
          практичної підготовки.
        </p>
        <ul className="list-disc list-inside">
          {subjectsNotes.map(({ title }) => (
            <li className="mb-2 last:mb-0" key={title}>
              {title}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
