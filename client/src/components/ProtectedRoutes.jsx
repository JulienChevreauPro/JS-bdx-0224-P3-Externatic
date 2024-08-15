import { useContext } from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

function ProtectedRoute({ element, requiredRole }) {

  const { auth } = useContext(AuthContext);

  return auth && requiredRole === auth?.role ? (
    element
  ) : (
    <Navigate to="/" replace />
  );
}

ProtectedRoute.propTypes = {
  element: PropTypes.element.isRequired,
  requiredRole: PropTypes.string.isRequired,
};

export default ProtectedRoute;
