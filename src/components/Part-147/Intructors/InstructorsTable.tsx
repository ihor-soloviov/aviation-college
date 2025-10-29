import {
  instructorsData,
  instructorsHeaders,
} from "@/lib/part-147/instructors";
export const InstructorsTable = () => {
  return (
    <div className="my-8">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden shadow-md">
          <thead>
            <tr className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800">
              {instructorsHeaders.map((header) => (
                <th
                  key={header.id}
                  className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left text-white font-semibold"
                >
                  {header.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {instructorsData.map((item, index) => (
              <tr key={index} className="hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors bg-white dark:bg-gray-800">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-3">
                  {index + 1}
                </td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-3">
                  {item.name}
                </td>
                <td className="border border-gray-300 dark:border-gray-600">
                  {item.positions.map((position, index) => (
                    <p
                      key={position + index}
                      className={`px-4 py-3 ${
                        index == item.competencies.length - 1
                          ? ""
                          : "border-b border-gray-300 dark:border-gray-600"
                      }`}
                    >
                      {position}
                    </p>
                  ))}
                </td>
                <td className="border border-gray-300 dark:border-gray-600">
                  {item.competencies.map((competency, index) => (
                    <p
                      key={competency + index}
                      className={`px-4 py-3 ${
                        index == item.competencies.length - 1
                          ? ""
                          : "border-b border-gray-300 dark:border-gray-600"
                      }`}
                    >
                      {competency}
                    </p>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
