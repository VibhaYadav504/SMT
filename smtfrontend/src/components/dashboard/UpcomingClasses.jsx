import { Calendar, Clock, Video } from "lucide-react";
import { motion } from "framer-motion";

import { upcomingClasses } from "./activityData";

const UpcomingClasses = () => {
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

        <p className="text-sm font-semibold uppercase tracking-wider text-orange-500">
          Schedule
        </p>

        <h2 className="mt-2 text-2xl font-bold text-slate-900">
          Upcoming Live Classes
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Today's scheduled live sessions.
        </p>

      </div>

      {/* Class List */}

      <div className="space-y-5 p-6">

        {upcomingClasses.map((item) => (

          <motion.div
            key={item.id}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className="
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
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

              {/* Left */}

              <div className="flex items-start gap-4">

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
                  <Video size={24} />
                </div>

                <div>

                  <h4 className="text-lg font-semibold text-slate-800">
                    {item.title}
                  </h4>

                  <p className="mt-1 text-sm text-slate-500">
                    Trainer:
                    <span className="ml-1 font-medium text-slate-700">
                      {item.trainer}
                    </span>
                  </p>

                </div>

              </div>

              {/* Right */}

              <div className="flex flex-wrap items-center gap-3">

                <div className="flex items-center gap-2 rounded-xl bg-orange-100 px-3 py-2 text-orange-600">

                  <Clock size={16} />

                  <span className="text-sm font-semibold">
                    {item.time}
                  </span>

                </div>

                <div className="flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2 text-slate-600">

                  <Calendar size={16} />

                  <span className="text-sm font-medium">
                    Today
                  </span>

                </div>

                <button
                  className="
                    rounded-xl
                    bg-orange-500
                    px-4
                    py-2
                    text-sm
                    font-semibold
                    text-white
                    shadow-md
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:bg-orange-600
                    hover:shadow-lg
                  "
                >
                  Join Class
                </button>

              </div>

            </div>

          </motion.div>

        ))}

      </div>

    </motion.div>
  );
};

export default UpcomingClasses;