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
import "react-loading-skeleton/dist/skeleton.css"; // importa os estilos

const getCroppedImg = (imageSrc, crop, cropSize, rotation = 0) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const image = new Image();
  image.src = imageSrc;

  return new Promise((resolve) => {
    image.onload = () => {
      const { width, height } = cropSize;
      canvas.width = width;
      canvas.height = height;

      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((rotation * Math.PI) / 180); //
      ctx.drawImage(
        image,
        crop.x,
        crop.y,
        width,
        height,
        -width / 2,
        -height / 2,
        width,
        height
      );

      canvas.toBlob((blob) => {
        const fileUrl = URL.createObjectURL(blob);
        resolve(fileUrl);
      });
    };
  });
};

const ImageSearchModal = () => {
  const { isOpen, closeModal } = useModal();
  const [preview, setPreview] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [showCropper, setShowCropper] = useState(false);
  const [cropSize, setCropSize] = useState({ width: 375, height: 400 });
  const [isCropping, setIsCropping] = useState(false);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    console.log("Área cortada:", croppedAreaPixels);
  }, []);

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image")) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image")) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  const handleCropClick = async () => {
    if (isCropping && preview) {
      const croppedImageUrl = await getCroppedImg(preview, crop, cropSize);
      setPreview(croppedImageUrl);
      setShowCropper(false); // Desativa o cropper ao recortar
    }
  };

  const handleExploreClick = () => {
    setIsCropping(true); // Ativa o corte
    setShowCropper(true); // Exibe o cropper
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={closeModal}
    >
      <div
        className={`${
          preview
            ? "w-[70%] max-w-[1280px] max-h-[690px]"
            : "w-[690px] h-[370px]"
        } rounded-[16px] py-[20px] px-[40px] flex bg-white shadow-[0px_4px_40px_rgba(0,0,0,0.1)] relative transition-all justify-center`}
        onClick={(e) => e.stopPropagation()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <IoIosClose
          className="text-black text-[42px] absolute z-1 right-0 top-0 m-2 cursor-pointer"
          onClick={closeModal}
        />

        {!preview ? (
          <div className="w-full h-full outline-[1px] outline-dashed rounded-[8px] flex flex-col items-center justify-center">
            <span className="-mt-3 mb-4 text-[24px]">
              Pesquise qualquer imagem
            </span>
            <div className="flex gap-2 mb-[31px]">
              <CiImageOn className="text-[40px]" />
              <span className="max-w-[275px] text-[18px] text-center">
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
          <div className="w-full flex gap-4 p-6 justify-center items-center">
            <div className="w-1/2 h-full flex items-center justify-center bg-gray-50 rounded-[8px] relative">
              {showCropper ? (
                <Cropper
                  image={preview}
                  crop={crop}
                  zoom={zoom}
                  aspect={4 / 3}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                  minWidth={100}
                  zoomWithScroll
                  minHeight={100}
                  cropSize={cropSize}
                  onCropSizeChange={setCropSize}
                  className="absolute top-0 left-0 w-full h-full z-20 rounded-[8px]"
                />
              ) : (
                <img
                  src={preview}
                  alt="Pré-visualização"
                  className="h-full w-full max-w-[324px] object-contain rounded-[8px]"
                />
              )}

              {showCropper ? (
                <>
                  <div className="absolute bottom-[70px] justify-center items-center flex flex-col gap-2 text-[12px]">
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
                    onClick={() => setShowCropper(false)} // Fecha o cropper
                    className="flex items-center justify-center gap-1 rounded-[4px] px-4 py-1 bg-white text-[#434343] z-10 cursor-pointer absolute top-0 mt-18 text-[12px]"
                  >
                    Fechar
                  </div>
                </>
              ) : (
                <div className="absolute bottom-[120px] justify-center items-center flex flex-col gap-2 text-[12px]">
                  <div
                    onClick={handleExploreClick} // Ativa o cropper ao clicar
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

            <div className="w-full h-full overflow-y-auto pe-2">
              <div className="grid grid-cols-4 gap-2 h-full">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="w-full h-[272px]">
                    <Skeleton
                      height={272}
                      baseColor="#e0e0e0"
                      highlightColor="#f0f0f0"
                      borderRadius={8}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageSearchModal;
