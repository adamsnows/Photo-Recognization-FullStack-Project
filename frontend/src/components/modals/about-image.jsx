"use client";

import { IoIosClose } from "react-icons/io";
import { useModal } from "@/context/modal-context";

const AboutImageModal = () => {
  const { closeModal, activeModal, modalData } = useModal();

  if (activeModal !== "about") return null;

  return (
    <div
      className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={closeModal}
    >
      <div
        className="w-[690px] h-[420px] rounded-[16px] py-[20px] px-[40px] flex bg-white shadow-[0px_4px_40px_rgba(0,0,0,0.1)] relative transition-all justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold">{modalData?.title}</h2>
          <p className="mt-4 text-lg text-center">{modalData?.description}</p>
        </div>

        <IoIosClose
          className="text-black text-[42px] absolute z-1 right-0 top-0 cursor-pointer m-2"
          onClick={closeModal}
        />
      </div>
    </div>
  );
};

export default AboutImageModal;
