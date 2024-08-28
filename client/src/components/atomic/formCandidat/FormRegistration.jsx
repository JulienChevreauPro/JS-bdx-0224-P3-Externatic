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
  return (
    <form
      id="registration"
      method="POST"
      className="flex flex-col items-center"
    >
      <FormInputCandidat
        handleChange={handleChange}
        value={formData.firstname}
        id="firstname"
        label="Prénom"
        type="text"
        name="firstname"
        autocomplete="on"
      />
      <FormInputCandidat
        handleChange={handleChange}
        value={formData.lastname}
        id="lastname"
        label="Nom"
        type="text"
        name="lastname"
        autocomplete="on"
      />
      <FormInputCandidat
        handleChange={handleChange}
        value={formData.email}
        id="email"
        label="E-mail"
        type="email"
        name="email"
        autocomplete="on"
      />
      <FormInputCandidat
        handleChange={handleChange}
        value={formData.password}
        id="password"
        label="Mot de passe"
        type="password"
        name="password"
        autocomplete="off"
      />
      <footer className="mt-10 mx-4 flex flex-col gap-10 items-center">
        <UserAgreements />
        <ChangeRegisterConnexion />
        <ButtonSubmit
          onClick={handleSubmitRegistration}
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
