import { Menu } from "lucide-react";

import SearchBar from "./SearchBar";
import NotificationMenu from "./NotificationMenu";
import ProfileMenu from "./ProfileMenu";

const TopNavbar = ({
  sidebarOpen,
  setSidebarOpen,
}) => {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-xl">

     <div className="flex h-[72px] items-center justify-between px-8 xl:px-10">

        {/* Left */}

      <div className="flex items-center gap-8">

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="rounded-xl p-3 transition hover:bg-orange-100 lg:hidden"
          >
            <Menu size={22} />
          </button>

          <SearchBar />

        </div>

        {/* Right */}

       <div className="flex items-center gap-5">

          <NotificationMenu />

          <ProfileMenu />

        </div>

      </div>

    </header>
  );
};

export default TopNavbar;