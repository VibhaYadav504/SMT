import { Eye, Pencil, Trash2 } from "lucide-react";

const StudentRow = ({
  student,
  onView,
  onEdit,
  onDelete,
}) => {
  return (
    <tr className="border-b border-gray-100 transition-all hover:bg-orange-50">

      {/* Checkbox */}
      <td className="px-4 py-4">
        <input
          type="checkbox"
          className="h-4 w-4 rounded accent-orange-500"
        />
      </td>

      {/* Student */}
      <td className="px-4 py-4">
        <div className="flex items-center gap-3">

          <img
            src={student.avatar}
            alt={student.name}
            className="h-11 w-11 rounded-full border object-cover"
          />

          <div>
            <h4 className="font-semibold text-gray-800">
              {student.name}
            </h4>

            <p className="text-sm text-gray-500">
              {student.email}
            </p>
          </div>

        </div>
      </td>

      {/* Phone */}
      <td className="px-4 py-4 text-gray-700">
        {student.phone}
      </td>

      {/* Course */}
      <td className="px-4 py-4">
        <span className="rounded-lg bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
          {student.course}
        </span>
      </td>

      {/* Status */}
      <td className="px-4 py-4">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            student.status === "Active"
              ? "bg-green-100 text-green-700"
              : student.status === "Completed"
              ? "bg-blue-100 text-blue-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {student.status}
        </span>
      </td>

      {/* Fees */}
      <td className="px-4 py-4">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            student.fees === "Paid"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {student.fees}
        </span>
      </td>

      {/* Joined */}
      <td className="px-4 py-4 text-gray-700">
        {student.joined}
      </td>

      {/* Actions */}
      <td className="px-4 py-4">
        <div className="flex justify-center gap-2">

          <button
            onClick={() => onView(student)}
            className="rounded-lg bg-sky-100 p-2 text-sky-600 transition hover:bg-sky-200"
            title="View Student"
          >
            <Eye size={18} />
          </button>

          <button
            onClick={() => onEdit(student)}
            className="rounded-lg bg-orange-100 p-2 text-orange-600 transition hover:bg-orange-200"
            title="Edit Student"
          >
            <Pencil size={18} />
          </button>

          <button
            onClick={() => onDelete(student)}
            className="rounded-lg bg-red-100 p-2 text-red-600 transition hover:bg-red-200"
            title="Delete Student"
          >
            <Trash2 size={18} />
          </button>

        </div>
      </td>

    </tr>
  );
};

export default StudentRow;