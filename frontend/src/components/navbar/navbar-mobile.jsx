"use client";

import { LogOutIcon, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useNavbar } from "@/context/navbar-context";
import { routes } from "@/components/sidebar/routes";
import SidebarItem from "@/components/sidebar/sidebar-item";
import { Button } from "@/ui/button";

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
      <ul className="p-4 px-0 flex flex-col gap-4 border-b border-black/30 mx-4">
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
      <div className="flex items-center gap-4 group hover:bg-sidebar-gradient hover:text-white rounded-lg cursor-pointer shadow-md drop-shadow mx-3 mt-4 py-1">
        <Button variant="ghost" size="icon" className="cursor-pointer ms-3">
          <LogOutIcon className="w-16" color="gray" />
        </Button>
        <span className="ms-2 text-black/50">Logout</span>
      </div>
    </div>
  );
};

export default NavbarMobile;
