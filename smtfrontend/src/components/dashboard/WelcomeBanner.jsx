import { Plus, UserPlus, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const WelcomeBanner = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="
        relative
        overflow-hidden
        rounded-[10px]
        bg-gradient-to-r
        from-orange-500
        via-orange-600
        to-orange-700
        p-10
        
        lg:p-10
        text-white
        shadow-[0_20px_60px_rgba(249,115,22,0.35)]
      "
    >
      {/* Glow Effect */}
      <div className="absolute -top-24 -right-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-yellow-300/10 blur-3xl" />

      {/* Decorative Circle */}
      <div className="absolute right-12 top-10 hidden h-36 w-36 rounded-full border border-white/10 lg:block" />

      <div className="relative z-10 grid gap-10 lg:grid-cols-[1.6fr_0.8fr] lg:items-start">

        {/* Left */}
        <div className="max-w-2xl">

          <div className="inline-flex items-center gap-6 rounded-full bg-white/15 py-4 text-sm font-medium backdrop-blur-md">
            <Sparkles size={16} />
            Welcome Back 👋
          </div>

          <h1 className="mt-5 text-5xl font-extrabold leading-tight lg:text-5xl">
            Skill Manthan
            <br />
            Admin Dashboard
          </h1>

          <p className="mt-5 max-w-xl text-base leading-7 text-orange-100">
            Manage students, teachers, courses and live classes from one
            powerful dashboard with real-time analytics and insights.
          </p>

          {/* Stats */}
         <div className="mt-8 flex flex-wrap gap-6">

            <div>
              <h2 className="text-3xl font-bold">1,250+</h2>
              <p className="text-sm text-orange-100">
                Active Students
              </p>
            </div>

            <div className="h-12 w-px bg-white/20" />

            <div>
              <h2 className="text-3xl font-bold">58+</h2>
              <p className="text-sm text-orange-100">
                Live Courses
              </p>
            </div>

            <div className="h-12 w-px bg-white/20" />

            <div>
              <h2 className="text-3xl font-bold">96%</h2>
              <p className="text-sm text-orange-100">
                Success Rate
              </p>
            </div>

          </div> 

        </div>

        {/* Right */}
 <div className="flex flex-wrap gap-4">

          <button
            className="
              flex
              items-center
              gap-2
              rounded-2xl
              bg-white
              px-6
              py-3.5
              font-semibold
              text-orange-600
              shadow-lg
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-2xl
            "
          >
            <Plus size={18} />
            Add Course
          </button>

          <button
            className="
              flex
              items-center
              gap-2
              rounded-2xl
              border
              border-white/20
              bg-white/10
              px-6
              py-3.5
              font-semibold
              text-white
              backdrop-blur-md
              transition-all
              duration-300
              hover:bg-white/20
              hover:-translate-y-1
            "
          >
            <UserPlus size={18} />
            Add Student
          </button>

        </div>        

      </div>
    </motion.div>
  );
};

export default WelcomeBanner;