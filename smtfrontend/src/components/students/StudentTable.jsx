import StudentRow from "./StudentRow";

const StudentTable = ({
  students,
  onView,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="sticky top-0 bg-orange-50 z-10">

            <tr>

              <th className="w-12 px-4 py-4">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 accent-orange-500"
                />
              </th>

              <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700">
                Student
              </th>

              <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700">
                Phone
              </th>

              <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700">
                Course
              </th>

              <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700">
                Status
              </th>

              <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700">
                Fees
              </th>

              <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700">
                Joined
              </th>

              <th className="px-4 py-4 text-center text-sm font-semibold text-gray-700">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {students.length > 0 ? (
              students.map((student) => (
                <StudentRow
                  key={student.id}
                  student={student}
                  onView={onView}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="py-10 text-center text-gray-500"
                >
                  No students found.
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default StudentTable;