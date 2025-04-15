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
  const [searchImageResults, setSearchImageResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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

    if (selectedFile && selectedFile.type.startsWith("image")) {
      const formData = new FormData();
      formData.append("image", selectedFile);

      const url = URL.createObjectURL(selectedFile);
      setPreview(url);
      setIsLoading(true);

      api
        .post("/search-by-image", formData)
        .then((response) => {
          console.log("💬 Dados recebidos:", response.data);
          setSearchImageResults(response.data);
        })
        .catch((error) => {
          console.error("Erro ao buscar imagem semelhante:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const handleCropAndSearch = async () => {
    if (isCropping && preview && croppedPixels) {
      setSearchImageResults([]);
      const croppedImageUrl = await getCroppedImg(preview, croppedPixels, zoom);
      setPreview(croppedImageUrl);

      const response = await fetch(croppedImageUrl);
      const blob = await response.blob();
      const croppedFile = new File([blob], "cropped-image.jpg", {
        type: "image/jpeg",
      });

      const formData = new FormData();
      formData.append("image", croppedFile);

      setShowCropper(false);
      setIsLoading(true);

      try {
        const result = await api.post("/search-by-image", formData);
        console.log("💬 Dados recebidos:", result.data);
        setSearchImageResults(result.data);
      } catch (error) {
        console.error("Erro ao buscar imagem semelhante:", error);
      } finally {
        setIsLoading(false);
      }
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
    isLoading,
    handleFileChange,
    handleCropAndSearch,
    handleExploreClick,
    searchResults,
    searchImageResults,
  };

  return (
    <ImageContext.Provider value={value}>{children}</ImageContext.Provider>
  );
};
