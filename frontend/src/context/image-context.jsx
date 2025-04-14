"use client";

import api from "@/lib/api";
import { createContext, useContext, useState, useCallback } from "react";

const ImageContext = createContext();

export const useImage = () => {
  return useContext(ImageContext);
};

export const ImageProvider = ({ children }) => {
  const [preview, setPreview] = useState(null);
  const [croppedPixels, setCroppedPixels] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [showCropper, setShowCropper] = useState(false);
  const [cropSize, setCropSize] = useState({ width: 375, height: 400 });
  const [isCropping, setIsCropping] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const [file, setFile] = useState(null);

  const searchByImageFile = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await api.post("/search-by-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSearchResults(res.data);
    } catch (err) {
      console.error("Erro ao buscar imagem semelhante:", err);
    }
  };

  const getCroppedImg = (imageSrc, croppedAreaPixels, zoom = 1) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const image = new Image();
    image.src = imageSrc;

    return new Promise((resolve) => {
      image.onload = () => {
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;

        const { width, height, x, y } = croppedAreaPixels;
        const scaledWidth = width * scaleX;
        const scaledHeight = height * scaleY;

        canvas.width = width;
        canvas.height = height;

        ctx.drawImage(
          image,
          x * scaleX,
          y * scaleY,
          scaledWidth,
          scaledHeight,
          0,
          0,
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

  const resizeImage = (url, maxWidth) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = url;

      img.onload = () => {
        const scale = maxWidth / img.width;
        const width = maxWidth;
        const height = img.height * scale;

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");

        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob((blob) => {
          const fileUrl = URL.createObjectURL(blob);
          resolve(fileUrl);
        });
      };
    });
  };

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedPixels(croppedAreaPixels);
  }, []);

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image")) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      searchByImageFile(file);
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0];
    console.log(selectedFile);
    if (selectedFile && selectedFile.type.startsWith("image")) {
      const formData = new FormData();
      formData.append("image", selectedFile);

      const url = URL.createObjectURL(selectedFile);
      setPreview(url);

      api
        .post("/search-by-image", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log("Resultado:", response.data);
        })
        .catch((error) => {
          console.error("Erro ao buscar imagem semelhante:", error);
        });
    }
  };

  const handleCropClick = async () => {
    if (isCropping && preview && croppedPixels) {
      const croppedImageUrl = await getCroppedImg(preview, croppedPixels, zoom);
      setPreview(croppedImageUrl);
      setShowCropper(false);
    }
  };

  const handleExploreClick = async () => {
    setIsCropping(true);
    const resizedImage = await resizeImage(preview, 1024);
    setPreview(resizedImage);
    setShowCropper(true);
  };

  const value = {
    file,
    getCroppedImg,
    preview,
    setPreview,
    croppedPixels,
    setCroppedPixels,
    crop,
    setCrop,
    zoom,
    setZoom,
    showCropper,
    setShowCropper,
    cropSize,
    setCropSize,
    isCropping,
    setIsCropping,
    onCropComplete,
    handleDrop,
    handleFileChange,
    handleCropClick,
    handleExploreClick,
    searchResults,
  };

  return (
    <ImageContext.Provider value={value}>{children}</ImageContext.Provider>
  );
};
