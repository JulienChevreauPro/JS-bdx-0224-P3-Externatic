import PropTypes from "prop-types";
import { useContext } from "react";
import { Link } from "react-router-dom";
import Button from "./atomic/buttons/Button";
import { AuthContext } from "../contexts/AuthContext";

function AccessOfferDetailsCondition({ handleClick, offerId }) {
  const { auth } = useContext(AuthContext);

  return (
    <>
      {(auth.role === "candidat" || auth.role === "consultant") && (
        <Link
          to={`/offers/${offerId}`}
          className="medium buttonAnimate text-center content-center"
        >
          VOIR L'OFFRE
        </Link>
      )}
      {!["consultant", "candidat"].includes(auth.role) && (
        <Button
          type="button"
          apply="medium buttonAnimate text-center content-center"
          handleChange={handleClick}
          buttonAnimate={false}
          name="INSCRIVEZ VOUS !"
        />
      )}
    </>
  );
}

AccessOfferDetailsCondition.propTypes = {
  handleClick: PropTypes.func.isRequired,
  offerId: PropTypes.number.isRequired,
};

export default AccessOfferDetailsCondition;
