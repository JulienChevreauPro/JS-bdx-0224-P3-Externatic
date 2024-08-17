// import { useContext, useState } from "react";
import PropTypes from "prop-types";

import Tag from "../tag/Tag";
// import { AuthContext } from "../../../contexts/AuthContext";
import { useModal } from "../../../contexts/ModalContext";
import AccessOfferDetailsCondition from "../../AccessOfferDetailsCondition";

export default function CardOfferForCandidate({ offer }) {
  // const { auth } = useContext(AuthContext);
  const { handleChangeModal } = useModal();
  // const [isFavorite, setIsFavorite] = useState(offer.is_favorite);

  // const handleCheckboxChange = async (e) => {
  //   const isChecked = e.target.checked;
  //   const url = `${import.meta.env.VITE_API_URL}/api/favorites`;
  //   const headers = {
  //     "Content-Type": "application/json",
  //   };
  //   const body = JSON.stringify({ candidateId: auth.id, offerId: offer.id });

    // try {
    //   let response;
    //   if (isChecked) {
    //     response = await fetch(url, {
    //       method: "POST",
    //       headers,
    //       body,
    //     });
    //   } else {
    //     response = await fetch(url, {
    //       method: "DELETE",
    //       headers,
    //       body,
    //     });
    //   }
    //   if (!response.ok)
    //     throw new Error(`HTTP error! status: ${response.status}`);
    //   setIsFavorite(isChecked);
    // } catch (err) {
    //   throw new Error("Error handling favorite", err);
    // }
  // };

  return (
    <article className="animate-fade-up animate-once animate-duration-700 animate-delay-200 animate-ease-in-out animate-alternate border border-[var(--primary-color)] rounded-md shadow-lg custom-shadow min-h-56 p-4 bg-[var(--secondary-background-color)] mb-4 max-w-md min-w-[18rem] md:min-w-md">
      <header className="flex justify-between items-center mb-4">
        <h3 className="text-[var(--primary-color)] max-md:text-lg">
          {offer.title}
        </h3>
        {/* {auth?.id && (
          <label className="peer text-[0] cursor-pointer">
            favoris
            <input
              type="checkbox"
              className="peer hidden"
              checked={isFavorite}
              onChange={handleCheckboxChange}
            />
            <svg
              className="peer-checked:fill-[var(--primary-color)] peer-checked:animate-jump animate-once animate-duration-500 animate-ease-in-out animate-alternate"
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
        )} */}
      </header>
      <ul className="flex gap-1 relative mb-4">
        {offer.technos.map((techno) => (
          <li key={techno.name}>
            <Tag text={techno.name} apply="tag" />
          </li>
        ))}
        <li className="absolute right-1">
          <Tag text={offer.city} apply="tag" />
        </li>
      </ul>
      <ul>
        <li className="mb-4">
          <Tag text={offer.type} apply="tag" />
        </li>
      </ul>
      <p className=" font-medium">{offer.company_name}</p>
      <p className="mb-4 max-md:text-sm line-clamp-2 overflow-hidden...">
        {offer.details}
      </p>
      <footer className="flex justify-center">
        <AccessOfferDetailsCondition
          offerId={offer.id}
          handleClick={handleChangeModal}
        />
      </footer>
    </article>
  );
}

CardOfferForCandidate.propTypes = {
  offer: PropTypes.shape({
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    details: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    salary: PropTypes.number.isRequired,
    company_name: PropTypes.string.isRequired,
    technos: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
    // is_favorite: PropTypes.bool.isRequired,
  }).isRequired,
};
