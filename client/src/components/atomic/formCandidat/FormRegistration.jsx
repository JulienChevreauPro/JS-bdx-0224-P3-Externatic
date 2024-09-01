import { useState } from "react";
// import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";

import FormInputCandidat from "../inputCandidat/formCandidat/FormInputCandidat";
import UserAgreements from "../modalElements/UserAgreements";
import ChangeRegisterConnexion from "../modalElements/ChangeRegisterConnexion";
import ButtonSubmit from "../buttons/ButtonSubmit";
import validationRules from "../../../services/validationRules";

export default function FormRegistration({
  handleChange,
  formData,
  handleSubmitRegistration,
}) {
  const [isChecked, setIsChecked] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleCheckChange = () => {
    setIsChecked(!isChecked);
  };

  // const onSubmitForm = (data) => {
  //   if (!isChecked) {
  //     toast.error("Vous devez accepter les CGU pour continuer.");
  //     return;
  //   }
  //   handleSubmitRegistration(data);
  // };

  return (
    <form
      id="registration"
      method="POST"
      className="flex flex-col items-center"
      onSubmit={handleSubmit}
    >
      <FormInputCandidat
        handleChange={handleChange}
        value={formData.firstname}
        id="firstname"
        label="Prénom"
        type="text"
        name="firstname"
        autoComplete="on"
        register={register("firstname", validationRules.firstName)}
      />
      {errors.firstname && <p>{errors.firstname.message}</p>}
      <FormInputCandidat
        handleChange={handleChange}
        value={formData.lastname}
        id="lastname"
        label="Nom"
        type="text"
        name="lastname"
        autoComplete="on"
        register={register("lastname", validationRules.lastName)}
      />
      {errors.lastname && <p>{errors.lastname.message}</p>}
      <FormInputCandidat
        handleChange={handleChange}
        value={formData.email}
        id="email"
        label="E-mail"
        type="email"
        name="email"
        autoComplete="on"
        register={register("email", validationRules.email)}
      />
      {errors.email && <p>{errors.email.message}</p>}
      <FormInputCandidat
        handleChange={handleChange}
        value={formData.password}
        id="password"
        label="Mot de passe"
        type="password"
        name="password"
        autoComplete="off"
        register={register("password", validationRules.password)}
      />
      {errors.password && <p>{errors.password.message}</p>}
      <footer className="mt-10 mx-4 flex flex-col gap-10 items-center">
        <UserAgreements
          isChecked={isChecked}
          onCheckChange={handleCheckChange}
        />
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
