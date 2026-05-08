// User types
export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  avatar?: string;
  status: "active" | "inactive";
  joinDate: string;
}

// Analytics types
export interface AnalyticsCard {
  id: string;
  title: string;
  value: string | number;
  change: number;
  changeType: "increase" | "decrease";
  icon: React.ReactNode;
}

// Dashboard types
export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  revenue: number;
  growth: number;
}

// Pagination types
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

// Search and Filter types
export interface FilterOptions {
  search?: string;
  status?: "active" | "inactive" | "all";
  role?: "admin" | "user" | "all";
}

// Theme types
export type Theme = "light" | "dark" | "system";

// Sidebar navigation types
export interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
  badge?: number | string;
}

// Button types
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "secondary"
    | "destructive"
    | "outline"
    | "ghost"
    | "link";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

// Form types
export interface FormFieldProps {
  label: string;
  placeholder?: string;
  type?: string;
  error?: string;
  required?: boolean;
}

// Login form types
export interface LoginFormData {
  email: string;
  password: string;
}

// Table column types
export interface TableColumn<T> {
  key: keyof T;
  header: string;
  render?: (value: unknown, row: T) => React.ReactNode;
}
