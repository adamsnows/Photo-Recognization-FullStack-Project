"use client";

import Navbar from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <main className="flex min-h-screen relative flex-grow">
      <Sidebar />

      <div className="flex w-full flex-col ">
        <Navbar />

        <div className="flex flex-grow flex-col p-[25px]   z-0 relative ">
          {children}
        </div>
      </div>
    </main>
  );
};

export default DashboardLayout;
