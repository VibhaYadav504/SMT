import {
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";
import { motion } from "framer-motion";

import { students } from "./studentsData";

const RecentStudents = () => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="
        mt-8
        overflow-hidden
        rounded-3xl
        border
        border-slate-200
        bg-white
        shadow-sm
        transition-all
        duration-300
        hover:border-orange-200
        hover:shadow-xl
      "
    >
      {/* Header */}

      <div className="flex flex-col gap-4 border-b border-slate-200 p-6 md:flex-row md:items-center md:justify-between">

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-orange-500">
            Students
          </p>

          <h2 className="mt-1 text-2xl font-bold text-slate-900">
            Recent Students
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Latest enrolled students in Skill Manthan.
          </p>
        </div>

        <button
          className="
            rounded-xl
            bg-orange-500
            px-5
            py-2.5
            font-semibold
            text-white
            shadow-lg
            transition-all
            duration-300
            hover:-translate-y-1
            hover:bg-orange-600
          "
        >
          View All
        </button>

      </div>

      {/* Table */}

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-slate-50">

            <tr>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                Student
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                Phone
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                Course
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                Status
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                Joined
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold text-slate-600">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {students.map((student) => (

              <tr
                key={student.id}
                className="
                  border-t
                  border-slate-100
                  transition-all
                  duration-300
                  hover:bg-orange-50/60
                "
              >

                {/* Student */}

                <td className="px-6 py-5">

                  <div className="flex items-center gap-4">

                    <img
                      src={`https://ui-avatars.com/api/?background=f97316&color=fff&bold=true&name=${encodeURIComponent(
                        student.name
                      )}`}
                      alt={student.name}
                      className="
                        h-12
                        w-12
                        rounded-full
                        ring-2
                        ring-orange-100
                      "
                    />

                    <div>

                      <h4 className="font-semibold text-slate-800">
                        {student.name}
                      </h4>

                      <p className="text-sm text-slate-500">
                        {student.email}
                      </p>

                    </div>

                  </div>

                </td>

                {/* Phone */}

                <td className="px-6 py-5 text-slate-600">
                  {student.phone}
                </td>

                {/* Course */}

                <td className="px-6 py-5">

                  <span className="rounded-lg bg-orange-50 px-3 py-1 text-sm font-medium text-orange-600">
                    {student.course}
                  </span>

                </td>

                {/* Status */}

                <td className="px-6 py-5">

                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold

                    ${
                      student.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    ● {student.status}
                  </span>

                </td>

                {/* Joined */}

                <td className="px-6 py-5 text-slate-500">
                  {student.joined}
                </td>

                {/* Actions */}

                <td className="px-6 py-5">

                  <div className="flex justify-center gap-2">

                    <button
                      className="
                        rounded-xl
                        bg-blue-50
                        p-2.5
                        text-blue-600
                        transition-all
                        duration-300
                        hover:bg-blue-100
                        hover:scale-105
                      "
                    >
                      <Eye size={18} />
                    </button>

                    <button
                      className="
                        rounded-xl
                        bg-orange-50
                        p-2.5
                        text-orange-600
                        transition-all
                        duration-300
                        hover:bg-orange-100
                        hover:scale-105
                      "
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      className="
                        rounded-xl
                        bg-red-50
                        p-2.5
                        text-red-600
                        transition-all
                        duration-300
                        hover:bg-red-100
                        hover:scale-105
                      "
                    >
                      <Trash2 size={18} />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </motion.div>
  );
};

export default RecentStudents;