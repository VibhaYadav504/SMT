const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`
        relative
        overflow-hidden
        rounded-[30px]
        border
        border-orange-100/70
        bg-white/95
        backdrop-blur-2xl
        shadow-[0_20px_60px_rgba(15,23,42,0.12)]
        transition-all
        duration-500
        p-10
        ${className}
      `}
    >
      {/* Top Glow */}
      <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-orange-200/30 blur-3xl" />

      {/* Bottom Glow */}
      <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-orange-100/40 blur-3xl" />

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default Card;