import {
  UserPlus,
  BookPlus,
  CalendarPlus,
  BellPlus,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";

const actions = [
  {
    title: "Add Student",
    icon: UserPlus,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Add Course",
    icon: BookPlus,
    color: "from-orange-500 to-orange-600",
  },
  {
    title: "Schedule Class",
    icon: CalendarPlus,
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Send Notice",
    icon: BellPlus,
    color: "from-purple-500 to-violet-500",
  },
];

const QuickActions = () => {
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
          Shortcuts
        </p>

        <h2 className="mt-2 text-2xl font-bold text-slate-900">
          Quick Actions
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Perform common administrative tasks with one click.
        </p>

      </div>

      {/* Actions */}

      <div className="grid grid-cols-2 gap-5 p-6">

        {actions.map((item) => {
          const Icon = item.icon;

          return (
            <motion.button
              key={item.title}
              whileHover={{
                y: -6,
                scale: 1.03,
              }}
              whileTap={{
                scale: 0.97,
              }}
              transition={{
                duration: 0.2,
              }}
              className="
                group
                relative
                overflow-hidden
                rounded-2xl
                border
                border-slate-200
                bg-slate-50
                p-5
                text-left
                transition-all
                duration-300
                hover:border-orange-200
                hover:bg-orange-50
              "
            >
              {/* Background Glow */}

              <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-orange-100 opacity-0 blur-2xl transition-all duration-300 group-hover:opacity-70" />

              {/* Icon */}

              <div
                className={`
                  relative
                  z-10
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  bg-gradient-to-br
                  ${item.color}
                  text-white
                  shadow-lg
                  transition-transform
                  duration-300
                  group-hover:scale-110
                  group-hover:rotate-6
                `}
              >
                <Icon size={24} />
              </div>

              {/* Title */}

              <h3 className="relative z-10 mt-5 text-base font-semibold text-slate-800">
                {item.title}
              </h3>

              <p className="relative z-10 mt-2 text-sm text-slate-500">
                Click to continue
              </p>

              {/* Arrow */}

              <div className="relative z-10 mt-5 flex justify-end">

                <ArrowRight
                  size={20}
                  className="text-slate-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-orange-500"
                />

              </div>

            </motion.button>
          );
        })}

      </div>
    </motion.div>
  );
};

export default QuickActions;