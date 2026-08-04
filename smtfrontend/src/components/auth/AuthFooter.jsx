import { Link } from "react-router-dom";

const AuthFooter = ({
  text,
  linkText,
  link,
}) => {
  return (
    <div className="mt-8 border-t border-orange-100 pt-6 text-center">
      <p className="text-gray-600">
        {text}

        <Link
          to={link}
          className="ml-2 font-semibold text-orange-500 hover:text-orange-600 transition"
        >
          {linkText}
        </Link>
      </p>
    </div>
  );
};

export default AuthFooter;