import {
  Search,
  Plus,
  Upload,
  Download,
  RotateCcw,
} from "lucide-react";

const StudentToolbar = ({
  search,
  setSearch,
  course,
  setCourse,
  status,
  setStatus,
  onAddStudent,
  onExport,
  onImport,
  onReset,
}) => {
  return (
    <div className="mb-6 rounded-3xl border border-orange-100 bg-white p-5 shadow-sm">

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        {/* Left */}

        <div className="flex flex-1 flex-col gap-4 md:flex-row">

          {/* Search */}

          <div className="relative flex-1">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search by name, email or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 outline-none transition focus:border-orange-500"
            />

          </div>

          {/* Course */}

          <select
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className="rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-orange-500"
          >
            <option value="">All Courses</option>
            <option>MERN Stack</option>
            <option>React</option>
            <option>Node.js</option>
            <option>Java</option>
            <option>Python</option>
          </select>

          {/* Status */}

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-orange-500"
          >
            <option value="">All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>

        </div>

        {/* Right */}

        <div className="flex flex-wrap gap-3">

          <button
            onClick={onReset}
            className="flex items-center gap-2 rounded-xl border px-4 py-3 hover:bg-gray-50"
          >
            <RotateCcw size={18} />
            Reset
          </button>

          <button
            onClick={onImport}
            className="flex items-center gap-2 rounded-xl border px-4 py-3 hover:bg-gray-50"
          >
            <Upload size={18} />
            Import
          </button>

          <button
            onClick={onExport}
            className="flex items-center gap-2 rounded-xl border px-4 py-3 hover:bg-gray-50"
          >
            <Download size={18} />
            Export
          </button>

          <button
            onClick={onAddStudent}
            className="flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 font-medium text-white transition hover:bg-orange-600"
          >
            <Plus size={18} />
            Add Student
          </button>

        </div>

      </div>

    </div>
  );
};

export default StudentToolbar;