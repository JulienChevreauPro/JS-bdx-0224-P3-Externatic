import { useState } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";

import createOffer from "../services/createOffer";
import ReturnButton from "../components/atomic/buttons/PreviousPage";
import FormInputConsultant from "../components/atomic/inputConsultant/formConsultant/FormInputConsultant";
import FormDropDown from "../components/atomic/inputConsultant/formConsultant/FormDropDown";

function CreateOfferPage() {
  const navigate = useNavigate();
  const offersUrl = "/api/offers";
  const [technos, jobs, companies] = useLoaderData();

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
    const consultantId = 1; // ID du consultant "en dur"
    const offerData = { ...formData, consultantId };

    try {
      const response = await createOffer(offersUrl, offerData, "POST");
      const data = await response.json();
      if (response.ok) {
        navigate("/");
      }
      return data;
    } catch (err) {
      return err;
    }
  };

  return (
    <main className="min-h-screen">
      <ReturnButton />
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
          options={jobs}
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
        <button type="submit" label="Publier">
          Publier
        </button>
      </form>
    </main>
  );
}

export default CreateOfferPage;
