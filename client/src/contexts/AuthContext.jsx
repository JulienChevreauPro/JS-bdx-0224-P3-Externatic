import { createContext, useContext, useEffect, useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import decodeToken from "../services/decodedToken";
import ScrollToTop from "../services/scrollToTop";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [auth, setAuth] = useState({ role: null, id: null });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userData = decodeToken(token);
      setAuth(userData);
    }
  }, []);
  const logout = useCallback(() => {
    setAuth(null);
    localStorage.removeItem("token");
    navigate("/");
    ScrollToTop();
  }, [navigate]);
  const contextValue = useMemo(
    () => ({ auth, setAuth, logout }),
    [auth, logout]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
export { AuthProvider };
