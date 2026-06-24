"use client";

import { useState } from "react";
import { ServiceContextProvider } from "../context/serviceContext";
import { Sidebar, MobileHeader } from "../components/Sidebar";

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="app-container">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
        }}
      >
        <MobileHeader toggleSidebar={toggleSidebar} />

        <main className="main-content">
          <ServiceContextProvider>{children}</ServiceContextProvider>
        </main>
      </div>
    </div>
  );
}
