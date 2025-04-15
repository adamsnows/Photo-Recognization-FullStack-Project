"use client";

import { useNavbar } from "@/context/navbar-context";
import { Menu, X } from "lucide-react";

const ClientNavbarToggle = () => {
  const { isMenuOpen, toggleMenu } = useNavbar();

  return (
    <button
      onClick={toggleMenu}
      className="text-text-primary inline-flex items-center justify-center active:enabled:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-50 transition-colors duration-200 rounded-md hover:enabled:text-gray-1000 focus-visible:ring-gray-900/30 me-3 text-primary h-auto w-auto p-0 sm:me-4 xl:hidden"
      type="button"
    >
      {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
    </button>
  );
};
export default ClientNavbarToggle;
