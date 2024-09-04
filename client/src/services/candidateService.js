import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const useDashboardCandidateService = (data, logout, navigate) => {
  const [favorites, setFavorites] = useState([]);
  const [formData, setFormData] = useState({
    email: data.email || "",
    phone: data.phone || "",
    id: data.id || 0,
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/favorites`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const result = await response.json();
        setFavorites(result);
      } catch (err) {
        throw new Error("Error fetching favorites", err);
      }
    };

    fetchFavorites();
  }, [data.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/${data.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        toast.error("Nous n'avons pas pu mettre à jour votre profil...");
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      await response.json();

      toast.success("Profil modifié avec succès !!");
      setIsEditing(false);
    } catch (err) {
      toast.error("Erreur lors de la gestion du compte");
      console.error(`Error updating user: ${err}`);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/${data.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (!response.ok) {
        toast.error("Votre compte n'a pas pu être supprimé...");
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      toast.success("Compte supprimé !!");
      logout();
      navigate("/");
    } catch (err) {
      toast.error("Erreur lors de la suppression du compte");
      console.error("Error deleting account:", err);
    }
  };

  return {
    favorites,
    formData,
    isEditing,
    setIsEditing,
    handleChange,
    handleSubmit,
    handleDeleteAccount,
  };
};

export default useDashboardCandidateService;
