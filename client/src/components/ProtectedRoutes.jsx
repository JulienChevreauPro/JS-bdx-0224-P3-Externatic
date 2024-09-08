import { useContext } from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

function ProtectedRoute({ element, requiredRoles }) {

  const { auth } = useContext(AuthContext);

  return auth && requiredRoles.includes(auth?.role) ? (
    element
  ) : (
    <Navigate to="/" replace />
  );
}

ProtectedRoute.propTypes = {
  element: PropTypes.element.isRequired,
  requiredRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ProtectedRoute;
