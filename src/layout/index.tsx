import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { Outlet } from "react-router-dom";
import { NavBar } from "@/components/NavBar";
import logoProlog from "@/assets/icone.png";
import { useItemNavBar } from "@/store/useSelectNavBar";

export default function AppLayout() {
  const { selectedItemNavBar } = useItemNavBar();
  return (
    <SidebarProvider>
      <NavBar />
      <SidebarInset>
        <div className="flex h-14 shrink-0 items-center justify-between border-b px-4 bg-[#4c4c4c]">
          <div className="flex flex-row gap-4">
            <SidebarTrigger className="-ml-1 text-white" />
            <h1 className="text-lg font-semibold text-white">{selectedItemNavBar}</h1>
          </div>

          <img src={logoProlog} alt="Prolog" className="h-12  w-auto" />
        </div>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-2  max-w-full bg-gray-50">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
