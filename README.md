# Disprz

A frontend admin dashboard built with Vite, React, TypeScript, and Tailwind CSS. The project includes a demo login flow, protected routes, analytics pages, and a searchable users table powered by mock data.

> Note: this repository currently uses localStorage-based demo authentication and mock data only. There is no backend integration in the current codebase.

## Features

- Demo login page with client-side validation
- Protected routes for authenticated areas of the app
- Responsive dashboard layout with sidebar and header
- Dashboard overview with KPI cards and quick stats
- Analytics page with detailed metrics and a monthly insights modal
- Users page with search, filters, sorting, and pagination
- Theme switcher with persisted dark mode preference
- User profile menu with logout flow

## Tech Stack

- React 19
- TypeScript
- Vite 8
- Tailwind CSS 4
- React Router DOM 7
- React Hook Form
- Zod
- Lucide React
- Radix UI Dialog
- ESLint

## Installation

### Prerequisites

- Node.js 18+ recommended
- npm

### Install dependencies

```bash
npm install
```

## Project Setup

Start the development server:

```bash
npm run dev
```

Vite will print the local development URL in the terminal, typically `http://localhost:5173`.

### Available scripts

```bash
npm run dev      # start the development server
npm run build    # compile TypeScript and create a production build
npm run lint     # run ESLint
npm run preview  # preview the production build locally
```

## Usage Examples

### Sign in to the demo app

Open `/login` and use the demo credentials shown in the UI:

```text
Email: demo@example.com
Password: demo123
```

The current login flow also accepts any valid email address with a password of at least 6 characters.

### Navigate the application

After signing in, you can visit:

- `/` - home page
- `/dashboard` - KPI dashboard
- `/analytics` - analytics and insights
- `/users` - searchable and filterable users table

### Build for production

```bash
npm run build
npm run preview
```

## Project Structure

```text
src/
├── components/
│   ├── dashboard/   # analytics cards and dashboard-specific UI
│   ├── layout/      # sidebar, header, layout shell, profile dropdown
│   ├── tables/      # table, filters, and pagination features
│   └── ui/          # shared base components
├── data/            # mock data sources
├── hooks/           # reusable React hooks
├── lib/             # protected route and shared types
├── pages/           # route-level pages
└── styles/          # global application styles
```

## Route Summary

| Route | Access | Purpose |
| --- | --- | --- |
| `/login` | Public | Demo sign-in page |
| `/` | Protected | Home page |
| `/dashboard` | Protected | Dashboard overview |
| `/analytics` | Protected | Analytics view |
| `/users` | Protected | Users management table |

