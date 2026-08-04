import { forwardRef } from "react";

const Input = forwardRef(
  (
    {
      label,
      icon: Icon,
      error,
      className = "",
      ...props
    },
    ref
  ) => {
    return (
     <div className="space-y-2">
  {label && (
    <label className="block text-sm font-semibold text-slate-700">
      {label}
    </label>
  )}

         <div className="relative">
    {Icon && (
      <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none z-10">
        <Icon size={20} />
      </span>
    )}

    <input
      ref={ref}
     
      {...props}
      className={`
        h-14
        w-full
        pl[56px]
        rounded-2xl
        border
        border-slate-200
        bg-white
        pl-14
        pr-5
        outline-none
        ${className}
      `}
    />
 

          {/* Focus Glow Line */}
          <span
            className="
              pointer-events-none
              absolute
              bottom-0
              left-1/2
              h-[2px]
              w-0
              -translate-x-1/2
              rounded-full
              bg-orange-500
              transition-all
              duration-300
              group-focus-within:w-[90%]
            "
          />
        </div>

        {error && (
          <p className="text-sm font-medium text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;