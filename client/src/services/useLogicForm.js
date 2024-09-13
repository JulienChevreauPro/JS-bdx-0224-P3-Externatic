import { useState } from "react";
import { toast } from "react-toastify";
import { sendUser } from "./fetchApi";
import Reload from "./reload";
import { useModal } from "../contexts/ModalContext";

const useLogicForm = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    city: "",
    type: "",
    technos: "",
  });

  const usersUrl = "/api/users";
  const loginUrl = "/api/login";

  const { setIsClicked, handleChangeModal } = useModal();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmitRegistration = async () => {
    const { firstname, lastname, email, password } = formData;
    if (!firstname || !lastname || !email || !password) {
      toast.error("Veuillez renseigner la totalité des champs");
      return;
    }

    try {
      const response = await sendUser(usersUrl, formData, "POST");

      if (response && response.ok) {
        setIsClicked(true);
        toast.success("Enregistrement réussi !");
      } else {
        const errorData = await response.json();

        if (errorData.errors) {
          errorData.errors.forEach((err) => {
            toast.error(err.msg);
          });
        } else if (
          errorData.message &&
          errorData.message.includes("Duplicate entry")
        ) {
          toast.error(
            "L'email est déjà utilisé. Veuillez en choisir un autre."
          );
        } else {
          toast.error("Erreur lors de l'enregistrement !");
        }
      }
    } catch (err) {
      toast.error("Erreur lors de l'enregistrement !");
    }
  };

  const handleSubmitLogin = async (e) => {
    if (e) e.preventDefault();

    const loginData = {
      email: formData.email,
      password: formData.password,
    };

    if (!loginData.email || !loginData.password) {
      toast.error("Veuillez renseigner la totalité des champs");
      return;
    }

    try {
      const response = await sendUser(loginUrl, loginData, "POST");

      if (response) {
        const userData = await response.json();

        localStorage.setItem("token", userData.token);
        toast.success("Connexion réussie!");
        handleChangeModal();
        Reload();
      } else {
        toast.error("Erreur lors de la connexion !");
      }
    } catch (err) {
      toast.error("Erreur lors de la connexion !");
      console.error("Login Error:", err);
    }
  };

  return {
    formData,
    handleChange,
    handleSubmitRegistration,
    handleSubmitLogin,
  };
};

export default useLogicForm;
