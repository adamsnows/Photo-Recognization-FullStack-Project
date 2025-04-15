"use client";

import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { LogOut, User } from "lucide-react";
import { signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";
import Link from "next/link";

const Menu = () => {
  const handleLogout = async () => {
    console.log("logout");
  };

  return (
    <DropdownMenu className=" z-9999">
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer">
          <Avatar>
            <AvatarImage src="/placeholder/adam.png" />
            <AvatarFallback>...</AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-black/10 relative z-9999">
        <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/dashboard/profile">
            <DropdownMenuItem className="flex gap-1 items-center p-1 hover:cursor-pointer hover:text-text-primary">
              <User className="mr-2 h-4 w-4" />
              <span>Meu perfil</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex gap-1 items-center p-1 hover:cursor-pointer hover:text-text-primary"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Menu;
