import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import FormInputCandidat from "../inputCandidat/formCandidat/FormInputCandidat";
import ButtonSubmit from "../buttons/ButtonSubmit";
import ChangeRegisterConnexion from "../modalElements/ChangeRegisterConnexion";
import validationRules from "../../../services/validationRules";

export default function FormConnexion({
  handleChange,
  formData,
  handleSubmitLogin,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form id="connexion" method="POST" className="flex flex-col items-center" onSubmit={handleSubmit}>
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
        <ChangeRegisterConnexion />
        <ButtonSubmit
          onClick={handleSubmitLogin}
          apply="big"
          name="connexion"
        />
      </footer>
    </form>
  );
}

FormConnexion.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmitLogin: PropTypes.func.isRequired,
  formData: PropTypes.shape({
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }).isRequired,
};
