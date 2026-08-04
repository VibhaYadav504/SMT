import logo from "../../assets/logo/logo.png";

const Logo = ({
  className = "",
  textColor = "text-orange-500",
  subtitleColor = "text-gray-500",
}) => {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md">
        <img
          src={logo}
          alt="Skill Manthan"
          className="h-10 w-10 object-contain"
        />
      </div>

      <div className="leading-tight">
        <h2 className={`text-2xl font-extrabold tracking-tight ${textColor}`}>
          Skill Manthan
        </h2>

        {/* <p
          className={`mt-1 text-sm font-medium uppercase tracking-[0.18em] ${subtitleColor}`}
        >
          Admin Panel
        </p> */}
      </div>
    </div>
  );
};

export default Logo;

