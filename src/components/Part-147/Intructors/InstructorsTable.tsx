import { instructorsData, instructorsHeaders } from "@/lib/part-147/instructors";
export const InstructorsTable = () => {
  return (
    <div className="my-8">
      <div className="overflow-x-auto">
        <table className="w-full bg-gray-100 dark:bg-gray-800 border-collapse border border-gray-300">
          <thead>
            <tr>
              {instructorsHeaders.map((header) => (
                <th
                  key={header.id}
                  className="border border-gray-300 px-4 py-3 text-left font-semibold"
                >
                  {header.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {instructorsData.map((item, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-3 font-medium align-top">
                  {index + 1}
                </td>
                <td className="border border-gray-300 px-4 py-3">
                  {item.name}
                </td>
                <td className="border border-gray-300">
                  {item.positions.map((position, index) => (
                    <p
                      key={position + index}
                      className={`px-4 py-3 ${
                        index == item.competencies.length - 1
                          ? ""
                          : "border-b border-gray-300"
                      }`}
                    >
                      {position}
                    </p>
                  ))}
                </td>
                <td className="border border-gray-300">
                  {item.competencies.map((competency, index) => (
                    <p
                      key={competency + index}
                      className={`px-4 py-3 ${
                        index == item.competencies.length - 1
                          ? ""
                          : "border-b border-gray-300"
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
