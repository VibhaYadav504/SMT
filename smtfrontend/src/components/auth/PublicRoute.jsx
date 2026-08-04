import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <h2 className="text-lg font-semibold text-orange-500">
          Loading...
        </h2>
      </div>
    );
  }

  return user ? <Navigate to="/dashboard" replace /> : children;
};

export default PublicRoute;