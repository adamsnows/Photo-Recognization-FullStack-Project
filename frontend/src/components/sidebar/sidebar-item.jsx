import { usePathname } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/ui/tooltip";
import Link from "next/dist/client/link";
import { Button } from "@/ui/button";

const SidebarItem = ({ icon, label, path, onClick }) => {
  const pathname = usePathname();

  const isActive = (path) => {
    return path && pathname === path
      ? "bg-sidebar-gradient text-white hover:text-white"
      : "text-text-primary hover:bg-sidebar-gradient hover:text-white";
  };

  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Link href={path}>
            <div className="flex items-center gap-4 group hover:bg-sidebar-gradient hover:text-white rounded-lg cursor-pointer">
              <Button
                variant="ghost"
                size="icon"
                className={`w-[55px] h-[50px] cursor-pointer rounded-lg flex items-center justify-center ${isActive(
                  path
                )}`}
                onClick={onClick}
              >
                {icon}
              </Button>
            </div>
          </Link>
        </TooltipTrigger>

        <div className="hidden xl:block">
          <TooltipContent side="right" className="z-999">
            {label}
          </TooltipContent>
        </div>
      </Tooltip>
    </TooltipProvider>
  );
};

export default SidebarItem;
