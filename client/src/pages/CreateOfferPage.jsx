import { useState, useContext, useEffect } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";

import createOffer from "../services/createOffer";
import ReturnButton from "../components/atomic/buttons/PreviousPage";
import FormInputConsultant from "../components/atomic/inputConsultant/formConsultant/FormInputConsultant";
import FormDropDown from "../components/atomic/inputConsultant/formConsultant/FormDropDown";

import ButtonSubmit from "../components/atomic/buttons/ButtonSubmit";

import { AuthContext } from "../contexts/AuthContext";

function CreateOfferPage() {
  const userData = useContext(AuthContext);
  const [authId, setAuthId] = useState(null);

  useEffect(() => {
    if (userData.auth.id !== authId) {
      setAuthId(userData.auth.id);
    }
  }, [userData, authId]);
  
  const navigate = useNavigate();
  const offersUrl = "/api/offers";
  const [technos, companies] = useLoaderData();

  const [formData, setFormData] = useState({
    title: "",
    type: "",
    company: "",
    city: "",
    details: "",
    techno: [],
    salary: "",
    advantages: "",
  });

  const handleChange = (e) => {
    const { name, value, multiple, selectedOptions } = e.target;

    if (multiple) {
      const selectedValues = Array.from(
        selectedOptions,
        (option) => option.value
      );

      return setFormData({
        ...formData,
        [name]: selectedValues,
      });
    }

    return setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmitOffer = async (e) => {
    e.preventDefault();
    const offerData = { ...formData, authId };

    try {
      const response = await createOffer(offersUrl, offerData, "POST");
      const data = await response.json();
      if (response.ok) {
        navigate(`/dashboardConsultant/${authId}`);
      }
      return data;
    } catch (err) {
      return err;
    }
  };

  return (
    <main className="min-h-screen">
      <ReturnButton source={`/dashboardConsultant/${authId}`} marginLeft="ml-10" />
      <h1 className="my-6 text-center text-[var(--secondary-color)]">
        Ajoutez une offre
      </h1>
      <form
        className="flex flex-col my-16 items-center"
        onSubmit={handleSubmitOffer}
      >
        <FormDropDown
          id="title"
          label="Titre de l'offre"
          name="title"
          multiple={false}
          handleChange={handleChange}
          options={[
            { name: "Développeur Web", id: "Développeur Web" },
            { name: "Développeur FullStack", id: "Développeur FullStack" },
            { name: "Développeur FrontEnd", id: "Développeur FrontEnd" },
            { name: "Développeur BackEnd", id: "Développeur BackEnd" },
          ]}
        />
        <FormDropDown
          id="type"
          label="Type d'offre"
          name="type"
          multiple={false}
          handleChange={handleChange}
          options={[
            { name: "CDI", id: "CDI" },
            { name: "CDD", id: "CDD" },
            { name: "Alternance", id: "Alternance" },
            { name: "FreeLance", id: "FreeLance" },
          ]}
        />
        <FormDropDown
          id="techno"
          label="Principales technologies"
          name="techno"
          multiple
          handleChange={handleChange}
          options={technos}
        />
        <FormInputConsultant
          id="city"
          name="city"
          label="Ville"
          type="text"
          value={formData.city}
          handleChange={handleChange}
        />
        <FormDropDown
          id="company"
          label="Nom de l'entreprise"
          name="company"
          multiple={false}
          handleChange={handleChange}
          options={companies}
        />

        <FormInputConsultant
          id="details"
          name="details"
          label="Description du poste"
          type="textarea"
          value={formData.details}
          handleChange={handleChange}
        />
        <FormInputConsultant
          id="salary"
          name="salary"
          type="text"
          label="Salaire annuel proposé (en Euro)"
          value={formData.salary}
          handleChange={handleChange}
        />
        <FormInputConsultant
          id="advantages"
          name="advantages"
          label="Avantages"
          type="textarea"
          value={formData.advantages}
          handleChange={handleChange}
        />
        <ButtonSubmit apply="big" name="Publier"/>
      </form>
    </main>
  );
}

export default CreateOfferPage;
