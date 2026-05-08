# Disprz Dashboard - Copilot Instructions

## Project Overview

**Disprz** is a modern, production-ready React admin dashboard built with the latest technologies. It features a responsive layout with collapsible sidebar, comprehensive analytics, user management, and dark mode support.

### Tech Stack

- **Frontend Framework**: React 18 + TypeScript
- **Build Tool**: Vite 8.0.11
- **Styling**: Tailwind CSS v4 with custom theme
- **Routing**: React Router v6
- **UI Icons**: Lucide React
- **Form Validation**: React Hook Form + Zod
- **Package Manager**: npm

### Theme Colors

- **Light Theme Primary**: `#33106c`
- **Dark Theme Primary**: `#351461`
- **Font**: Inter (Google Fonts)

## Project Structure

```
disprz/
├── src/
│   ├── components/
│   │   ├── layout/              # Layout components (Sidebar, Header, DashboardLayout)
│   │   ├── dashboard/           # Dashboard-specific components (AnalyticsCard)
│   │   ├── tables/              # Table components (UsersTable, Pagination, SearchFilter)
│   │   └── ui/                  # Base UI components (Button, Card, Input, Table)
│   ├── pages/                   # Page components (LoginPage, HomePage, DashboardPage, etc.)
│   ├── hooks/                   # Custom hooks (useTheme, usePagination)
│   ├── lib/
│   │   ├── types/               # TypeScript interfaces
│   │   └── ProtectedRoute.tsx   # Authentication wrapper
│   ├── data/                    # Mock data (mockUsers.ts)
│   ├── styles/                  # Global styles (index.css, app.css)
│   ├── App.tsx                  # Main app with routing
│   └── main.tsx                 # Entry point
├── .github/
│   ├── copilot-instructions.md  # This file
│   └── instructions/            # Additional instruction files
├── tailwind.config.js           # Tailwind CSS configuration
├── tsconfig.app.json            # TypeScript configuration
├── postcss.config.js            # PostCSS configuration
└── index.html                   # HTML entry point
```

## Development Workflow

### Running the Project

```bash
# Install dependencies
npm install

# Start development server (runs on localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type check
npm run lint
```

### Key Commands

- `npm run dev` - Start dev server with HMR
- `npm run build` - Production build with optimizations
- `npm run preview` - Preview production build locally

## Architecture Guidelines

### Component Organization

1. **UI Components** (`src/components/ui/`)
   - Base, reusable building blocks
   - Examples: Button, Card, Input, Table
   - No business logic, purely presentational

2. **Feature Components** (`src/components/dashboard/`, `src/components/tables/`, `src/components/layout/`)
   - Composed from UI components
   - May contain light business logic
   - Examples: AnalyticsCard, UsersTable, Header

3. **Page Components** (`src/pages/`)
   - Full page layouts
   - Orchestrate data and features
   - Handle routing and page-level logic

### Type Safety

- All components must have TypeScript interfaces for props
- Central type definitions in `src/lib/types/index.ts`
- Use `type` for interfaces, not `interface`
- Always import types with `import type {}`

### Styling

- Use Tailwind CSS utility classes exclusively
- Custom colors defined in `src/styles/index.css` via `@theme` block
- Dark mode: Use `.dark` class on html element (toggled via `useTheme` hook)
- Responsive breakpoints: `sm`, `md`, `lg`, `xl`, `2xl`

### Authentication & Protection

- Protected routes wrap with `<ProtectedRoute>` component
- Auth state stored in localStorage as `isLoggedIn`
- Email stored in localStorage as `userEmail`
- Demo login: any valid email with password ≥ 6 characters

## Component Development

### Creating a New Component

1. **Choose category**: UI, feature, or page
2. **Create TypeScript interface** for props
3. **Use React.forwardRef** for UI components that need refs
4. **Apply Tailwind classes** for styling
5. **Export from index.ts** in the directory

### Example UI Component Structure

```tsx
import React from "react";
import type { SpecificProps } from "../../lib/types";

interface MyComponentProps extends SpecificProps {
  label?: string;
  isLoading?: boolean;
}

export const MyComponent = React.forwardRef<HTMLDivElement, MyComponentProps>(
  ({ label, isLoading, ...props }, ref) => {
    return (
      <div ref={ref} className="...">
        {/* Component JSX */}
      </div>
    );
  },
);

MyComponent.displayName = "MyComponent";
```

### Example Feature Component Structure

```tsx
interface MyFeatureProps {
  items: Item[];
  onSelect?: (item: Item) => void;
}

export function MyFeature({ items, onSelect }: MyFeatureProps) {
  return (
    <div className="...">
      {items.map((item) => (
        <div key={item.id} onClick={() => onSelect?.(item)}>
          {/* Render item */}
        </div>
      ))}
    </div>
  );
}
```

