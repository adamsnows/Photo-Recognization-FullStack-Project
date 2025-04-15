"use client";

import { useModal } from "@/context/modal-context";
import { useSearch } from "@/context/search-context";
import { Trash2 } from "lucide-react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { toast } from "react-toastify";

const GalleryCard = ({
  id,
  url,
  collection,
  name,
  location,
  models,
  creativeDirection,
  photography,
  photographyAssistant,
  film,
  styling,
  beauty,
  setProduction,
  executiveProduction,
  hasDelete,
}) => {
  const { openModal } = useModal();
  const { handleDeletePhoto } = useSearch();

  const handleOpenAboutModal = () => {
    const imageData = {
      id,
      name,
      collection,
      location,
      models,
      creativeDirection,
      photography,
      photographyAssistant,
      film,
      styling,
      beauty,
      setProduction,
      executiveProduction,
      imageUrl: url,
    };

    openModal("about", imageData);
  };

  const handleDelete = () => {
    confirmAlert({
      title: "Confirmar exclusão",
      message: "Você tem certeza que deseja excluir esta foto?",
      buttons: [
        {
          label: "Sim",
          onClick: () => {
            handleDeletePhoto(id);
            toast("Imagem excluída com sucesso!", {
              type: "success",
            });
          },
        },
        {
          label: "Não",
          onClick: () => console.log("Exclusão cancelada"),
        },
      ],
    });
  };

  return (
    <div className="relative h-[320px] w-full lg:w-[193px]">
      {hasDelete && (
        <div
          className="absolute top-2 right-2 z-10 bg-white rounded-full p-1 shadow-xl drop-shadow-xl cursor-pointer"
          onClick={handleDelete}
        >
          <Trash2 className="h-4 w-4 text-black" />
        </div>
      )}
      <img
        src={`https://photos-api-434732873433.us-central1.run.app/images/${id}`}
        alt="Photo"
        className="rounded-[18px] h-full w-full object-cover cursor-pointer drop-shadow-md shadow-md"
        onClick={handleOpenAboutModal}
      />
      <div className="absolute w-full max-w-[142px] h-[32px] flex items-center justify-center z-1 bottom-0 left-1/2 right-1/2 -translate-x-1/2 rounded-[100px] bg-white mb-[30px] text-[#333333] lowercase">
        {collection}
      </div>
    </div>
  );
};

export default GalleryCard;
