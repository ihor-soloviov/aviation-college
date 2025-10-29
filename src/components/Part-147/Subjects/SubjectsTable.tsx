import { subjectsData } from "@/lib/part-147/subjects";
import { Badge } from "@/components/ui/badge";

export const SubjectsTable = () => {
  const half = Math.ceil(subjectsData.length / 2);
  const leftColumn = subjectsData.slice(0, half);
  const rightColumn = subjectsData.slice(half);
  return (
    <div className="my-8">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden shadow-md">
          <tbody>
            {leftColumn.map((subject, index) => (
              <tr
                key={subject.id}
                className="hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors bg-white dark:bg-gray-800"
              >
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-3">
                  <strong>
                    <Badge
                      variant="outline"
                      className="font-mono dark:border-gray-500 dark:text-gray-300"
                    >
                      {subject.id}
                    </Badge>
                  </strong>{" "}
                  {subject.name}
                </td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-3">
                  {rightColumn[index] && (
                    <>
                      <strong>
                        <Badge
                          variant="outline"
                          className="font-mono dark:border-gray-500 dark:text-gray-300"
                        >
                          {rightColumn[index].id}
                        </Badge>
                      </strong>{" "}
                      {rightColumn[index].name}
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
