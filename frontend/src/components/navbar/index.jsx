import Menu from "@/components/navbar/menu";
import ClientNavbarToggle from "@/components/navbar/navbar-client";
import NavbarMobile from "@/components/navbar/navbar-mobile";

const Navbar = () => {
  return (
    <>
      <header className="sticky top-0  flex items-center px-4 py-2 bg-white md:px-5 lg:px-10 2xl:py-5 3xl:px-8 4xl:px-10 w-full drop-shadow z-999 backdrop-blur">
        <div className="flex w-full max-w-2xl items-center">
          <ClientNavbarToggle />
        </div>

        <div className="flex w-full items-center justify-end gap-4 md:gap-10">
          <div className="items-center gap-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Menu />
              </div>
            </div>
          </div>
        </div>
      </header>

      <NavbarMobile />
    </>
  );
};

export default Navbar;
