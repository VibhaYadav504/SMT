import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const StatsCard = ({
  title,
  value,
  icon: Icon,
  color = "from-orange-500 to-orange-600",
  growth = "+0%",
}) => {
  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      transition={{
        duration: 0.25,
      }}
      className="
        group
        relative
        overflow-hidden
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
        transition-all
        duration-300
        hover:border-orange-200
        hover:shadow-2xl
      "
    >
      {/* Background Glow */}

      <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-orange-100 opacity-50 blur-3xl transition-all duration-500 group-hover:scale-125" />

      <div className="relative z-10 flex items-start justify-between">

        {/* Left */}

        <div>

          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-bold text-slate-900">
            {value}
          </h2>

          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1.5 text-sm font-semibold text-green-700">

            <ArrowUpRight size={16} />

            {growth}

            <span className="font-normal text-slate-500">
              this month
            </span>

          </div>

        </div>

        {/* Icon */}

        <div
          className={`
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-2xl
            bg-gradient-to-br
            ${color}
            text-white
            shadow-lg
            transition-transform
            duration-300
            group-hover:rotate-6
            group-hover:scale-110
          `}
        >
          <Icon size={30} />
        </div>

      </div>

      {/* Bottom Accent */}

      <div className="mt-6 h-1 w-16 rounded-full bg-gradient-to-r from-orange-500 to-orange-300" />
    </motion.div>
  );
};

export default StatsCard;