## Key Features

### 1. Dashboard Layout

- Collapsible sidebar with navigation
- Top header with search, notifications, theme switcher
- User profile dropdown with logout
- Mobile responsive with overlay

### 2. Authentication

- Login page with form validation
- Protected route wrapper
- localStorage-based session
- Demo credentials: any email with password ≥ 6 chars

### 3. Analytics

- Reusable AnalyticsCard component (3 variants: default, compact, detailed)
- KPI metrics display with growth indicators
- Time period selectors
- Traffic analytics and geographic data

### 4. User Management

- User table with sorting and filtering
- Search by name/email
- Filter by status (Active/Inactive) and role (Admin/User)
- Pagination with smart page number display

### 5. Dark Mode

- Theme toggle in header
- Persisted to localStorage
- Smooth transitions
- Full color palette support (light & dark)

## Important Conventions

### Naming Conventions

- **Components**: PascalCase (e.g., `UserProfileDropdown`)
- **Files**: Match component name in PascalCase
- **Functions**: camelCase (e.g., `handleLogout`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `DEFAULT_PAGE_SIZE`)
- **Types**: PascalCase (e.g., `UserProfileDropdownProps`)

### Import Organization

1. External packages (React, lucide-react, etc.)
2. Internal components and types
3. Styles (if any)

```tsx
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "../ui";
import { useTheme } from "../hooks/useTheme";
import type { NavItem } from "../../lib/types";
```

### Component Props

- Destructure props in function signature
- Use optional chaining (`?.`) for optional handlers
- Always provide default values where sensible
- Keep props organized: data first, then handlers, then styling

## Responsive Design

- **Mobile-first** approach
- Breakpoints: `sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`, `2xl: 1536px`
- Use responsive grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`
- Hide elements on mobile: `hidden md:block`
- Show elements on mobile: `md:hidden`

## Performance Considerations

- Use `useMemo` for expensive calculations
- Use `useCallback` for memoized event handlers
- Lazy load pages with React Router's lazy feature if needed
- Optimize images and assets
- Tree-shake unused Lucide icons

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Build & Deployment

### Production Build

```bash
npm run build
```

Output: `dist/` folder with:

- `index.html` - Entry point
- `assets/index-*.css` - Compiled styles
- `assets/index-*.js` - Compiled JavaScript

### Build Optimization

- TypeScript compilation with strict checking (partially enabled)
- Vite handles code splitting automatically
- Tailwind CSS purges unused styles
- Assets are hashed for cache busting

## Git Workflow

- Use meaningful commit messages
- Keep commits focused and atomic
- Create branches for features: `feature/feature-name`
- Create branches for fixes: `fix/bug-name`

## Troubleshooting

### Common Issues

1. **Build fails with CSS errors**
   - Ensure `src/styles/index.css` only has `@import "tailwindcss";`
   - Check `tailwind.config.js` for proper configuration

2. **Components not rendering**
   - Verify imports use correct paths
   - Check TypeScript types match component props
   - Ensure components are exported from index files

3. **Dark mode not working**
   - Verify `useTheme` hook is called in component
   - Check that `.dark` class is applied to `html` element
   - Ensure colors are defined in `@theme` block

4. **Routes not working**
   - Verify routes are nested correctly in `App.tsx`
   - Check that `<DashboardLayout>` wraps dashboard routes
   - Ensure `<ProtectedRoute>` wraps protected pages

## Code Quality

- Use TypeScript strict mode where possible
- Follow ESLint recommendations
- Consistent formatting via Prettier (if configured)
- Meaningful variable and function names
- Add comments for complex logic

## Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Router Docs](https://reactrouter.com/docs)
- [Lucide Icons](https://lucide.dev)

## Copilot Guidelines

When using Copilot to generate code for this project:

1. **Always use TypeScript** - Specify types for all props and functions
2. **Follow component structure** - UI, Feature, or Page components
3. **Respect the theme** - Use defined color tokens, not hard-coded colors
4. **Include error handling** - Handle edge cases and loading states
5. **Maintain responsive design** - Ensure mobile and desktop experience
6. **Use existing patterns** - Follow established component patterns
7. **Test dark mode** - Verify components work in both themes
8. **Keep accessibility in mind** - Use semantic HTML, ARIA labels where needed

## Project Maintenance

### Dependencies

- React 18
- React Router v6
- TypeScript
- Tailwind CSS v4
- Lucide React
- React Hook Form
- Zod

### Regular Updates

- Check for security updates: `npm audit`
- Update dependencies: `npm update`
- Review and test before updating major versions

---

**Last Updated**: May 7, 2026
**Project Status**: Production Ready
