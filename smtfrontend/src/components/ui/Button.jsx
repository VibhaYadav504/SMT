import { motion } from "framer-motion";

const Button = ({
  children,
  type = "button",
  loading = false,
  disabled = false,
  className = "",
  onClick,
}) => {
  return (
    <motion.button
      whileHover={{
        y: -2,
        scale: 1.01,
      }}
      whileTap={{
        scale: 0.98,
      }}
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
      className={`
        relative
        w-full
        h-14
        overflow-hidden
        rounded-2xl
        bg-gradient-to-r
        from-orange-500
        via-orange-600
        to-orange-500
        font-semibold
        text-white
        shadow-lg
        shadow-orange-500/30
        transition-all
        duration-300
        hover:shadow-xl
        hover:shadow-orange-500/40
        disabled:cursor-not-allowed
        disabled:opacity-70
        ${className}
      `}
    >
      {/* Shine Effect */}
      <span
        className="
          absolute
          inset-0
          -translate-x-full
          bg-gradient-to-r
          from-transparent
          via-white/25
          to-transparent
          transition-transform
          duration-700
          hover:translate-x-full
        "
      />

      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {loading && (
          <span
            className="
              h-5
              w-5
              animate-spin
              rounded-full
              border-2
              border-white/40
              border-t-white
            "
          />
        )}

        {loading ? "Please wait..." : children}
      </span>
    </motion.button>
  );
};

export default Button;