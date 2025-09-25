import { subjectsData } from "@/lib/part-147/subjects";

export const SubjectsTable = () => {
  const half = Math.ceil(subjectsData.length / 2);
  const leftColumn = subjectsData.slice(0, half);
  const rightColumn = subjectsData.slice(half);
  return (
    <div className="my-8">
      <div className="overflow-x-auto">
        <table className="w-full bg-gray-100 dark:bg-gray-800 border-collapse border border-gray-300">
          <tbody>
            {leftColumn.map((subject, index) => (
              <tr key={subject.id}>
                <td className="border border-gray-300 px-4 py-3 font-medium align-top">
                  <strong>{subject.id}</strong> {subject.name}
                </td>
                <td className="border border-gray-300 px-4 py-3 font-medium align-top">
                  {rightColumn[index] && (
                    <>
                      <strong>{rightColumn[index].id}</strong>{" "}
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
