import { Menu } from "lucide-react";
import { motion } from "framer-motion";

import Logo from "../ui/Logo";
import SidebarItem from "./SidebarItem";
import menuItems from "./menuItems";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <motion.aside
      animate={{
        width: sidebarOpen ? 292 : 88,
      }}
      transition={{
        duration: 0.35,
        ease: "easeInOut",
      }}
      className="
        hidden
        lg:flex
        flex-col
        border-r
        border-slate-200
        bg-white/95
        backdrop-blur-xl
        shadow-[8px_0_30px_rgba(15,23,42,0.06)]
      "
    >
      {/* ================= Header ================= */}

      <div className="flex h-[72px] items-center justify-between border-b border-slate-200 px-6">

        <motion.div
          initial={false}
          animate={{
            opacity: sidebarOpen ? 1 : 0,
            x: sidebarOpen ? 0 : -20,
          }}
          transition={{ duration: 0.25 }}
        >
          {sidebarOpen && <Logo />}
        </motion.div>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="
            rounded-xl
            border
            border-slate-200
            bg-white
            p-2
            shadow-sm
            transition-all
            duration-300
            hover:scale-105
            hover:border-orange-200
            hover:bg-orange-50
          "
        >
          <Menu size={20} className="text-slate-700" />
        </button>
      </div>

      {/* ================= Menu ================= */}

      <div className="flex-1 overflow-y-auto px-4 py-6">

        <div className="space-y-3">

          {menuItems.map((item) => (
            <SidebarItem
              key={item.title}
              item={item}
              sidebarOpen={sidebarOpen}
            />
          ))}

        </div>

      </div>

      {/* ================= Footer ================= */}

      {sidebarOpen && (
        <div className="border-t border-slate-200 p-5">

          <div
            className="
              rounded-2xl
              border
              border-orange-100
              bg-gradient-to-r
              from-orange-50
              to-white
              p-4
              shadow-sm
            "
          >
            <h4 className="text-base font-bold text-slate-800">
              Skill Manthan
            </h4>

            <p className="mt-1 text-sm text-slate-500">
              Admin Panel v1.0
            </p>
          </div>

        </div>
      )}
    </motion.aside>
  );
};

export default Sidebar;