import PropTypes from "prop-types";
import { useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import useLogicForm from "../services/useLogicForm";
import { useModal } from "../contexts/ModalContext";
import externatic from "../assets/Externatic.svg";
import menuBurger from "../assets/images/menuBurger.svg";
import cross from "../assets/images/cross-svgrepo-com.svg";
import NavAccess from "../services/NavAccess";
import Button from "./atomic/buttons/Button";
import ModalRegistration from "./ModalRegistration";
import ProfilCondition from "./ProfilCondition";

function Navbar({ handleChangeNav, isNavOpen, isNavVisible }) {
  const userData = useContext(AuthContext);

  const menuRef = useRef(null);
  const { handleChangeModal, setIsClicked } = useModal();

  const {
    formData,
    handleChange,
    handleSubmitRegistration,
    handleSubmitLogin,
  } = useLogicForm();

  const handleClick = () => {
    handleChangeNav();
    handleChangeModal();
  };

  const handleClickConnexion = () => {
    handleChangeNav();
    handleChangeModal();
    setTimeout(() => {
      setIsClicked(true);
    }, 1);
  };

  useEffect(() => {
    if (menuRef.current) {
      const navAccessKeyboard = new NavAccess(menuRef);
      navAccessKeyboard.addEventListener();

      return () => {
        navAccessKeyboard.removeEventListener();
      };
    }
    return () => {};
  }, [menuRef]);

  return (
    <>
      <ModalRegistration
        formData={formData}
        handleChange={handleChange}
        handleSubmitRegistration={handleSubmitRegistration}
        handleSubmitLogin={handleSubmitLogin}
      />
      <button
        type="button"
        className="block absolute left-5 top-5 md:hidden"
        onClick={handleChangeNav}
      >
        <img src={menuBurger} alt="ouvrir le menu" />
      </button>
      <Link
        to="/"
        className="absolute min-w-6 max-w-10 top-3 left-1/2 transform -translate-x-1/2 md:z-30 md:left-6 md:top-4 md:min-w-10 md:max-w-24 md:ml-6 md:flex md:items-center"
      >
        <img src={externatic} alt="retourner à la page d'accueil" />
      </Link>
      <nav
        ref={menuRef}
        className={`${isNavOpen} ${isNavVisible}
          md:min-h-20 md:min-w-full md:bg-[var(--secondary-background-color)] md:translate-x-0 md:flex`}
      >
        <Button
          name="fermer le menu"
          img={cross}
          buttonAnimate={false}
          apply="navCross"
          handleChange={handleChangeNav}
        />
        <ul
          className="text-[var(--primary-background-color)] text-lg flex flex-col gap-8 text-center mt-20
        md:flex-row md:gap-10 md:ml-auto md:mr-6 md:text-[var(--text-color)] md:self-center md:mt-0 items-center"
        >
          <li>
            <Link to="/" onClick={handleChangeNav}>
              Accueil
            </Link>
          </li>
          <li>
            <Link to="/offers" onClick={handleChangeNav}>
              Rechercher
            </Link>
          </li>
          <li>
            <ProfilCondition
              handleChangeNav={handleChangeNav}
              handleClick={handleClick}
              userData={userData}
            />
          </li>
          {userData.auth && userData.auth.id && userData.auth.role ? (
            <li>
              <img
                className="self-center max-w-10 rounded-full"
                src={userData.auth.picture || "https://picsum.photos/200"}
                alt="profil connecté"
              />
            </li>
          ) : (
            <>
              <li>
                <Button
                  type="button"
                  apply="register"
                  name="S'inscrire"
                  handleChange={handleClick}
                />
              </li>
              <li>
                <Button
                  type="button"
                  name="Se connecter"
                  apply="basic"
                  buttonAnimate={false}
                  handleChange={handleClickConnexion}
                />
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
}

Navbar.propTypes = {
  handleChangeNav: PropTypes.func.isRequired,
  isNavOpen: PropTypes.string.isRequired,
  isNavVisible: PropTypes.string.isRequired,
};

export default Navbar;
