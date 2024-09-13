import { useState } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

import FormInputCandidat from "../inputCandidat/formCandidat/FormInputCandidat";
import UserAgreements from "../modalElements/UserAgreements";
import ChangeRegisterConnexion from "../modalElements/ChangeRegisterConnexion";
import ButtonSubmit from "../buttons/ButtonSubmit";

export default function FormRegistration({
  handleChange,
  formData,
  handleSubmitRegistration,
}) {  

  const [isChecked, setIsChecked] = useState(false);
  const handleCheckChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    
    if (!isChecked) {
      toast.error("Vous devez accepter les CGU pour continuer.");
      return;
    }
    handleSubmitRegistration();
  };

  return (
    <form
      id="registration"
      method="POST"
      className="flex flex-col items-center"
      onSubmit={onSubmitForm}
    >
      <FormInputCandidat
        handleChange={handleChange}
        value={formData.firstname}
        id="firstname"
        label="Prénom"
        type="text"
        name="firstname"
        autoComplete="on"
      />

      <FormInputCandidat
        handleChange={handleChange}
        value={formData.lastname}
        id="lastname"
        label="Nom"
        type="text"
        name="lastname"
        autoComplete="on"
      />

      <FormInputCandidat
        handleChange={handleChange}
        value={formData.email}
        id="email"
        label="E-mail"
        type="email"
        name="email"
        autoComplete="on"
      />

      <FormInputCandidat
        handleChange={handleChange}
        value={formData.password}
        id="password"
        label="Mot de passe"
        type="password"
        name="password"
        autoComplete="off"
      />

      <footer className="mt-10 mx-4 flex flex-col gap-10 items-center">
        <UserAgreements
          isChecked={isChecked}
          onCheckChange={handleCheckChange}
        />
        <ChangeRegisterConnexion />
        <ButtonSubmit
          onClick={onSubmitForm}
          apply="big"
          name="Valider mon inscription"
        />
      </footer>
    </form>
  );
}

FormRegistration.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmitRegistration: PropTypes.func.isRequired,
  formData: PropTypes.shape({
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }).isRequired,
};
