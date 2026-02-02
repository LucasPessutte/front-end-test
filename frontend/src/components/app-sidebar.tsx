"use client";

import { Home, Dog, Settings, User, PawPrint } from "lucide-react";
import { NavLink } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Dashboard", icon: Home, to: "/" },
  { title: "Pets", icon: Dog, to: "/pets" },
  { title: "Configurações", icon: Settings, to: "/" },
  { title: "Perfil", icon: User, to: "/" },
];

export default function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="bg-[#1c212d] py-7 flex justify-center items-center">
        <div className="flex items-center gap-2">
          <PawPrint className="h-8 w-8 text-yellow-400" />
          <span className="font-bold uppercase">Petzone</span>
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-sidebar">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2.5 p-2">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.to}>
                      <item.icon className="h-8 w-8" />
                      <span className="text-base">{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
