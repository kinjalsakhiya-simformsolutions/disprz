---
applyTo: "src/components/**/*.tsx"
---

# Frontend Development Instructions

## Overview

This document provides detailed frontend development guidelines for the Disprz dashboard project. Follow these standards when creating or modifying components, pages, and styles.

## TypeScript & Type Safety

### Type Definitions

**Always define types for component props:**

```tsx
interface ComponentProps {
  title: string;
  count: number;
  isActive?: boolean;
  onClick?: (id: string) => void;
}
```

**Import types correctly:**

```tsx
import type { User, AnalyticsCard } from "../../lib/types";
```

**Never use `any` type** - Always define proper types.

### Common Types Location

All shared types should go in `src/lib/types/index.ts`:

```tsx
export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  status: "active" | "inactive";
  joinDate: string;
}

export interface AnalyticsCard {
  id: string;
  title: string;
  value: string | number;
  change: number;
  changeType: "increase" | "decrease";
  icon: React.ReactNode;
}
```

## Component Development

### Component Categories

#### 1. UI Components (`src/components/ui/`)

Pure, reusable components with no business logic:

```tsx
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className = "", variant = "default", size = "md", isLoading, ...props },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={`...classes...`}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {props.children}
      </button>
    );
  },
);

Button.displayName = "Button";
```

**Export from `src/components/ui/index.ts`:**

```tsx
export { Button } from "./Button";
export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./Card";
export { Input } from "./Input";
export {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "./Table";
```

#### 2. Feature Components (`src/components/[category]/`)

Composed from UI components with light business logic:

```tsx
interface AnalyticsCardProps {
  card: AnalyticsCard;
  variant?: "default" | "compact" | "detailed";
  onClick?: () => void;
}

export function AnalyticsCard({
  card,
  variant = "default",
  onClick,
}: AnalyticsCardProps) {
  const isIncrease = card.changeType === "increase";

  return (
    <Card onClick={onClick} className="cursor-pointer hover:shadow-lg">
      {/* Component JSX */}
    </Card>
  );
}
```

**Organize by feature:**

- `src/components/layout/` - Layout components
- `src/components/dashboard/` - Dashboard analytics
- `src/components/tables/` - Table-related components

#### 3. Page Components (`src/pages/`)

Full pages that use layout, features, and manage page-level state:

```tsx
export function DashboardPage() {
  const analyticsCards: AnalyticsCardType[] = [
    /* ... */
  ];

  return (
    <div className="space-y-8 p-4 md:p-6 lg:p-8">{/* Page content */}</div>
  );
}
```

### Component Patterns

#### Pattern 1: Controlled Component with State

```tsx
import { useState } from "react";

interface SearchFilterProps {
  onFilter: (filters: FilterOptions) => void;
}

export function SearchFilter({ onFilter }: SearchFilterProps) {
  const [search, setSearch] = useState("");

  const handleSearch = (value: string) => {
    setSearch(value);
    onFilter({ search: value });
  };

  return (
    <input
      value={search}
      onChange={(e) => handleSearch(e.target.value)}
      placeholder="Search..."
    />
  );
}
```

#### Pattern 2: Controlled Component with Memo

```tsx
import { useMemo } from "react";

interface UserTableProps {
  users: User[];
  sortBy?: "name" | "email";
}

export function UserTable({ users, sortBy = "name" }: UserTableProps) {
  const sortedUsers = useMemo(() => {
    return [...users].sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
  }, [users, sortBy]);

  return (
    <table>
      {sortedUsers.map((user) => (
        <tr key={user.id}>{/* ... */}</tr>
      ))}
    </table>
  );
}
```

#### Pattern 3: Click-Outside Detection (Dropdowns)

```tsx
import { useRef, useEffect } from "react";

export function UserProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  return <div ref={dropdownRef}>{/* Component */}</div>;
}
```

## Styling Guidelines

### Color System

**Light Theme** (derived from `#33106c`):

