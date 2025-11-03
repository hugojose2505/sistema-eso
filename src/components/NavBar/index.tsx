import * as React from "react";
import { NavLink } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { data } from "@/utils/data/navBarItens";
import { useItemNavBar } from "@/store/useSelectNavBar";

export function NavBar(props: React.ComponentProps<typeof Sidebar>) {
  const { isMobile, toggleSidebar } = useSidebar();
  const activeTeam = data.teams[0];
  const { setSelectedItemNavBar } = useItemNavBar();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="bg-[#4c4c4c]">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <div className="bg-[#4c4c4c] text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                    <img
                      src={activeTeam.logo as string}
                      alt={activeTeam.name}
                      className="h-6 w-6"
                    />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium text-white">
                      {activeTeam.name}
                    </span>
                    <span className="truncate text-xs text-gray-400">{activeTeam.plan}</span>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>

        
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="bg-[#4c4c4c]">
        <SidebarGroup>
          <SidebarGroupLabel className="text-white"> ESO</SidebarGroupLabel>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title} className="text-white">
                <SidebarMenuButton asChild tooltip={item.title}>
                  <NavLink
                    to={item.to}
                    
                    className={({ isActive }) =>
                      [
                        "flex items-center gap-2",
                        isActive
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : "",
                      ].join(" ")
                    }
                    onClick={() => {
                      if (isMobile) toggleSidebar?.();
                      setSelectedItemNavBar(item.title);
                    }}
                  >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
