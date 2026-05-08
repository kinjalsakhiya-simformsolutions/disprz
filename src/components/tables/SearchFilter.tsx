import { useState } from "react";
import { Button } from "../ui";
import { Search, X } from "lucide-react";
import type { FilterOptions } from "../../lib/types";

interface SearchFilterProps {
  onFilter: (filters: FilterOptions) => void;
  onClear?: () => void;
}

export function SearchFilter({ onFilter, onClear }: SearchFilterProps) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"active" | "inactive" | "all">("all");
  const [role, setRole] = useState<"admin" | "user" | "all">("all");

  const handleSearch = (value: string) => {
    setSearch(value);
    onFilter({ search: value, status, role });
  };

  const handleStatusChange = (value: "active" | "inactive" | "all") => {
    setStatus(value);
    onFilter({ search, status: value, role });
  };

  const handleRoleChange = (value: "admin" | "user" | "all") => {
    setRole(value);
    onFilter({ search, status, role: value });
  };

  const handleClear = () => {
    setSearch("");
    setStatus("all");
    setRole("all");
    onClear?.();
    onFilter({ search: "", status: "all", role: "all" });
  };

  return (
    <div className="space-y-4 p-4 bg-card border border-border rounded-lg">
      <div>
        <label className="block text-sm font-medium mb-2">Search</label>
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 h-10 rounded-md border border-input bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Status</label>
          <select
            value={status}
            onChange={(e) =>
              handleStatusChange(
                e.target.value as "active" | "inactive" | "all",
              )
            }
            className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-base text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Role</label>
          <select
            value={role}
            onChange={(e) =>
              handleRoleChange(e.target.value as "admin" | "user" | "all")
            }
            className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-base text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="all">All</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
      </div>

      {(search || status !== "all" || role !== "all") && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleClear}
          className="w-full"
        >
          <X className="h-4 w-4 mr-2" />
          Clear Filters
        </Button>
      )}
    </div>
  );
}
