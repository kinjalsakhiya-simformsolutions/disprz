import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import type { NavItem } from "../../lib/types";

interface SidebarProps {
  items: NavItem[];
  isOpen: boolean;
  onClose?: () => void;
  isCollapsed?: boolean;
}

export function Sidebar({
  items,
  isOpen,
  onClose,
  isCollapsed = false,
}: SidebarProps) {
  const location = useLocation();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity"
          onClick={onClose}
          role="presentation"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen bg-card border-r border-border transition-all duration-300 z-50 lg:z-0 lg:relative lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } ${isCollapsed ? "w-20" : "w-64"}`}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Logo/Header */}
          <div
            className={`p-4 md:p-6 border-b border-border flex items-center gap-3 transition-all ${
              isCollapsed ? "justify-center" : ""
            }`}
          >
            <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold flex-shrink-0">
              D
            </div>
            {!isCollapsed && (
              <div className="min-w-0">
                <h1 className="text-xl font-bold text-primary">Disprz</h1>
                <p className="text-xs text-muted-foreground">Admin Panel</p>
              </div>
            )}
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 p-3 md:p-4">
            <ul className="space-y-2">
              {items.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <li key={item.id}>
                    <Link
                      to={item.href}
                      onClick={onClose}
                      className={`flex items-center gap-3 px-3 md:px-4 py-3 rounded-lg transition-all duration-200 group relative ${
                        isActive
                          ? "bg-primary text-primary-foreground shadow-md"
                          : "text-foreground hover:bg-accent/50"
                      } ${isCollapsed ? "justify-center" : ""}`}
                      title={isCollapsed ? item.label : undefined}
                    >
                      <span className="shrink-0 text-lg">{item.icon}</span>

                      {!isCollapsed && (
                        <>
                          <span className="flex-1 text-sm font-medium">
                            {item.label}
                          </span>
                          {item.badge && (
                            <span className="px-2 py-1 bg-destructive text-destructive-foreground text-xs rounded-full font-semibold">
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}

                      {/* Collapsed Tooltip */}
                      {isCollapsed && (
                        <div className="absolute left-full ml-2 px-2 py-1 bg-foreground text-background text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                          {item.label}
                        </div>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer Section */}
          <div className="p-3 md:p-4 border-t border-border">
            <div
              className={`text-xs text-muted-foreground ${
                isCollapsed ? "text-center" : ""
              }`}
            >
              {!isCollapsed && (
                <>
                  <p className="font-semibold text-foreground text-sm mb-1">
                    v1.0.0
                  </p>
                  <p>© 2024 Disprz</p>
                </>
              )}
              {isCollapsed && <p className="text-xs">v1.0</p>}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
