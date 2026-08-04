import { GraduationCap, BookOpen, Users } from "lucide-react";
import Logo from "../ui/Logo";
import { motion } from "framer-motion";

const features = [
  {
    icon: Users,
    title: "5000+ Students",
    desc: "Trusted by learners across India",
  },
  {
    icon: BookOpen,
    title: "100+ Courses",
    desc: "Industry oriented learning paths",
  },
  {
    icon: GraduationCap,
    title: "Career Focused",
    desc: "Learn, Practice & Get Placed",
  },
];

const BrandPanel = () => {
  return (
    <div className="relative hidden lg:flex overflow-hidden bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 text-white">

      {/* Floating Circles */}

     <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-white/10 blur-[120px]" />

     <div className="absolute -bottom-24 -right-24 h-[420px] w-[420px] rounded-full bg-yellow-300/15 blur-[140px]" />

      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{
          duration: 6,
          repeat: Infinity,
        }}
        className="absolute top-20 right-16 h-32 w-32 rounded-full bg-white/10"
      />

      <motion.div
        animate={{ y: [0, 25, 0] }}
        transition={{
          duration: 7,
          repeat: Infinity,
        }}
        className="absolute bottom-24 left-12 h-20 w-20 rounded-full bg-white/10"
      />

     <div className="relative z-10 flex h-full w-full flex-col justify-between px-14 py-10">

        {/* Logo */}

        <Logo
  textColor="text-white"
  subtitleColor="text-orange-100"
/>

        {/* Heading */}

        <div className="space-y-12">

         <h1 className="max-w-xl text-6xl font-extrabold leading-[1.08] tracking-tight">

            Empowering Skills,

            <br />

            Building Careers

          </h1>

          <p className="mt-7 max-w-lg text-lg leading-8 text-orange-100/90">

            One platform to manage students,
            courses, live classes and complete
            learning ecosystem.

          </p>

        </div>

        {/* Features */}

        <div className="space-y-5">

          {features.map((item, index) => {

            const Icon = item.icon;

            return (

              <motion.div
                key={index}
                whileHover={{ scale: 1.03 }}
              className="group flex items-center gap-5 rounded-3xl border border-white/15 bg-white/10 px-6 py-4 backdrop-blur-xl transition-all duration-300 hover:bg-white/15 hover:shadow-2xl hover:shadow-black/20">

               <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-orange-600 shadow-lg transition-transform duration-300 group-hover:scale-110">

                  <Icon size={26} />

                </div>

                <div>

                 <h3 className="text-lg font-bold tracking-wide">

                    {item.title}

                  </h3>

                 <p className="mt-1 text-sm leading-6 text-orange-100/90">

                    {item.desc}

                  </p>

                </div>

              </motion.div>

            );

          })}

        </div>

        {/* Footer */}

       <p className="border-t border-white/10 pt-6 text-sm text-orange-100/80">

          © {new Date().getFullYear()} Skill Manthan.
          All Rights Reserved.

        </p>

      </div>

    </div>
  );
};

export default BrandPanel;