import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
import { sendUser } from "./fetchApi";
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

  const navigate = useNavigate();

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

  const handleSubmitRegistration = async (e) => {
    e.preventDefault();

    const { firstname, lastname, email, password } = formData;
    if (!firstname || !lastname || !email || !password) {
      // toast.error("Veuillez renseigner la totalité des champs");
      return;
    }

    try {
      const response = await sendUser(usersUrl, formData, "POST");

      if (response.ok) {
        setIsClicked(true);
        // toast.success("Enregistrement réussi !");
      }
    } catch (err) {
      // toast.error("Erreur lors de l'enregistrement !");
    }
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();

    try {
      const loginData = {
        email: formData.email,
        password: formData.password,
      };
      const response = await sendUser(loginUrl, loginData, "POST");
      if (response) {
        const userData = response.token;
        handleChangeModal();
        navigate("/");
        window.location.reload();
        localStorage.setItem("token", userData);
        return userData;
      }
      return response;
    } catch (err) {
      return err;
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
