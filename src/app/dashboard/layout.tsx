"use client";
import Header from "@/features/Dashboard/Header";
import Sidebar from "@/features/Dashboard/Sidebar";
import ProtectRoute from "@/features/ProtectRoute";
import { Suspense, useState } from "react";
import Loading from "../loading";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [openSidebar, setOpenSidebar] = useState(true);

  return (
    <ProtectRoute>
      <Suspense fallback={<Loading />}>
        <div className="bg-surface-background">
          <div className="flex h-screen overflow-hidden">
            <Sidebar sidebarOpen={openSidebar} setSidebarOpen={setOpenSidebar} />
            <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden bg-surface-background">
              <Header setSidebarOpen={setOpenSidebar} />
              <main>
                <div className="mx-auto max-w-screen-2xl py-4 lg:px-11 px-4 md:p-6 2xl:p-10">
                  {children}
                </div>
              </main>
            </div>
          </div>
        </div>
      </Suspense>
    </ProtectRoute>
  );
};