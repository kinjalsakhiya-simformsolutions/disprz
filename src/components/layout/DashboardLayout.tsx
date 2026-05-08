import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import {
  LayoutDashboard,
  Users,
  Home,
  Settings,
  BarChart3,
} from "lucide-react";
import type { NavItem } from "../../lib/types";

export function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const navigationItems: NavItem[] = [
    {
      id: "1",
      label: "Home",
      icon: <Home className="h-5 w-5" />,
      href: "/",
    },
    {
      id: "2",
      label: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      href: "/dashboard",
    },
    {
      id: "3",
      label: "Users",
      icon: <Users className="h-5 w-5" />,
      href: "/users",
      badge: 10,
    },
    {
      id: "4",
      label: "Analytics",
      icon: <BarChart3 className="h-5 w-5" />,
      href: "/analytics",
    },
    {
      id: "5",
      label: "Settings",
      icon: <Settings className="h-5 w-5" />,
      href: "/settings",
    },
  ];

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        items={navigationItems}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        isCollapsed={isSidebarCollapsed}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <Header
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
          showSearch={true}
        />

        {/* Main Area */}
        <main className="flex-1 overflow-auto">
          <div className="w-full h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
