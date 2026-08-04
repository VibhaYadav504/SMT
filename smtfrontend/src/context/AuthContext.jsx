import { createContext, useContext, useEffect, useState } from "react";
import { profile, logout } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser =
      localStorage.getItem("user") ||
      sessionStorage.getItem("user");

    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await profile();
        const userData = res.data.data;

        setUser(userData);

        if (localStorage.getItem("accessToken")) {
          localStorage.setItem("user", JSON.stringify(userData));
        } else {
          sessionStorage.setItem("user", JSON.stringify(userData));
        }
      } catch (error) {
        console.error(error);

        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");

        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("user");

        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    const token =
      localStorage.getItem("accessToken") ||
      sessionStorage.getItem("accessToken");

    if (token) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, []);

  const logoutUser = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error);
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");

      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("user");

      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);