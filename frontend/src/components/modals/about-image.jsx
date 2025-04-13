"use client";

import { IoIosClose } from "react-icons/io";
import { useModal } from "@/context/modal-context";
import Image from "next/image";
import { CiBookmark } from "react-icons/ci";

import { GoShareAndroid } from "react-icons/go";

const AboutImageModal = () => {
  const { closeModal, activeModal, modalData } = useModal();

  if (activeModal !== "about") return null;

  return (
    <div
      className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={closeModal}
    >
      <div
        className="w-[938px] h-[831px] rounded-[16px] flex bg-white shadow-[0px_4px_40px_rgba(0,0,0,0.1)] relative transition-all "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid grid-cols-3 max-h-[831px] overflow-hidden items-center text-start">
          <div className="col-span-2">
            <Image
              src="/placeholder/2.png"
              alt="placeholder"
              width={555}
              height={938}
              className="h-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-8 -ms-6 text-[11px]">
            <div className="flex flex-col text-start text-black/60 gap-3">
              <span>coleção: Resort 23</span>
              <span>locação: Les Trois Vallées</span>
              <span>modelos:</span>
              <span>direção criativa: time FARM</span>
              <span>fotografia: Rafael Lucena</span>
              <span>assistente de fotografia: Daniel Sulima</span>
              <span>filme: Ariela Dorf e Caio Nigro</span>
              <span>styling: time FARM</span>
              <span>beleza: Cidoca Nogueira</span>
              <span>produção de set: Rodrigo (bombinha)</span>
              <span>produção executiva: 21 Sun production</span>
            </div>
            <div className="flex flex-wrap text-black/70 gap-1">
              <div className="px-4 rounded border  border-black/50 flex items-center justify-center">
                <span className="">flora</span>
              </div>
              <div className="px-4 rounded border  border-black/50 flex items-center justify-center">
                <span className="">natureza</span>
              </div>
              <div className="px-4 rounded border  border-black/50 flex items-center justify-center">
                <span className="">floresta</span>
              </div>
              <div className="px-4 rounded border  border-black/50 flex items-center justify-center">
                <span className="">esg</span>
              </div>
              <div className="px-4 rounded border  border-black/50 flex items-center justify-center">
                <span className="">brasil</span>
              </div>
              <div className="px-4 rounded border border-dashed border-black/50 flex items-center justify-center cursor-pointer">
                adicionar tag +{" "}
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <button className="flex justify-center items-center bg-black/85 rounded-[75px] w-[150px] h-[30px] text-white cursor-pointer text-[14px]">
                download
              </button>
              <button className="h-[30px] w-[30px] rounded-full border border-black/50 items-center flex justify-center cursor-pointer">
                <CiBookmark className="text-black/56 text-[20px]" />
              </button>

              <button className="h-[30px] w-[30px] rounded-full border border-black/50 items-center flex justify-center cursor-pointer">
                <GoShareAndroid className="text-black/56 text-[20px]" />
              </button>
            </div>
          </div>
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
