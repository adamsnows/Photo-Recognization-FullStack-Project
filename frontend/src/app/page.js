import GalleryGrid from "@/components/gallery";
import Header from "@/components/header";
import ImageSearchModal from "@/components/modals/about-image";
import Search from "@/components/search";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-66px)] flex flex-col">
      <Header />
      <div className="flex flex-1 items-center justify-center flex-col">
        <div className="my-8">
          <Search />
        </div>
        <GalleryGrid />
      </div>
    </div>
  );
}
