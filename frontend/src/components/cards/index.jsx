"use client";

import { useModal } from "@/context/modal-context";
import Image from "next/image";

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
}) => {
  const { openModal } = useModal();

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

  return (
    <div className="relative h-[320px] w-full lg:w-[193px]">
      <Image
        src={url}
        priority
        width={193}
        height={320}
        alt="Photo"
        className="rounded-[18px] h-full w-full object-cover cursor-pointer"
        onClick={handleOpenAboutModal}
      />
      <div className="absolute w-full max-w-[142px] h-[32px] flex items-center justify-center z-1 bottom-0 left-1/2 right-1/2 -translate-x-1/2 rounded-[100px] bg-white mb-[30px] text-[#333333] lowercase">
        {collection}
      </div>
    </div>
  );
};

export default GalleryCard;
