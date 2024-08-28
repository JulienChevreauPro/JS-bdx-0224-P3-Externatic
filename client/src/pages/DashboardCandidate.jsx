/* eslint-disable import/no-unresolved */
import { useLoaderData, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Keyboard, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import FileUpload from "../components/atomic/FileUpload";
import Tag from "../components/atomic/tag/Tag";
import Button from "../components/atomic/buttons/Button";
import CardOfferForCandidate from "../components/atomic/card/CardOfferForCandidate";
import { AuthContext } from "../contexts/AuthContext";
import FormInputCandidat from "../components/atomic/inputCandidat/formCandidat/FormInputCandidat";
import ButtonSubmit from "../components/atomic/buttons/ButtonSubmit";

import "../../index.css";
import Reload from "../services/reload";
import useDashboardCandidateService from "../services/candidateService";

function DashboardCandidate() {
  const { logout } = useContext(AuthContext);
  const data = useLoaderData();
  const navigate = useNavigate();

  const {
    favorites,
    formData,
    isEditing,
    setIsEditing,
    handleChange,
    handleSubmit,
    handleDeleteAccount,
  } = useDashboardCandidateService(data, logout, navigate, Reload);

  return (
    <main>
      <article className="p-5 md:pl-40 md:pr-40 flex flex-col">
        <header className="mt-10 text-md flex flex-col-reverse items-center gap-5 md:flex-row md:gap-16 md:justify-between ">
          <ul>
            <li>
              <h1 className=" text-[var(--primary-color)] mb-5">
                {data.firstname} {data.lastname}
              </h1>
            </li>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              {isEditing ? (
                <>
                  <FormInputCandidat
                    handleChange={handleChange}
                    value={formData.email}
                    id="email"
                    label="Mail"
                    type="email"
                    name="email"
                    autocomplete="on"
                  />
                  <FormInputCandidat
                    handleChange={handleChange}
                    value={formData.phone}
                    id="phone"
                    label="Tel"
                    type="text"
                    name="phone"
                    autocomplete="on"
                  />
                  <ButtonSubmit
                    apply="big"
                    name="Mettre à jour"
                    onClick={() => setIsEditing(false)}
                  />
                </>
              ) : (
                <>
                  <li>Mail: {formData.email}</li>
                  <li>Tel: {formData.phone}</li>
                  <Button
                    type="button"
                    apply="small"
                    name="Modifier"
                    handleChange={() => setIsEditing(true)}
                  />
                </>
              )}
            </form>
          </ul>
          <img
            src={data.picture || "https://picsum.photos/200"}
            alt=""
            className="md:w-2/12 w-1/2 rounded-full"
          />
        </header>
        <FileUpload />
        <h2 className="text-[var(--primary-color)] pb-3">Mes compétences</h2>
        <ul className="flex flex-wrap gap-5">
          {data.technos && data.technos.length > 0 ? (
            data.technos.map((techno) => (
              <li className="list-none" key={techno.id}>
                <Tag text={techno.name} apply="tag" />
              </li>
            ))
          ) : (
            <li className="list-none">Pas de compétences sélectionnées</li>
          )}
        </ul>
        <h2 className="text-[var(--primary-color)] pb-3 pt-10">Mes favoris</h2>
        <ul className="flex flex-wrap gap-5">
          {favorites.length === 1 ? (
            <li key={favorites[0].id}>
              <CardOfferForCandidate offer={favorites[0]} />
            </li>
          ) : (
            <Swiper
              slidesPerView="1"
              spaceBetween={10}
              keyboard={{
                enabled: true,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 30,
                },
              }}
              pagination={{
                clickable: true,
              }}
              navigation
              modules={[Keyboard, Pagination, Navigation]}
              className="mySwiper"
            >
              {favorites.length > 0 ? (
                favorites.map((offer) => (
                  <SwiperSlide key={offer.id}>
                    <li key={offer.id}>
                      <CardOfferForCandidate offer={offer} />
                    </li>
                  </SwiperSlide>
                ))
              ) : (
                <li className="list-none">Pas de favoris sélectionnés</li>
              )}
            </Swiper>
          )}
        </ul>
      </article>
      <footer className="flex flex-col items-center gap-5 p-10">
        <Button
          type="button"
          apply="big"
          name="Déconnexion"
          handleChange={logout}
        />
        <Button
          type="button"
          apply="bigDelete"
          name="Supprimer mon compte"
          handleChange={handleDeleteAccount}
        />
      </footer>
    </main>
  );
}

export default DashboardCandidate;