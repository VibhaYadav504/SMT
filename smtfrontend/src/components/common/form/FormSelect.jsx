import { Controller } from "react-hook-form";

const FormSelect = ({
  control,
  name,
  label,
  options = [],
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
            <select
              {...field}
              className={`w-full rounded-xl border px-4 py-3 outline-none transition-all
              ${
                fieldState.error
                  ? "border-red-500"
                  : "border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              }`}
            >
              <option value="">
                Select {label}
              </option>

              {options.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              ))}
            </select>

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

export default FormSelect;