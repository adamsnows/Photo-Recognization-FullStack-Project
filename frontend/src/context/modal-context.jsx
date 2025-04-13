"use client";

import { createContext, useContext, useState } from "react";

const ModalContext = createContext({
  isOpen: false,
  activeModal: null,
  modalData: null,
  openModal: (modalType, modalData) => {},
  closeModal: () => {},
});

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [modalData, setModalData] = useState(null); // Armazenar dados do modal

  const openModal = (modalType, modalData = null) => {
    setActiveModal(modalType);
    setModalData(modalData); // Armazena os dados do modal
    setIsOpen(true);
  };

  const closeModal = () => {
    setActiveModal(null);
    setModalData(null); // Limpa os dados ao fechar
    setIsOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{ isOpen, activeModal, modalData, openModal, closeModal }}
    >
      {children}
    </ModalContext.Provider>
  );
};
