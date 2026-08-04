import { ChevronDown } from "lucide-react";

const ProfileMenu = () => {
  return (
    <button className="flex items-center gap-3 rounded-xl bg-gray-100 px-3 py-2 transition hover:bg-orange-100">
      <img
        src="https://ui-avatars.com/api/?name=Admin"
        alt="Admin"
        className="h-10 w-10 rounded-full"
      />

      <div className="hidden text-left lg:block">
        <h4 className="font-semibold text-gray-800">
          Admin
        </h4>

        <p className="text-xs text-gray-500">
          Super Admin
        </p>
      </div>

      <ChevronDown size={18} />
    </button>
  );
};

export default ProfileMenu;