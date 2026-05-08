import { Menu, Search, Bell } from "lucide-react";
import { Button } from "../ui";
import { ThemeSwitcher } from "../ThemeSwitcher";
import { UserProfileDropdown } from "./UserProfileDropdown";
import { Input } from "../ui";

interface HeaderProps {
  title?: string;
  onMenuClick?: () => void;
  showSearch?: boolean;
}

export function Header({
  title,
  onMenuClick,
  showSearch = false,
}: HeaderProps) {
  const userEmail = localStorage.getItem("userEmail") || "admin@example.com";
  const username =
    userEmail.split("@")[0].charAt(0).toUpperCase() +
    userEmail.split("@")[0].slice(1);

  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-4 md:px-6 sticky top-0 z-40 gap-4">
      {/* Left Section */}
      <div className="flex items-center gap-2 md:gap-4 flex-1 min-w-0">
        <Button
          variant="ghost"
          size="sm"
          onClick={onMenuClick}
          className="lg:hidden shrink-0"
          title="Toggle sidebar"
        >
          <Menu className="h-5 w-5" />
        </Button>

        <h1 className="text-lg md:text-2xl font-bold text-foreground truncate">
          {title || "Dashboard"}
        </h1>
      </div>

      {/* Center Section - Search (Desktop) */}
      {showSearch && (
        <div className="hidden md:flex flex-1 max-w-xs">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search..."
              className="pl-10 h-9 text-sm"
            />
          </div>
        </div>
      )}

      {/* Right Section */}
      <div className="flex items-center gap-2 md:gap-3 shrink-0">
        {/* Notifications */}
        <Button
          variant="ghost"
          size="sm"
          className="relative"
          title="Notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-destructive rounded-full" />
        </Button>

        {/* Theme Switcher */}
        <ThemeSwitcher />

        {/* Divider */}
        <div className="hidden md:block w-px h-6 bg-border" />

        {/* User Profile Dropdown */}
        <UserProfileDropdown
          username={username}
          email={userEmail}
          avatar={username.charAt(0).toUpperCase()}
        />
      </div>
    </header>
  );
}
