"use client";

import { X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useNavbar } from "@/context/navbar-context";
import { routes } from "@/components/sidebar/routes";
import SidebarItem from "@/components/sidebar/sidebar-item";

const NavbarMobile = () => {
  const { isMenuOpen, toggleMenu } = useNavbar();

  return (
    <div
      className={`fixed inset-0 z-50 bg-white transition-transform duration-300 overflow-x-scroll ${
        isMenuOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center p-4 border-b border-border-secondary">
        <div>
          <Link href="/dashboard" className="flex w-full">
            <Image
              src={"/images/logo.png"}
              alt="Logo Pronttus"
              width={220}
              height={40}
            />
          </Link>
        </div>
        <button onClick={toggleMenu} className="text-text-primary">
          <X size={24} />
        </button>
      </div>
      <ul className="p-4 flex flex-col gap-4">
        {routes.map((route) =>
          route.items.map((item) => (
            <SidebarItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              path={item.path}
            />
          ))
        )}
      </ul>
    </div>
  );
};

export default NavbarMobile;
