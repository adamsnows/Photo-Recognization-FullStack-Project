import Image from "next/image";
import GalleryCard from "../cards";

const GalleryGrid = () => {
  return (
    <div className="grid grid-cols-5 gap-x-[20px]">
      <GalleryCard url="/placeholder/1.png" description="criatividade" />
      <GalleryCard url="/placeholder/2.png" description="cultura" />
      <GalleryCard url="/placeholder/3.png" description="natureza" />
      <GalleryCard url="/placeholder/4.png" description="faminino" />
      <GalleryCard url="/placeholder/5.png" description="borogodo" />
    </div>
  );
};

export default GalleryGrid;
