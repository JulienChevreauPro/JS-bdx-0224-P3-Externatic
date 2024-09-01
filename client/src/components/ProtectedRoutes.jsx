import { useContext } from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
// import { toast } from "react-toastify";
import { AuthContext } from "../contexts/AuthContext";

function ProtectedRoute({ element, requiredRoles }) {

  const { auth } = useContext(AuthContext);

  return auth && requiredRoles.includes(auth?.role) ? (
    element
  ) : (
    <>
    <Navigate to="/" replace />
    {/* {toast.error("Vous ne disposez pas des droits pour accéder à cette page")} */}
    </>
  );
}

ProtectedRoute.propTypes = {
  element: PropTypes.element.isRequired,
  requiredRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ProtectedRoute;
