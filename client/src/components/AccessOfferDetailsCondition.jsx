import PropTypes from "prop-types";
import { useContext } from "react";
import { Link } from "react-router-dom";
import Button from "./atomic/buttons/Button";
import { AuthContext } from "../contexts/AuthContext";

function AccessOfferDetailsCondition({ handleClick, offerId }) {
  const { auth } = useContext(AuthContext);

  if (!auth || !auth.role) {
    return (
      <Button
        type="button"
        apply="medium buttonAnimate text-center content-center"
        handleChange={handleClick}
        buttonAnimate={false}
        name="INSCRIVEZ VOUS !"
      />
    );
  }

  if (auth.role === "candidat" || auth.role === "consultant") {
    return (
      <Link
        to={`/offers/${offerId}`}
        className="medium buttonAnimate text-center content-center"
      >
        VOIR L'OFFRE
      </Link>
    );
  }
  return (
    <Button
      type="button"
      apply="medium buttonAnimate text-center content-center"
      handleChange={handleClick}
      buttonAnimate={false}
      name="INSCRIVEZ VOUS !"
    />
  );
}

AccessOfferDetailsCondition.propTypes = {
  handleClick: PropTypes.func.isRequired,
  offerId: PropTypes.number.isRequired,
};

export default AccessOfferDetailsCondition;
