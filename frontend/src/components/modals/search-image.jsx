"use client";

import { useState, useCallback } from "react";
import { IoIosClose } from "react-icons/io";
import { useModal } from "@/context/modal-context";
import { CiImageOn } from "react-icons/ci";
import { FiScissors } from "react-icons/fi";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Cropper from "react-easy-crop";
import Skeleton from "react-loading-skeleton";
import { IoIosInformationCircleOutline } from "react-icons/io";
import "react-loading-skeleton/dist/skeleton.css";
import { useImage } from "@/context/image-context";

const ImageSearchModal = () => {
  const { activeModal, closeModal } = useModal();
  const {
    preview,
    setCrop,
    setZoom,
    setShowCropper,
    handleDrop,
    handleFileChange,
    showCropper,
    handleExploreClick,
    crop,
    zoom,
    onCropComplete,
    setCropSize,
    handleCropClick,
    searchImageResults,
  } = useImage();

  if (activeModal !== "search") return null;

  return (
    <div
      className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={closeModal}
    >
      <div
        className={`${
          preview
            ? "w-[70%] max-w-[1280px] max-h-[690px]"
            : "w-[90%] lg:w-[690px] h-[420px]"
        } rounded-[16px] py-[20px] px-2 lg:px-[40px] flex bg-white shadow-[0px_4px_40px_rgba(0,0,0,0.1)] relative transition-all justify-center`}
        onClick={(e) => e.stopPropagation()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <IoIosClose
          className="text-black text-[42px] absolute z-1 right-0 top-0 cursor-pointer m-2"
          onClick={closeModal}
        />

        {!preview ? (
          <div className="w-full outline-[1px] outline-dashed rounded-[8px] flex flex-col items-center justify-center m-6">
            <span className="-mt-3 mb-4 lg:text-[24px]">
              Pesquise qualquer imagem
            </span>
            <div className="flex gap-2 mb-[31px]">
              <CiImageOn className="text-[40px]" />
              <span className="max-w-[275px] lg:text-[18px] text-start">
                Arraste uma imagem para cá ou
                <br />
                <label
                  htmlFor="fileInput"
                  className="text-[#669DF6] underline cursor-pointer"
                >
                  faça upload de um arquivo
                </label>
              </span>
            </div>
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              disabled
              className="w-full h-[45px] rounded-[120px] border max-w-[188px] cursor-not-allowed opacity-50"
            >
              pesquisar
            </button>
          </div>
        ) : (
          <div className="w-full flex-col lg:flex gap-4 lg:p-6 justify-center items-center">
            <div className="lg:w-[600px] lg:h-[600px] relative bg-gray-50 flex items-center justify-center rounded-[8px]">
              {showCropper ? (
                <Cropper
                  image={preview}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                  onCropSizeChange={setCropSize}
                  className="absolute top-0 left-0 w-full h-full z-20 rounded-[8px]"
                />
              ) : (
                <img
                  src={preview}
                  alt="Pré-visualização"
                  className="object-cover h-[300px] lg:w-full lg:h-full rounded-[8px] mb-2 lg:mb-0"
                />
              )}

              {showCropper ? (
                <>
                  <div className="absolute bottom-[105px] justify-center items-center flex flex-col gap-2 text-[12px] ms-2">
                    <div className="flex gap-2 items-center text-white text-[13px]">
                      <IoIosInformationCircleOutline /> Use o scroll do mouse
                      pra ajustar o recorte da imagem
                    </div>

                    <div
                      onClick={handleCropClick}
                      className="flex items-center justify-center gap-1 rounded-[4px] px-4 py-1 bg-white text-[#434343] z-10 cursor-pointer"
                    >
                      Recortar <FiScissors className="rotate-180 text-[16px]" />
                    </div>
                  </div>
                  <div
                    onClick={() => setShowCropper(false)}
                    className="flex items-center justify-center gap-1 rounded-[4px] px-4 py-1 bg-white text-[#434343] z-10 cursor-pointer absolute top-0 mt-18 text-[12px]"
                  >
                    Fechar
                  </div>
                </>
              ) : (
                <div className="absolute bottom-[50px] justify-center items-center flex flex-col gap-2 text-[12px]">
                  <div
                    onClick={handleExploreClick}
                    className="flex items-center justify-center gap-1 rounded-[4px] px-4 py-1 bg-white text-[#434343] z-10 cursor-pointer"
                  >
                    Explorar <FiScissors className="rotate-180 text-[16px]" />
                  </div>
                  <div className="flex items-center justify-center gap-2 rounded-[4px] px-4 py-1 bg-white text-[#434343] z-10 cursor-pointer">
                    Procurar imagem semelhante{" "}
                    <FaMagnifyingGlass className="text-[16px]" />
                  </div>
                </div>
              )}
            </div>

            <div className="lg:w-full lg:h-full overflow-y-auto lg:pe-2 text-center">
              <span className="lg:hidden text-[12px] text-black/50 ">
                Resultados da pesquisa
              </span>
              {searchImageResults?.similarPhoto ? (
                <div className="grid grid-cols-1 gap-2 h-full">
                  <div className=" h-full overflow-hidden relative">
                    <img
                      src={searchImageResults.similarPhoto.imageUrl}
                      alt={searchImageResults.similarPhoto.name}
                      className="h-[300px] lg:h-full object-cover rounded-[8px] mx-auto"
                    />
                  </div>
                </div>
              ) : (
                <>
                  <div className="hidden lg:grid grid-cols-1 lg:grid-cols-4 gap-2 h-full">
                    {[...Array(12)].map((_, i) => (
                      <Skeleton
                        key={i}
                        height={290}
                        baseColor="#e0e0e0"
                        highlightColor="#f0f0f0"
                        borderRadius={8}
                      />
                    ))}
                  </div>
                  <div className="grid grid-cols-1 gap-2 h-full lg:hidden">
                    {[...Array(1)].map((_, i) => (
                      <Skeleton
                        key={i}
                        height={290}
                        baseColor="#e0e0e0"
                        highlightColor="#f0f0f0"
                        borderRadius={8}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageSearchModal;
