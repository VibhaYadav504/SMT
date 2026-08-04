import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const SidebarItem = ({ item, sidebarOpen }) => {
  const Icon = item.icon;

  return (
    <NavLink to={item.path}>
      {({ isActive }) => (
        <motion.div
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
          className={`
            group
            flex
            items-center
            gap-3
            rounded-2xl
            px-4
            py-3
            transition-all
            duration-300

            ${
              isActive
                ? `
                  bg-gradient-to-r
                  from-orange-500
                  to-orange-600
                  text-white
                  shadow-lg
                  shadow-orange-200
                `
                : `
                  text-slate-600
                  hover:bg-orange-50
                  hover:text-orange-600
                `
            }
          `}
        >
          {/* Icon */}

          <div
            className={`
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              transition-all
              duration-300

              ${
                isActive
                  ? "bg-white/20"
                  : "bg-slate-100 group-hover:bg-orange-100"
              }
            `}
          >
            <Icon size={20} />
          </div>

          {/* Title */}

          {sidebarOpen && (
            <span className="flex-1 text-[15px] font-semibold tracking-wide">
              {item.title}
            </span>
          )}

          {/* Active Dot */}

          {isActive && sidebarOpen && (
            <div className="h-2.5 w-2.5 rounded-full bg-white shadow-md" />
          )}
        </motion.div>
      )}
    </NavLink>
  );
};

export default SidebarItem;