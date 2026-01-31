import Image from "next/image";

const staffData = [
  {
    src: "/staff/part-147/andrus.jpeg",
    description:
      "Відповідальний керівник Організації PART-147, начальник коледжу, доктор технічних наук, професор",
    name: "Анатолій Олександрович АНДРУСЕВИЧ",
  },
  {
    src: "/staff/part-147/vlas.jpeg",
    description:
      "Керівник з якості Організації PART-147, заступник начальника коледжу з навчально-наукової роботи, викладач вищої категорії",
    name: "Дмитро Петрович ВЛАСЕНКОВ",
  },
  {
    src: "/staff/part-147/sytnyk.jpeg",
    description:
      "Керівник з теоретичної підготовки Організації PART-147, завідувач відділення «Експлуатація та ремонт авіатехніки», викладач вищої категорії",
    name: "Сергій Олександрович СИТНИК",
  },
  {
    src: "/staff/part-147/baharev.jpeg",
    description:
      "Керівник з практичної підготовки Організації PART-147, завідувач навчальної (виробничої) практики коледжу, викладач вищої категорії",
    name: "Андрій Олександрович БАХАРЄВ",
  },
  {
    src: "/staff/part-147/kyslenko.jpeg",
    description: "Керівник з проведення екзаменів Організації PART-147",
    name: "Володимир Анатолійович КИСЛЕНКО",
  },
];

export const StaffTable = () => {
  return (
    <div className="my-8">
      <div className="overflow-x-auto">
        <table className="w-full bg-gray-100 dark:bg-gray-800 border-collapse border border-gray-300">
          <tbody>
            {staffData.map((item, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-3 font-medium align-top">
                  <Image
                    src={item.src}
                    alt={item.name}
                    className="object-cover"
                    width={96}
                    height={96}
                  />
                </td>
                <td className="border border-gray-300 px-4 py-3">
                  <p className="font-bold">{item.name}</p>
                  <p className="text-sm">{item.description}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
