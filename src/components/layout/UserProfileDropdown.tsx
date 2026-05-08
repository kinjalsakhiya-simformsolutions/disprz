import { useState, useRef, useEffect } from "react";
import { ChevronDown, User, Settings, LogOut } from "lucide-react";
import { Button } from "../ui";
import { useNavigate } from "react-router-dom";

interface UserProfileDropdownProps {
  username?: string;
  email?: string;
  avatar?: string;
}

export function UserProfileDropdown({
  username = "Admin User",
  email = "admin@example.com",
  avatar = "AU",
}: UserProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3"
      >
        {/* Avatar Circle */}
        <div className="h-8 w-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-semibold">
          {avatar}
        </div>

        {/* Desktop: Show name and chevron */}
        <div className="hidden sm:flex flex-col items-start">
          <span className="text-xs font-semibold text-foreground">
            {username}
          </span>
          <span className="text-xs text-muted-foreground">{email}</span>
        </div>

        <ChevronDown
          className={`h-4 w-4 text-muted-foreground transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </Button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-lg shadow-lg z-50 animate-in fade-in slide-in-from-top-2">
          {/* Profile Section */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-semibold">
                {avatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">
                  {username}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {email}
                </p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <button
              onClick={() => {
                setIsOpen(false);
                // Navigate to profile page if it exists
              }}
              className="w-full px-4 py-2 text-sm text-foreground hover:bg-accent flex items-center gap-3 transition-colors"
            >
              <User className="h-4 w-4" />
              <span>Profile</span>
            </button>

            <button
              onClick={() => {
                setIsOpen(false);
                // Navigate to settings page if it exists
              }}
              className="w-full px-4 py-2 text-sm text-foreground hover:bg-accent flex items-center gap-3 transition-colors"
            >
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </button>
          </div>

          {/* Divider */}
          <div className="border-t border-border" />

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 text-sm text-destructive hover:bg-destructive/10 flex items-center gap-3 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
}
