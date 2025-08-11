'use client';

const employees = [
  {
    name: "Mark J. Freeman",
    role: "Developer",
    hourRate: "$80/hour",
    skills: "HTML",
    status: "Available",
  },
  {
    name: "Nina R. Oldman",
    role: "Designer",
    hourRate: "$70/hour",
    skills: "JavaScript",
    status: "On Holiday",
  },
  {
    name: "Arya H. Shah",
    role: "Developer",
    hourRate: "$40/hour",
    skills: "React",
    status: "Absent",
  },
  {
    name: "June R. Smith",
    role: "Designer",
    hourRate: "$20/hour",
    skills: "Vuejs",
    status: "On Leave",
  },
  {
    name: "Mark J. Freeman",
    role: "Developer",
    hourRate: "$65/hour",
    skills: "Angular",
    status: "Available",
  },
];

export default function TopEmployees() {
  return (
    <section className="bg-[#f3f8ff]  w-[96%] md:w-[90%] max-w-[1600px] mx-auto py-4 px-2 md:px-2">
      <div className=" mx-auto space-y-2">
        {employees.map((emp, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row justify-between items-start md:items-center"
          >
            <div className="flex flex-col md:flex-row md:items-center md:gap-16 w-full space-y-2 md:space-y-0">
              <div className="font-semibold text-lg text-gray-800">{emp.name}</div>
              <div className="text-gray-500">{emp.role}</div>
              <div className="text-gray-600">{emp.hourRate}</div>
              <div className="text-blue-500 font-medium">{emp.skills}</div>
            </div>

            <div className="mt-4 md:mt-0">
              <span
                className={`inline-block px-4 py-1 text-sm rounded-full font-medium w-30 ${
                  emp.status === "Available"
                    ? "bg-green-100 text-green-700"
                    : emp.status === "On Holiday"
                    ? "bg-yellow-100 text-yellow-700"
                    : emp.status === "Absent"
                    ? "bg-red-100 text-red-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {emp.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
