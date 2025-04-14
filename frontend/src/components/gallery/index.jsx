"use client";

import { useSearch } from "@/context/search-context";
import GalleryCard from "../cards";
import Skeleton from "react-loading-skeleton";

const GalleryGrid = () => {
  const { photos, loading } = useSearch();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-[20px]">
      {loading
        ? Array(10)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="relative h-[320px] w-[193px]  rounded-[18px]"
              >
                <Skeleton
                  height="100%"
                  width="100%"
                  className="rounded-[18px]"
                />
              </div>
            ))
        : photos
            .slice(0, 10)
            .map((photo) => (
              <GalleryCard
                key={photo.id}
                url={photo.imageUrl}
                collection={photo.collection}
                {...photo}
              />
            ))}
    </div>
  );
};

export default GalleryGrid;
