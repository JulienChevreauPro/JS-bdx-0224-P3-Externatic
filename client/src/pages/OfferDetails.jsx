import { useState, useEffect, useContext } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Tag from "../components/atomic/tag/Tag";
import PreviousPage from "../components/atomic/buttons/PreviousPage";
import ScrollToTop from "../services/scrollToTop";
import { deleteOffer } from "../services/deleteOffer";

import { AuthContext } from "../contexts/AuthContext";

function OfferDetails() {
  const offerData = useLoaderData();
  const offersUrl = "api/offers";
  const userData = useContext(AuthContext);
  const navigate = useNavigate();

  const [authId, setAuthId] = useState(null);

  useEffect(() => {
    if (userData.auth.id !== authId) {
      setAuthId(userData.auth.id);
    }
  }, [userData, authId]);

  ScrollToTop();

  const handleDeleteOffer = async (e) => {
    e.preventDefault();

    try {
      const response = await deleteOffer(offersUrl, offerData, "DELETE");

      if (response.ok) {
        toast.success("Offre supprimée avec succès !");
        navigate(`/dashboardConsultant/${authId}`);
      } else {
        toast.error("Erreur lors de la suppression de l'offre !!");
      }
    } catch (err) {
      toast.error("Erreur lors de la gestion de la suppression");
    }
  };

  return (
    <main>
      <article>
        <header className="my-10 md:mx-10 mx-4 relative">
          <PreviousPage source="/offers" />
          <img
            src={offerData.banner}
            alt=""
            className="mt-10 w-full h-80 mx-auto object-cover"
          />
          <img
            src={offerData.logo}
            alt=""
            className="w-32 h-32 object-cover z-10 shadow-grey-950 shadow-xl absolute left-5 md:left-10 -bottom-12 border border-[var(--secondary-color)] "
          />
        </header>
        <h1 className="relative text-3xl ml-4 md:ml-10 md:mx-10 mt-16 font-bold text-[var(--primary-color)] inline-block">
          {offerData.title}
        </h1>
        <label className="peer text-[0] cursor-pointer">
          favoris
          <input type="checkbox" className="peer hidden" />
          <svg
            className="md:ml-0 ml-3 w-4 md:w-5 peer-checked:fill-[var(--primary-color)] peer-checked:animate-jump animate-once animate-duration-500 animate-ease-in-out animate-alternate inline-block -mt-4"
            width="23"
            height="29"
            viewBox="0 0 13 19"
            fill="#F9F9F9"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 3.92893C1 2.9037 1 2.39109 1.17128 1.99952C1.32193 1.65506 1.56233 1.37502 1.85802 1.19952C2.19416 1 2.6342 1 3.51429 1H9.48571C10.3658 1 10.8059 1 11.142 1.19952C11.4377 1.37502 11.6781 1.65506 11.8287 1.99952C12 2.39109 12 2.9037 12 3.92893V17.4752L6.5 12.8988L1 17.4752V3.92893Z"
              stroke="#CA2061"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        </label>
        <h2 className="text-2xl ml-4 md:ml-10 md:mx-10  font-bold text-[var(--secondary-color)]">
          {offerData.name}
        </h2>
        <ul className="ml-4 md:ml-10 gap-4 flex flex-row mt-4">
          {offerData.technos.map((techno) => (
            <li key={techno.name}>
              <Tag text={techno.name} apply="tag" />
            </li>
          ))}
        </ul>
        <ul className="mt-6 flex gap-4 ml-4 md:ml-10">
          <li>
            <Tag text={offerData.city} apply="tag" />
          </li>
          <li>
            <Tag text={offerData.type} apply="tag" />
          </li>
        </ul>
        <h2 className="text-3xl ml-4 md:ml-10 my-16 semi-bold text-[var(--primary-color)]">
          Description du poste
        </h2>
        <p className="md:mx-10 mx-4">{offerData.details}</p>
        <h2 className="text-3xl ml-4 md:ml-10 my-16 semi-bold text-[var(--primary-color)]">
          Avantages
        </h2>
        <p className="md:mx-10 mx-4">{offerData.advantages}</p>
        <h2 className="text-3xl ml-4 md:ml-10 my-16 semi-bold text-[var(--primary-color)]">
          Salaire
        </h2>
        <p className="md:mx-10 mx-4 mb-20">{offerData.salary} Euro/an.</p>
        <footer className="mb-20 flex flex-col items-center">
          {userData && userData.auth.role === "candidat" ? (
            <Link
              to={`/candidacy/${offerData.id}`}
              className="big text-center content-center"
            >
              POSTULER
            </Link>
          ) : (
            <button
              type="submit"
              onClick={handleDeleteOffer}
              className="big text-center content-center"
            >
              SUPPRIMER L'OFFRE
            </button>
          )}
        </footer>
      </article>
    </main>
  );
}

export default OfferDetails;
