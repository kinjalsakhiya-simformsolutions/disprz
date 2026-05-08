import { useState, useMemo } from "react";
import { UsersTable, Pagination, SearchFilter } from "../components/tables";
import { mockUsers } from "../data/mockUsers";
import type { User, FilterOptions } from "../lib/types";
import { usePagination } from "../hooks/usePagination";

export function UsersPage() {
  const [filters, setFilters] = useState<FilterOptions>({
    search: "",
    status: "all",
    role: "all",
  });

  const filteredUsers = useMemo(() => {
    return mockUsers.filter((user) => {
      const matchesSearch =
        !filters.search ||
        user.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        user.email.toLowerCase().includes(filters.search.toLowerCase());

      const matchesStatus =
        filters.status === "all" || user.status === filters.status;

      const matchesRole = filters.role === "all" || user.role === filters.role;

      return matchesSearch && matchesStatus && matchesRole;
    });
  }, [filters]);

  const { currentPage, totalPages, paginatedItems, goToPage } = usePagination(
    filteredUsers,
    5,
  );

  const handleFilter = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    goToPage(1);
  };

  const handleUserSelect = (user: User) => {
    console.log("Selected user:", user);
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Users</h2>
        <p className="text-muted-foreground mt-2">
          Manage and view all users in your system.
        </p>
      </div>

      {/* Filters */}
      <SearchFilter
        onFilter={handleFilter}
        onClear={() => setFilters({ search: "", status: "all", role: "all" })}
      />

      {/* Results Info */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-semibold">{paginatedItems.length}</span>{" "}
          of <span className="font-semibold">{filteredUsers.length}</span> users
        </p>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        {filteredUsers.length > 0 ? (
          <UsersTable users={paginatedItems} onUserSelect={handleUserSelect} />
        ) : (
          <div className="p-8 text-center">
            <p className="text-muted-foreground">
              No users found matching your filters.
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
        />
      )}
    </div>
  );
}
