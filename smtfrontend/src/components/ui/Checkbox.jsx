import { Check } from "lucide-react";

const Checkbox = ({
  label,
  checked,
  onChange,
  name,
}) => {
  return (
    <label className="flex items-center gap-3 cursor-pointer select-none">
      <div className="relative">
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          className="peer sr-only"
        />

        <div
          className="
            h-5
            w-5
            rounded-md
            border-2
            border-orange-300
            bg-white
            transition-all
            duration-200
            peer-checked:bg-orange-500
            peer-checked:border-orange-500
            flex
            items-center
            justify-center
          "
        >
          {checked && (
            <Check size={14} className="text-white" />
          )}
        </div>
      </div>

      <span className="text-sm font-medium text-gray-600">
        {label}
      </span>
    </label>
  );
};

export default Checkbox;