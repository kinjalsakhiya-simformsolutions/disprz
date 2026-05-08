import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui";
import type { User } from "../../lib/types";
import { ArrowUpDown, Check, X } from "lucide-react";
import { Button } from "../ui";

interface UsersTableProps {
  users: User[];
  onUserSelect?: (user: User) => void;
}

type SortField = "name" | "email" | "status" | "joinDate";
type SortOrder = "asc" | "desc";

export function UsersTable({ users, onUserSelect }: UsersTableProps) {
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const sortedUsers = useMemo(() => {
    const sorted = [...users].sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (typeof aValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = (bValue as string).toLowerCase();
      }

      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [users, sortField, sortOrder]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const SortHeader = ({
    field,
    label,
  }: {
    field: SortField;
    label: string;
  }) => (
    <TableHead
      className="cursor-pointer hover:bg-muted"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center gap-2">
        {label}
        <ArrowUpDown className="h-4 w-4 opacity-50" />
      </div>
    </TableHead>
  );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <SortHeader field="name" label="Name" />
          <SortHeader field="email" label="Email" />
          <TableHead>Role</TableHead>
          <SortHeader field="status" label="Status" />
          <SortHeader field="joinDate" label="Join Date" />
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedUsers.map((user) => (
          <TableRow key={user.id} className="hover:bg-muted/50">
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell className="text-muted-foreground">
              {user.email}
            </TableCell>
            <TableCell>
              <span
                className={`px-2 py-1 rounded text-xs font-medium ${
                  user.role === "admin"
                    ? "bg-purple-100 dark:bg-purple-900 text-purple-900 dark:text-purple-100"
                    : "bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100"
                }`}
              >
                {user.role}
              </span>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                {user.status === "active" ? (
                  <>
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-green-700 dark:text-green-400">
                      Active
                    </span>
                  </>
                ) : (
                  <>
                    <X className="h-4 w-4 text-red-500" />
                    <span className="text-red-700 dark:text-red-400">
                      Inactive
                    </span>
                  </>
                )}
              </div>
            </TableCell>
            <TableCell className="text-muted-foreground">
              {new Date(user.joinDate).toLocaleDateString()}
            </TableCell>
            <TableCell>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onUserSelect?.(user)}
                className="text-primary hover:text-primary"
              >
                View
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
