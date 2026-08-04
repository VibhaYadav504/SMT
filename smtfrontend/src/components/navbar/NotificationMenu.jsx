import { Bell } from "lucide-react";

const NotificationMenu = () => {
  return (
    <button className="relative rounded-xl bg-gray-100 p-3 transition hover:bg-orange-100">
      <Bell size={20} />

      <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
        3
      </span>
    </button>
  );
};

export default NotificationMenu;