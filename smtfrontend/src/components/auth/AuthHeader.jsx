import { motion } from "framer-motion";

const AuthHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center"
    >
      <div className="mb-3 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100">
        <span className="text-3xl">👋</span>
      </div>

      <h1 className="text-3xl font-bold text-slate-900">
        Welcome Back
      </h1>

      <p className="mt-3 text-slate-500 leading-7">
        Sign in to continue to your
        <br />
        <span className="font-semibold text-orange-600">
          Skill Manthan Admin Panel
        </span>
      </p>
    </motion.div>
  );
};

export default AuthHeader;