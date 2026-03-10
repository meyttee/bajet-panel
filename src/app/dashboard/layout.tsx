"use client";

import { usePathname } from "next/navigation";

import { sidebarData } from "@/constants";
import { AIBSidebar, SidebarProvider } from "@/components";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isDashboardRoute = pathname === "/dashboard";

  return (
    <div className="flex bg-[#fefcfa]">
      <SidebarProvider>
        <AIBSidebar sidebarData={sidebarData} />
      </SidebarProvider>
      <main
        className={`m-3 h-[calc(100vh-24px)] w-full overflow-auto rounded-xl bg-white shadow-md`}
      >
        {children}
      </main>
    </div>
  );
}
