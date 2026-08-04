import { motion } from "framer-motion";

const StudentStatCard = ({
  title,
  value,
  icon: Icon,
  color,
  bg,
}) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
    >
      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-gray-500">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold text-gray-800">
            {value}
          </h2>

        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl ${bg}`}
        >
          <Icon
            size={28}
            className={color}
          />
        </div>

      </div>
    </motion.div>
  );
};

export default StudentStatCard;