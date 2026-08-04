import { useState, forwardRef } from "react";
import { Eye, EyeOff } from "lucide-react";

const PasswordInput = forwardRef(
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
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-semibold text-slate-700">
            {label}
          </label>
        )}

        <div className="group relative">
          {/* Left Icon */}
          {Icon && (
            <div className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 transition-all duration-300 group-focus-within:text-orange-500">
              <Icon size={20} />
            </div>
          )}

          {/* Password Input */}
          <input
            ref={ref}
            type={showPassword ? "text" : "password"}
            {...props}
            className={`
              w-full
              h-14
              rounded-2xl
              border
              border-slate-200
              bg-white
              ${Icon ? "pl-14" : "px-5"}
              pr-14
              text-[15px]
              font-medium
              text-slate-800
              placeholder:text-slate-400
              outline-none
              transition-all
              duration-300

              hover:border-orange-300
              hover:shadow-md

              focus:border-orange-500
              focus:ring-4
              focus:ring-orange-100
              focus:shadow-lg
              focus:shadow-orange-100

              disabled:bg-slate-100
              disabled:cursor-not-allowed

              ${error ? "border-red-500 focus:ring-red-100" : ""}
              ${className}
            `}
          />

          {/* Show / Hide Button */}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="
              absolute
              right-4
              top-1/2
              -translate-y-1/2
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              text-slate-400
              transition-all
              duration-300
              hover:bg-orange-50
              hover:text-orange-500
              focus:outline-none
            "
          >
            {showPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>

          {/* Bottom Focus Line */}
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

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;