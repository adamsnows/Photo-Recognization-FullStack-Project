"use client";

import Image from "next/image";
import { LogOutIcon } from "lucide-react";
import { Button } from "@/ui/button";
import SidebarItem from "@/components/sidebar/sidebar-item";
import { routes } from "@/components/sidebar/routes";

export function Sidebar() {
  return (
    <aside className="hidden w-[100px] sticky xl:block min-w-[100px] lg:flex flex-col justify-between	bg-white px-2 py-4 h-dvh drop-shadow shadow z-99 top-0">
      <div>
        <div className="flex items-center justify-center mt-4">
          <img src="/logo/black-logo.png" alt="logo" />
        </div>

        <div className="flex flex-col items-center justify-center">
          {routes.map((group) => (
            <div key={group.group} className="group">
              <nav className="flex flex-col items-center justify-center gap-4 mt-10">
                {group.items.map((item) => (
                  <SidebarItem
                    key={item.id}
                    icon={item.icon}
                    label={item.label}
                    path={item.path}
                  />
                ))}
              </nav>
            </div>
          ))}
        </div>

        <div className="border-b border-black/10" />
      </div>

      <div className="flex flex-col items-center justify-center">
        <Button variant="ghost" size="icon" className="cursor-pointer">
          <LogOutIcon className="w-4 h-4" color="gray" />
        </Button>
      </div>
    </aside>
  );
}
