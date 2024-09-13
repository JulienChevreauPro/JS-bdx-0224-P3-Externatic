import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { useModal } from "../../../contexts/ModalContext";
import CheckBox from "../checkBox/CheckBox";

function UserAgreements({ isChecked, onCheckChange }) {
  const { isClicked, handleChangeModal } = useModal();

  return (
    !isClicked && (
      <CheckBox
        id="CGU"
        apply="bigCheckbox"
        labelContent={
          <>
            J’ai lu et j’accepte les{" "}
            <Link
              to="/CGU"
              onClick={handleChangeModal}
              className="text-[var(--primary-color)]"
            >
              CGU
            </Link>{" "}
            et la{" "}
            <Link
              to="/protectionDataPolicy"
              className="text-[var(--primary-color)]"
              onClick={handleChangeModal}
            >
              politique de protection des données
            </Link>
          </>
        }
        checked={isChecked}
        onChange={onCheckChange}
        required
      />
    )
  );
}

UserAgreements.propTypes = {
  isChecked: PropTypes.bool.isRequired,
  onCheckChange: PropTypes.func.isRequired,
};
export default UserAgreements;
