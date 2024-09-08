import PropTypes from "prop-types";
import Button from "../buttons/Button";
import Tag from "../tag/Tag";
import phone from "../../../assets/images/phone.svg";
import email from "../../../assets/images/mail.svg";
import cv from "../../../assets/images/cv.svg";

export default function CardConsultant({ user }) {
  return (
    <article className="animate-fade-up animate-once animate-duration-700 animate-delay-200 animate-ease-in-out animate-alternate border border-[var(--primary-color)] rounded-md shadow-lg custom-shadow min-h-44 p-4 bg-[var(--secondary-background-color)] mb-4 max-w-md min-w-72 md:min-w-md ">
      <header className="flex justify-between items-center mb-4">
        <h3 className="text-[var(--primary-color)] max-md:text-lg">
          {user.firstname} {user.lastname}
        </h3>
        <Tag text="DISPONIBLE" apply="tagStatusGreen" />
      </header>
      <ul className="flex gap-1 relative mb-4">
        {user.technos.map((techno) => (
          <li key={techno.name}>
            <Tag text={techno.name} apply="tag" />
          </li>
        ))}
      </ul>
      <footer className="flex justify-center gap-4">
        <Button
          name={<a href={`tel:${user.phone}`}>Téléphone</a>}
          apply="bg-[var(--primary-color)] py-2 flex gap-3 px-2 rounded-md text-white content-center items-center"
          img={phone}
        />
        <Button
          name={<a href={`mailto:${user.email}`}>Email</a>}
          apply="bg-[var(--primary-color)] py-2 flex gap-3 px-2 rounded-md text-white content-center items-center"
          img={email}
        />
        <Button
          name={
            <a href={user.cv} download="Télécharger le CV du candidat">
              CV
            </a>
          }
          img={cv}
          apply="bg-[var(--primary-color)] py-2 flex gap-3 px-2 rounded-md text-white content-center items-center"
        />
      </footer>
    </article>
  );
}

CardConsultant.propTypes = {
  user: PropTypes.shape({
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    technos: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      })
    ),
    phone: PropTypes.string,
    email: PropTypes.string.isRequired,
    cv: PropTypes.string,
  }).isRequired,
};
