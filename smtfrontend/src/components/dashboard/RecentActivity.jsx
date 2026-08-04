import { motion } from "framer-motion";
import { Clock3 } from "lucide-react";

import { activities } from "./activityData";

const RecentActivity = () => {
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
          Timeline
        </p>

        <h2 className="mt-2 text-2xl font-bold text-slate-900">
          Recent Activity
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Latest activities happening on your platform.
        </p>

      </div>

      {/* Timeline */}

      <div className="relative p-6">

        {/* Vertical Line */}

        <div className="absolute left-[29px] top-6 bottom-6 w-px bg-slate-200" />

        <div className="space-y-8">

          {activities.map((item) => (

            <div
              key={item.id}
              className="relative flex gap-5"
            >
              {/* Dot */}

              <div
                className={`
                  relative
                  z-10
                  mt-1
                  h-4
                  w-4
                  rounded-full
                  ring-4
                  ring-white
                  shadow-sm
                  ${item.color}
                `}
              />

              {/* Content */}

              <div className="flex-1">

                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 transition-all duration-300 hover:border-orange-200 hover:bg-orange-50">

                  <h4 className="font-semibold text-slate-800">
                    {item.title}
                  </h4>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {item.description}
                  </p>

                  <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">

                    <Clock3 size={14} />

                    {item.time}

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>
    </motion.div>
  );
};

export default RecentActivity;