```css
--color-primary: #33106c;
--color-background: #faf9fd;
--color-foreground: #1a0c38;
--color-card: #ffffff;
--color-muted: #ede8f8;
--color-border: #ddd6ef;
```

**Dark Theme** (derived from `#351461`):

```css
--color-primary: #351461;
--color-background: #0a0812;
--color-foreground: #f0eaff;
--color-card: #150f24;
--color-muted: #1e1535;
--color-border: #2e1f50;
```

### Tailwind CSS Usage

**Always use Tailwind classes, never inline styles:**

```tsx
// ✅ Good
<div className="p-4 bg-card border border-border rounded-lg">
  <h2 className="text-2xl font-bold text-foreground">Title</h2>
</div>

// ❌ Bad
<div style={{ padding: "16px", backgroundColor: "#ffffff" }}>
  <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>Title</h2>
</div>
```

### Responsive Design

```tsx
// Mobile-first approach
<div
  className="
  grid gap-4
  md:gap-6
  grid-cols-1 md:grid-cols-2 lg:grid-cols-4
"
>
  {items.map((item) => (
    <Card key={item.id}>{item.name}</Card>
  ))}
</div>
```

### Dark Mode

```tsx
// Use color tokens that adapt to dark mode
<div className="bg-card text-foreground border border-border">
  {/* Content automatically adapts to light/dark theme */}
</div>

// For theme-specific styles
<div className="bg-accent dark:bg-accent/50">
  {/* Different styling in dark mode */}
</div>
```

## State Management

### Local State

Use `useState` for component-level state:

```tsx
const [count, setCount] = useState(0);
const [isOpen, setIsOpen] = useState(false);
```

### Derived State with useMemo

```tsx
const filteredUsers = useMemo(() => {
  return users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()),
  );
}, [users, search]);
```

### Callback Memoization

```tsx
const handleDelete = useCallback((id: string) => {
  setUsers((prev) => prev.filter((u) => u.id !== id));
}, []);
```

### LocalStorage

```tsx
// Theme persistence
const [theme, setTheme] = useState<"light" | "dark">("light");

useEffect(() => {
  localStorage.setItem("theme", theme);
}, [theme]);

useEffect(() => {
  const saved = localStorage.getItem("theme");
  if (saved) setTheme(saved as "light" | "dark");
}, []);
```

## Form Handling

### React Hook Form Pattern

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Min 6 characters"),
});

