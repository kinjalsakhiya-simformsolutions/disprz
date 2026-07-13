# Disprz Dashboard

A modern, fully-featured React dashboard application built with the latest technologies and best practices. Perfect for analytics, user management, and data visualization.

## Features

✨ **Core Features**

- **Login Page UI** - Secure authentication interface with form validation
- **Dashboard Layout** - Professional dashboard with responsive sidebar navigation
- **Analytics Cards** - Display KPIs with trend indicators
- **Users Table** - Sortable users list with advanced filtering
- **Pagination** - Smart pagination with configurable page sizes
- **Search & Filters** - Real-time search and multi-filter functionality
- **Responsive Design** - Mobile-first, works on all screen sizes
- **Dark Mode** - Full dark/light theme support with persistence

🛠️ **Tech Stack**

- **React 18** - Latest UI library with concurrent features
- **TypeScript** - Type-safe development with full IntelliSense
- **Vite** - Lightning-fast build tool and dev server
- **Tailwind CSS v4** - Modern utility-first CSS framework
- **React Router v6** - Client-side routing
- **Lucide React** - Beautiful icon library
- **Form Validation** - React Hook Form with Zod

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Base UI components (Button, Card, Input, Table)
│   ├── AnalyticsCard.tsx
│   ├── UsersTable.tsx
│   ├── Pagination.tsx
│   ├── SearchFilter.tsx
│   ├── Sidebar.tsx
│   ├── Header.tsx
│   ├── ThemeSwitcher.tsx
│   └── index.ts
├── pages/               # Page components
│   ├── LoginPage.tsx
│   ├── HomePage.tsx
│   ├── DashboardPage.tsx
│   ├── UsersPage.tsx
│   └── index.ts
├── layouts/            # Layout components
│   └── DashboardLayout.tsx
├── hooks/              # Custom React hooks
│   ├── useTheme.ts
│   └── usePagination.ts
├── types/              # TypeScript interfaces
│   └── index.ts
├── utils/              # Utility functions
│   └── ProtectedRoute.tsx
├── data/               # Mock data
│   └── mockUsers.ts
├── App.tsx            # Main app component with routing
├── main.tsx           # Entry point
├── index.css          # Global styles
└── App.css            # App styles
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start development server**

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`

3. **Build for production**

   ```bash
   npm run build
   ```

4. **Preview production build**
   ```bash
   npm run preview
   ```

## Usage

### Authentication

- Navigate to `/login`
- Demo credentials:
  - Email: `demo@example.com`
  - Password: `demo12345`
- Or use any valid email format and password ≥ 8 characters

### Dashboard

- Access `/dashboard` to view analytics and metrics
- Click menu items in sidebar to navigate
- Use the theme switcher in the top-right corner to toggle dark mode

### Users Management

- Visit `/users` to view the users table
- Use filters to search by name or email
- Filter by status (Active/Inactive) and role (Admin/User)
- Click column headers to sort
- Pagination controls at the bottom allow navigation

### Dark Mode

- Click the moon/sun icon in the header to toggle theme
- Preference is saved to localStorage
- Full Tailwind dark mode support

## Component Documentation

### Base UI Components (`src/components/ui/`)

**Button**

```tsx
<Button variant="default" size="md" isLoading={false}>
  Click me
</Button>
```

Variants: `default`, `secondary`, `destructive`, `outline`, `ghost`, `link`
Sizes: `sm`, `md`, `lg`

**Card**

```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content here</CardContent>
  <CardFooter>Footer content</CardFooter>
</Card>
```

**Input**

```tsx
<Input type="email" placeholder="Enter email" error={errorMessage} />
```

**Table**

```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Header</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Data</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

### Feature Components

**AnalyticsCard**

```tsx
<AnalyticsCard
  card={{
    id: "1",
    title: "Total Users",
    value: "2,543",
    change: 12,
    changeType: "increase",
    icon: <Users className="h-4 w-4" />,
  }}
/>
```

**UsersTable**

```tsx
<UsersTable users={users} onUserSelect={(user) => console.log(user)} />
```

**Pagination**

```tsx
<Pagination
  currentPage={1}
  totalPages={10}
  onPageChange={(page) => setPage(page)}
/>
```

**SearchFilter**

```tsx
<SearchFilter
  onFilter={(filters) => setFilters(filters)}
  onClear={() => setFilters({})}
/>
```

## Hooks

### useTheme

```tsx
const { theme, toggleTheme } = useTheme();
// theme: 'light' | 'dark'
```

### usePagination

```tsx
const {
  currentPage,
  totalPages,
  paginatedItems,
  goToPage,
  nextPage,
  prevPage,
} = usePagination(items, itemsPerPage);
```

## TypeScript Interfaces

All components are fully typed. Key interfaces:

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  status: "active" | "inactive";
  joinDate: string;
}

interface AnalyticsCard {
  id: string;
  title: string;
  value: string | number;
  change: number;
  changeType: "increase" | "decrease";
  icon: React.ReactNode;
}

interface FilterOptions {
  search?: string;
  status?: "active" | "inactive" | "all";
  role?: "admin" | "user" | "all";
}
```

## Styling

The project uses **Tailwind CSS v4** with custom color tokens:

**Light Mode Colors**

- Background: White (#ffffff)
- Foreground: Black (#000000)
- Primary: Black/White
- Muted: Light gray (#f5f5f5)
- Border: Light border (#e5e5e5)

**Dark Mode Colors** (automatically applied with `.dark` class)

- Background: Black (#000000)
- Foreground: White (#ffffff)
- Card: Dark gray (#0a0a0a)
- Muted: Dark gray (#1f1f1f)
- Border: Dark border (#2d2d2d)

To use Tailwind classes:

```tsx
<div className="bg-background text-foreground border border-border rounded-lg p-4">
  Content
</div>
```

## Development Guidelines

### Code Style

- Use TypeScript for type safety
- Keep components small and focused
- Export from index files for clean imports
- Use functional components with hooks
- Prefer composition over inheritance

### File Organization

- Co-locate related files
- Keep styles adjacent to components
- Export types from `src/types/index.ts`
- Use barrel exports for clean imports

### Best Practices

- Always define TypeScript interfaces for props
- Use React.forwardRef for UI components
- Implement proper error handling
- Add loading states to async operations
- Test components before committing

## Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run TypeScript compiler
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- **Vite** provides near-instant HMR (Hot Module Replacement)
- **React 18** with concurrent rendering
- **Code splitting** for optimal bundle size
- **Tree-shaking** with unused code elimination
- **CSS optimization** with Tailwind purging

## Security

- Protected routes with authentication check
- Form validation on client and server
- XSS protection with React's auto-escaping
- CSRF token ready (implement server-side)

## Future Enhancements

- Add REST/GraphQL API integration
- Implement actual authentication
- Add data export functionality
- Create chart visualizations
- Add user profile page
- Implement notifications
- Add file upload capability

## Contributing

1. Create a feature branch
2. Make your changes
3. Ensure TypeScript compilation passes
4. Test thoroughly
5. Create a pull request

## License

MIT

## Support

For issues or questions, please open an issue on GitHub.

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
globalIgnores(['dist']),
{
files: ['**/*.{ts,tsx}'],
extends: [
// Other configs...
// Enable lint rules for React
reactX.configs['recommended-typescript'],
// Enable lint rules for React DOM
reactDom.configs.recommended,
],
languageOptions: {
parserOptions: {
project: ['./tsconfig.node.json', './tsconfig.app.json'],
tsconfigRootDir: import.meta.dirname,
},
// other options...
},
},
])

```

```
