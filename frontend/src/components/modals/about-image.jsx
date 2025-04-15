"use client";

import { IoIosClose } from "react-icons/io";
import { useModal } from "@/context/modal-context";
import Image from "next/image";
import { CiBookmark } from "react-icons/ci";
import { GoShareAndroid } from "react-icons/go";
import Skeleton from "react-loading-skeleton";

const AboutImageModal = () => {
  const { closeModal, activeModal, modalData } = useModal();
  const isLoading = !modalData;

  if (activeModal !== "about") return null;

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = modalData.imageUrl;
    link.download = modalData.name || "image";
    link.target = "_blank";
    link.click();
  };

  return (
    <div
      className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={closeModal}
    >
      <div
        className="w-[90%] max-h-[90%] lg:w-[938px] rounded-[16px] flex bg-white shadow-[0px_4px_40px_rgba(0,0,0,0.1)] relative transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 overflow-hidden items-center text-start">
          <div className="col-span-1 lg:col-span-2">
            {isLoading ? (
              <Skeleton height="100%" width="100%" />
            ) : (
              <div className="h-[350px] overflow-hidden">
                <img
                  src={`https://photos-api-434732873433.us-central1.run.app/images/${modalData.id}`}
                  alt={modalData.name}
                  className="h-[100%] w-full object-cover object-center rounded-t-2xl"
                />
              </div>
            )}
          </div>

          <div className="flex flex-col gap-8 p-2 lg:-ms-6 text-[11px]">
            <div className="flex flex-col text-start text-black/60 lg:gap-3">
              {isLoading ? (
                <>
                  <Skeleton width={200} />
                  <Skeleton width={200} />
                  <Skeleton width={200} />
                  <Skeleton width={200} />
                  <Skeleton width={200} />
                  <Skeleton width={200} />
                  <Skeleton width={200} />
                  <Skeleton width={200} />
                  <Skeleton width={200} />
                  <Skeleton width={200} />
                  <Skeleton width={200} />
                </>
              ) : (
                <>
                  <span>coleção: {modalData.collection}</span>
                  <span>locação: {modalData.location}</span>
                  <span>modelos: {modalData.models}</span>
                  <span>direção criativa: {modalData.creativeDirection}</span>
                  <span>fotografia: {modalData.photography}</span>
                  <span>
                    assistente de fotografia: {modalData.photographyAssistant}
                  </span>
                  <span>filme: {modalData.film}</span>
                  <span>styling: {modalData.styling}</span>
                  <span>beleza: {modalData.beauty}</span>
                  <span>produção de set: {modalData.setProduction}</span>
                  <span>
                    produção executiva: {modalData.executiveProduction}
                  </span>
                </>
              )}
            </div>

            <div className="flex flex-wrap text-black/70 gap-1">
              {isLoading ? (
                <Skeleton count={5} width={100} />
              ) : (
                <>
                  <div className="px-4 rounded border border-black/50 flex items-center justify-center">
                    <span>flora</span>
                  </div>
                  <div className="px-4 rounded border border-black/50 flex items-center justify-center">
                    <span>natureza</span>
                  </div>
                  <div className="px-4 rounded border border-black/50 flex items-center justify-center">
                    <span>floresta</span>
                  </div>
                  <div className="px-4 rounded border border-black/50 flex items-center justify-center">
                    <span>esg</span>
                  </div>
                  <div className="px-4 rounded border border-black/50 flex items-center justify-center">
                    <span>brasil</span>
                  </div>
                  <div className="px-4 rounded border border-dashed border-black/50 flex items-center justify-center cursor-pointer">
                    adicionar tag +
                  </div>
                </>
              )}
            </div>

            <div className="flex gap-2 items-center">
              <button
                className="flex justify-center items-center bg-black/85 rounded-[75px] w-[150px] h-[30px] text-white cursor-pointer text-[14px]"
                onClick={handleDownload}
              >
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
          className="text-white shadow-2xl drop-shadow-2xl  lg:text-black text-[42px] absolute z-1 right-0 top-0 cursor-pointer m-2"
          onClick={closeModal}
        />
      </div>
    </div>
  );
};

export default AboutImageModal;
