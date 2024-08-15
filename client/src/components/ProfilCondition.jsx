import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Button from "./atomic/buttons/Button";

function ProfilCondition({ handleChangeNav, handleClick, userData }) {
  return (
    <>
      {userData.auth?.role === "consultant" && (
        <Link to={`/dashboardConsultant/${userData.auth.id}`} onClick={handleChangeNav}>
          Gestion
        </Link>
      )}
      {userData.auth?.role === "candidat" && (
        <Link to={`/dashboardCandidate/${userData.auth.id}`} onClick={handleChangeNav}>
          Profil
        </Link>
      )}
      {!["consultant", "candidat"].includes(userData.auth?.role) && (
        <Button
          type="button"
          apply="text-[var(--primary-background-color)] md:text-[var(--text-color)]"
          handleChange={handleClick}
          buttonAnimate={false}
          name="Profil"
        />
      )}
    </>
  );
}

ProfilCondition.propTypes = {
  handleChangeNav: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  userData: PropTypes.shape({
    auth: PropTypes.shape({
      id: PropTypes.number,
      role: PropTypes.string,
    }),
  }).isRequired,
};

export default ProfilCondition;