type FormData = z.infer<typeof schema>;

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <input {...register("email")} placeholder="Email" />
      {errors.email && <span>{errors.email.message}</span>}

      <input {...register("password")} type="password" placeholder="Password" />
      {errors.password && <span>{errors.password.message}</span>}

      <button type="submit">Login</button>
    </form>
  );
}
```

## Hooks

### Custom Hooks Location

Place in `src/hooks/`:

```tsx
// src/hooks/useTheme.ts
export function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const isDark = localStorage.getItem("theme") === "dark";
    setTheme(isDark ? "dark" : "light");
    if (isDark) document.documentElement.classList.add("dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return { theme, toggleTheme };
}
```

### Using Custom Hooks

```tsx
export function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>{theme === "light" ? "🌙" : "☀️"}</button>
  );
}
```

## Routing

### Route Protection

```tsx
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
```

### Route Setup in App.tsx

```tsx
<Routes>
  {/* Public */}
  <Route path="/login" element={<LoginPage />} />

  {/* Protected */}
  <Route
    path="/"
    element={
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    }
  />

  {/* Dashboard Layout Routes */}
  <Route element={<DashboardLayout />}>
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/analytics"
      element={
        <ProtectedRoute>
          <AnalyticsPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/users"
      element={
        <ProtectedRoute>
          <UsersPage />
        </ProtectedRoute>
      }
    />
  </Route>

  {/* Fallback */}
  <Route path="*" element={<Navigate to="/" replace />} />
</Routes>
```

## Performance Optimization

### Code Splitting

```tsx
import { lazy, Suspense } from "react";

const DashboardPage = lazy(() => import("./pages/DashboardPage"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <DashboardPage />
    </Suspense>
  );
}
```

### Image Optimization

- Use WebP format when possible
- Lazy load images below the fold
- Use `srcSet` for responsive images

### Bundle Analysis

```bash
npm run build
# Check dist/ folder size
```

## Accessibility (a11y)

### Semantic HTML

```tsx
// ✅ Good
<button onClick={handleClick}>Save</button>
<nav>{/* navigation items */}</nav>
<main>{/* page content */}</main>

// ❌ Bad
<div onClick={handleClick} role="button">Save</div>
```

### ARIA Labels

```tsx
<button aria-label="Toggle sidebar">
  <Menu className="h-5 w-5" />
</button>

<div aria-label="Loading" role="status">
  <Spinner />
</div>
```

### Color Contrast

- Text on backgrounds must meet WCAG AA standards
- Use the defined color system which is compliant

## Testing

### Component Testing Pattern

```tsx
// Button.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./Button";

describe("Button", () => {
  it("renders with children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click</Button>);

    await userEvent.click(screen.getByText("Click"));
    expect(onClick).toHaveBeenCalled();
  });
});
```

## Common Patterns & Anti-Patterns

### ✅ Good Patterns

1. **Props drilling prevention** - Use context for deeply nested props
2. **Component composition** - Build complex components from simple ones
3. **Custom hooks** - Extract reusable logic into hooks
4. **Error boundaries** - Wrap sections with error handling
5. **Lazy loading** - Load routes and components on demand

### ❌ Anti-Patterns to Avoid

1. **Prop drilling** - Passing props through many layers
2. **State in component tree** - Should use hooks or context
3. **Inline functions in renders** - Use useCallback instead
4. **Uncontrolled components** - Use controlled forms
5. **Magic strings** - Use constants instead

## Build & Deployment Checklist

- [ ] TypeScript compiles without errors
- [ ] No console errors or warnings
- [ ] All routes working correctly
- [ ] Dark mode tested
- [ ] Responsive design verified (mobile, tablet, desktop)
- [ ] All analytics cards displaying correctly
- [ ] Table sorting and filtering working
- [ ] Form validation functioning
- [ ] Authentication flow complete
- [ ] Build size acceptable

## Useful Commands

```bash
# Development
npm run dev

# Build
npm run build

# Preview build
npm run preview

# Type checking
npm run lint

# Format code (if configured)
npm run format

# Run tests (if configured)
npm run test
```

## Resources for Frontend Development

- [React Documentation](https://react.dev)
- [React Router Documentation](https://reactrouter.com)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Lucide React Icons](https://lucide.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Web.dev Performance](https://web.dev/performance/)
- [MDN Web Docs](https://developer.mozilla.org)

---

**Last Updated**: May 7, 2026
**Version**: 1.0

---

## Component Rules

1. Use React functional components only.
2. Use TypeScript interfaces for props.
3. Use Tailwind CSS for styling.
4. Prefer shadcn/ui components instead of custom base UI.
5. Keep components reusable and modular.
6. Split large components into smaller sections.
7. Use semantic HTML tags whenever possible.
8. Add accessibility support:
   - aria-label
   - button type
   - alt text
9. Prefer controlled components for forms.
10. Avoid hardcoded values.

---

## shadcn/ui Rules

- Use `Card` for content sections
- Use `Button` for actions
- Use `Dialog` for modals
- Use `Table` for data display
- Use `DropdownMenu` for menus

---

## Tailwind Rules

- Use responsive utility classes
- Keep class names organized
- Avoid duplicated utility patterns
- Prefer flex/grid layouts

---

## Table Component Standards

When generating tables:

- Add loading state
- Add empty state
- Add pagination support
- Add search/filter support
- Make table responsive

---

## Form Standards

When generating forms:

- Use React Hook Form if needed
- Add validation states
- Add error messages
- Add disabled/loading button states

---

## Dashboard UI Standards

When generating dashboard pages:

- Create reusable analytics cards
- Use responsive grid layouts
- Support dark mode compatibility
- Use consistent spacing and typography
