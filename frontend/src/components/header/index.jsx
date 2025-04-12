import Image from "next/image";
import { TbMenu } from "react-icons/tb";

const Header = () => {
  return (
    <div className="px-[56px]  h-[66px] w-full flex items-center justify-between">
      <Image
        src="/logo/mini-logo.png"
        width={"127"}
        height={"18"}
        alt="FARMRIO Logo"
      />
      <div className="flex items-center gap-2">
        <Image
          src={"/logo/rio-pet.png"}
          width={"34"}
          height={"28"}
          alt="FARMRIO pet LOGO"
        />
        <TbMenu className="text-[46px]" />
      </div>
    </div>
  );
};

export default Header;
