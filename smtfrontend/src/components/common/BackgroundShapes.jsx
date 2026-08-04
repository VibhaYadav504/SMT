import { motion } from "framer-motion";

const circles = [
  {
    size: "w-72 h-72",
    color: "bg-orange-300/20",
    top: "-top-16",
    left: "-left-20",
    duration: 12,
  },
  {
    size: "w-96 h-96",
    color: "bg-orange-400/10",
    bottom: "-bottom-24",
    right: "-right-20",
    duration: 15,
  },
  {
    size: "w-40 h-40",
    color: "bg-white/20",
    top: "top-20",
    right: "right-20",
    duration: 8,
  },
];

const BackgroundShapes = () => {
  return (
    <>
      {circles.map((item, index) => (
        <motion.div
          key={index}
          animate={{
            y: [0, -25, 0],
            x: [0, 15, 0],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`absolute rounded-full blur-3xl ${item.size} ${item.color} ${item.top || ""} ${item.bottom || ""} ${item.left || ""} ${item.right || ""}`}
        />
      ))}
    </>
  );
};

export default BackgroundShapes;