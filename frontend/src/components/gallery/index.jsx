"use client";

import { useSearch } from "@/context/search-context";
import GalleryCard from "../cards";
import Skeleton from "react-loading-skeleton";

const GalleryGrid = ({ gridStyle }) => {
  const { photos, loading } = useSearch();

  if (loading) {
    return (
      <div className="grid #{gridStyle ? gridStyle : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:[grid-template-columns:repeat(auto-fit,minmax(200px,1fr))]'} gap-[20px] ">
        {Array(10)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className="relative h-[320px] w-full lg:w-[193px] rounded-[18px]"
            >
              <Skeleton height="100%" width="100%" className="rounded-[18px]" />
            </div>
          ))}
      </div>
    );
  }

  if (photos.length === 0) {
    return (
      <div className="flex text-center">
        <span className="text-gray-600 min-h-[400px]">
          Nenhuma imagem disponível de acordo com sua pesquisa
        </span>
      </div>
    );
  }

  return (
    <div
      className={`grid ${
        gridStyle
          ? gridStyle
          : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
      } gap-[20px] w-full px-10 lg:w-auto lg:px-0`}
    >
      {(gridStyle ? photos : photos.slice(0, 10)).map((photo) => (
        <GalleryCard
          key={photo.id}
          url={photo.imageUrl}
          collection={photo.collection}
          hasDelete={gridStyle}
          {...photo}
        />
      ))}
    </div>
  );
};

export default GalleryGrid;
