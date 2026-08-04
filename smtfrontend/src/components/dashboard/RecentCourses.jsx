import { BookOpen, Users, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

import { recentCourses } from "./courseData";

const RecentCourses = () => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="
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

      <div className="border-b border-slate-200 p-6">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-sm font-semibold uppercase tracking-wider text-orange-500">
              Learning
            </p>

            <h2 className="mt-2 text-2xl font-bold text-slate-900">
              Recent Courses
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Newly created and recently updated courses.
            </p>

          </div>

          <button
            className="
              rounded-xl
              bg-orange-50
              px-4
              py-2
              font-medium
              text-orange-600
              transition-all
              duration-300
              hover:bg-orange-100
            "
          >
            View All
          </button>

        </div>

      </div>

      {/* Courses */}

      <div className="space-y-5 p-6">

        {recentCourses.map((course) => (

          <motion.div
            key={course.id}
            whileHover={{
              y: -4,
            }}
            transition={{
              duration: 0.2,
            }}
            className="
              group
              rounded-2xl
              border
              border-slate-200
              bg-slate-50
              p-5
              transition-all
              duration-300
              hover:border-orange-200
              hover:bg-orange-50
            "
          >
            <div className="flex items-start justify-between gap-4">

              {/* Left */}

              <div className="flex gap-4">

                <div
                  className="
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    bg-gradient-to-br
                    from-orange-500
                    to-orange-600
                    text-white
                    shadow-lg
                  "
                >
                  <BookOpen size={24} />
                </div>

                <div>

                  <h3 className="text-lg font-semibold text-slate-800">
                    {course.title}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Trainer :
                    <span className="ml-1 font-medium text-slate-700">
                      {course.trainer}
                    </span>
                  </p>

                  <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">

                    <Users size={16} />

                    <span>
                      {course.students} Students
                    </span>

                  </div>

                </div>

              </div>

              {/* Status */}

              <span
                className={`rounded-full px-4 py-1.5 text-xs font-semibold

                ${
                  course.status === "Published"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {course.status}
              </span>

            </div>

            {/* Footer */}

            <div className="mt-5 flex justify-end">

              <button
                className="
                  flex
                  items-center
                  gap-2
                  text-sm
                  font-semibold
                  text-orange-600
                  transition-all
                  duration-300
                  hover:gap-3
                "
              >
                View Details

                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />

              </button>

            </div>

          </motion.div>

        ))}

      </div>

    </motion.div>
  );
};

export default RecentCourses;