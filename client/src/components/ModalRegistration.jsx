import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
// import { ToastContainer } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
import { useModal } from "../contexts/ModalContext";

import NavAccess from "../services/NavAccess";
import TitleModal from "./atomic/modalElements/TitleModal";
import FormModal from "./atomic/modalElements/FormModal";

function ModalRegistration({
  formData,
  handleSubmitRegistration,
  handleSubmitLogin,
  handleChange,
}) {
  const modalRef = useRef(null);
  const { handleChangeModal, isModalOpen, isModalVisible } = useModal();

  useEffect(() => {
    if (modalRef.current) {
      const navAccessKeyboard = new NavAccess(modalRef);
      navAccessKeyboard.addEventListener();

      return () => {
        navAccessKeyboard.removeEventListener();
      };
    }
    return () => {};
  }, [modalRef]);

  return (
    <dialog
      ref={modalRef}
      className={` ${isModalOpen} ${isModalVisible} absolute top-0 bg-[var(--primary-background-color)] z-40 pb-16 flex flex-col items-center mt-6 border border-[var(--primary-color)] rounded-md shadow-lg custom-shadow md:mx-0 mx-auto md:w-[80vh] left-1/2 transform -translate-x-1/2`}
    >
      <header className="mb-10">
        <button
          type="button"
          aria-label="Fermer la modal"
          className="w-10 block absolute right-1 top-1 mr-5"
          onClick={handleChangeModal}
        >
          <svg
            width="50px"
            height="50px"
            viewBox="0 -0.5 25 25"
            fill="#010101"
            xmlns="http://www.w3.org/2000/svg"
            stroke="none"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0" />

            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <g id="SVGRepo_iconCarrier">
              <path
                d="M6.96967 16.4697C6.67678 16.7626 6.67678 17.2374 6.96967 17.5303C7.26256 17.8232 7.73744 17.8232 8.03033 17.5303L6.96967 16.4697ZM13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697L13.0303 12.5303ZM11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303L11.9697 11.4697ZM18.0303 7.53033C18.3232 7.23744 18.3232 6.76256 18.0303 6.46967C17.7374 6.17678 17.2626 6.17678 16.9697 6.46967L18.0303 7.53033ZM13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303L13.0303 11.4697ZM16.9697 17.5303C17.2626 17.8232 17.7374 17.8232 18.0303 17.5303C18.3232 17.2374 18.3232 16.7626 18.0303 16.4697L16.9697 17.5303ZM11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697L11.9697 12.5303ZM8.03033 6.46967C7.73744 6.17678 7.26256 6.17678 6.96967 6.46967C6.67678 6.76256 6.67678 7.23744 6.96967 7.53033L8.03033 6.46967ZM8.03033 17.5303L13.0303 12.5303L11.9697 11.4697L6.96967 16.4697L8.03033 17.5303ZM13.0303 12.5303L18.0303 7.53033L16.9697 6.46967L11.9697 11.4697L13.0303 12.5303ZM11.9697 12.5303L16.9697 17.5303L18.0303 16.4697L13.0303 11.4697L11.9697 12.5303ZM13.0303 11.4697L8.03033 6.46967L6.96967 7.53033L11.9697 12.5303L13.0303 11.4697Z"
                fill="#010101"
              />
            </g>
          </svg>
        </button>
        <TitleModal />
      </header>
      <FormModal
        formData={formData}
        handleChange={handleChange}
        handleSubmitLogin={handleSubmitLogin}
        handleSubmitRegistration={handleSubmitRegistration}
      />
      {/* <ToastContainer/> */}
    </dialog>
  );
}

ModalRegistration.propTypes = {
  formData: PropTypes.shape({
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }).isRequired,
  handleSubmitRegistration: PropTypes.func.isRequired,
  handleSubmitLogin: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default ModalRegistration;
