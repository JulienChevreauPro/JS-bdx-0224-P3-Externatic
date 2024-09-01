import { useContext, useEffect } from "react";
import { useLoaderData } from "react-router-dom";

import useLogicForm from "../services/useLogicForm";
import CardOfferForCandidate from "../components/atomic/card/CardOfferForCandidate";
import SearchInputCandidat from "../components/atomic/inputCandidat/searchInput/SearchInputCandidat";
import { AuthContext } from "../contexts/AuthContext";
import filterOffers from "../services/filterOffers";
import decodeToken from "../services/decodedToken";
import iconSearch from "../assets/images/ICONSEARCH.svg";
import iconLoc from "../assets/images/ICONLOC.svg";
import iconStack from "../assets/images/ICONSTACK.svg";

function OfferPage() {
  const { setAuth } = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userData = decodeToken(token);
      setAuth(userData);
    }
  }, [setAuth]);

  const offers = useLoaderData();
  const { formData, handleChange } = useLogicForm();
  
  return (
    <main className="m-4 mt-12 flex flex-col min-h-screen">
      <section
        title="Page d'offres"
        className="my-4 gap-4 flex flex-col items-center md:flex-row md:justify-around"
      >
        <SearchInputCandidat
          id="type"
          name="type"
          placeholder="Rechercher un poste ..."
          iconSrc={iconSearch}
          alt="logo recherche"
          value={formData.type}
          handleChange={handleChange}
        />
        <SearchInputCandidat
          id="city"
          name="city"
          placeholder="Ville, région ou Pays"
          iconSrc={iconLoc}
          alt="logo recherche"
          value={formData.city}
          handleChange={handleChange}
        />
        <SearchInputCandidat
          id="technos"
          name="technos"
          placeholder="Compétences, Stack"
          iconSrc={iconStack}
          alt="logo recherche"
          value={formData.technos}
          handleChange={handleChange}
        />
      </section>
      <section className="gap-5 flex flex-col items-center md:flex-row md:flex-wrap md:justify-center">
        {filterOffers(offers, formData).map((filteredOffer) => (
          <CardOfferForCandidate key={filteredOffer.id} offer={filteredOffer} />
        ))}
        {filterOffers(offers, formData).length === 0 && (
          <p className="flex items-center justify-center my-20 w-full h-20 max-sm:w-64 max-sm:h-14 bg-[var(--secondary-background-color)] rounded-lg text-[var(--primary-color)] border border-[var(--primary-color)]">
            Aucune offre ne correspond à votre recherche.
          </p>
        )}
      </section>
    </main>
  );
}

export default OfferPage;
