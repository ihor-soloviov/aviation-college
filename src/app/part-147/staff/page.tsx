import { instructorsData, tableHeaders } from "@/lib/instructors";
import { Users } from "lucide-react";
import React from "react";

export default function StaffPage() {
  return (
    <section className="bg-gray-50 dark:bg-blue-900/10 py-16 md:py-24">
      <div className="container space-y-12 mx-auto max-w-[1000px]">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <div className="inline-block rounded-full bg-blue-100 p-3">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight">
              ІНСТРУКТОРИ, ЕКЗАМЕНАТОРИ ТА ЕКСПЕРТИ З ОЦІНЮВАННЯ ПРАКТИЧНИХ
              НАВИЧОК
            </h2>
          </div>
          <div className="my-8">
            <div className="overflow-x-auto">
              <table className="w-full bg-gray-100 dark:bg-gray-800 border-collapse border border-gray-300">
                <thead>
                  <tr>
                    {tableHeaders.map((header) => (
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
        </div>
      </div>
    </section>
  );
}
