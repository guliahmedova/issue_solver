"use client";
import Header from "@/features/Dashboard/Header";
import Sidebar from "@/features/Dashboard/Sidebar";
import { useState } from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [openSidebar, setOpenSidebar] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar openSidebar={openSidebar} />
      <div className="flex flex-col flex-1 overflow-y-auto  bg-surface-background">
        <Header setOpenSidebar={setOpenSidebar} />
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
