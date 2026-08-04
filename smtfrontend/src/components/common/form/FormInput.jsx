import { Controller } from "react-hook-form";

const FormInput = ({
  control,
  name,
  label,
  type = "text",
  placeholder,
  disabled = false,
}) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">
        {label}
      </label>

      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <>
            <input
              {...field}
              type={type}
              disabled={disabled}
              placeholder={placeholder}
              className={`w-full rounded-xl border px-4 py-3 outline-none transition-all
              ${
                fieldState.error
                  ? "border-red-500 focus:ring-2 focus:ring-red-200"
                  : "border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              }`}
            />

            {fieldState.error && (
              <p className="text-sm text-red-500">
                {fieldState.error.message}
              </p>
            )}
          </>
        )}
      />
    </div>
  );
};

export default FormInput;