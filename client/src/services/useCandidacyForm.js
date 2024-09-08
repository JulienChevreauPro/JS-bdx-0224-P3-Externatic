import { useState } from "react";

const useCandidacyForm = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e, offerId, authId) => {
    e.preventDefault();
    const candidacyData = { ...formData, authId, offerId };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/candidacy/${offerId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`, 
          },
          body: JSON.stringify(candidacyData),
        }
      );
      return response;
    } catch (err) {
      throw new Error("Erreur lors de l'ajout de la candidature:", err);
    }
  };

  return {
    formData,
    setFormData,
    handleChange,
    handleSubmit,
  };
};

export default useCandidacyForm;
