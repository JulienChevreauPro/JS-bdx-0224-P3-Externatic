import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import PropTypes from "prop-types";

export const Modal = createContext();

export function ModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleChangeModal = useCallback(() => {
    setIsVisible(true);
    if (isVisible) {
      setTimeout(() => {
        setIsVisible(false);
      }, 500);
    }
    setTimeout(() => {
      setIsOpen(!isOpen);
      setIsClicked(false);
    }, 1);
  }, [isVisible, isOpen]);
  
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

  const handleClickModal = useCallback(() => {
    setIsClicked(!isClicked);
  }, [isClicked]);

  const isModalOpen = isOpen ? "modalOpen" : "modalNotOpen";
  const isModalVisible = isVisible ? "block" : "hidden";

  const contextValue = useMemo(
    () => ({
      isVisible,
      setIsVisible,
      isOpen,
      setIsOpen,
      isModalOpen,
      isModalVisible,
      handleChangeModal,
      handleClickModal,
      isClicked,
      setIsClicked,
    }),
    [
      isVisible,
      isOpen,
      isModalOpen,
      isModalVisible,
      handleChangeModal,
      handleClickModal,
      isClicked,
      setIsClicked,
    ]
  );
  return <Modal.Provider value={contextValue}>{children}</Modal.Provider>;
}
ModalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useModal = () => useContext(Modal);
