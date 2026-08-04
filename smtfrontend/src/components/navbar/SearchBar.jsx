import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="relative hidden md:block">
      <Search
        size={20}
        className="
          absolute
          left-5
          top-1/2
          
          -translate-y-1/2
          text-slate-400
        "
      />

      <input
        type="text"
        placeholder="Search students, courses..."
        className="
          h-12
          w-[380px]
          rounded-2xl
          border
          border-slate-200
          bg-white
          pl-14
          pr-5
          text-sm
          text-slate-700
          placeholder:text-slate-400
          shadow-sm
          outline-none
          transition-all
          duration-300
          focus:border-orange-500
          focus:ring-4
          focus:ring-orange-100
          focus:shadow-md
        "
      />
    </div>
  );
};

export default SearchBar;