# Chia Yi Steel - MES Frontend (Next.js)

Manufacturing Execution System frontend built with Next.js 15, Material-UI, and TypeScript.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **UI Library:** Material-UI (MUI) v6
- **Styling:** Tailwind CSS v4
- **Language:** TypeScript
- **React:** React 18.3.1 (for MUI v6 compatibility)
- **Authentication:** NextAuth.js v5
- **Internationalization:** next-intl
- **Package Manager:** pnpm
- **Node Version:** 22.13.0 (locked via .nvmrc)

## Project Structure

```
frontend-nextjs/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── dashboard/          # Dashboard pages (protected)
│   │   ├── login/              # Login page
│   │   └── layout.tsx          # Root layout
│   ├── components/             # React components
│   │   ├── layout/             # Layout components (Sidebar, TopBar)
│   │   └── ThemeRegistry.tsx   # MUI theme provider
│   ├── lib/                    # Utility functions and configs
│   │   └── theme.ts            # MUI theme configuration
│   ├── i18n/                   # Internationalization
│   │   ├── locales/            # Translation files (zh, en, vi, id, th)
│   │   └── request.ts          # i18n request config
│   ├── styles/                 # Global styles
│   │   └── globals.css         # Tailwind CSS imports
│   └── types/                  # TypeScript type definitions
├── .nvmrc                      # Node version lock
├── package.json                # Dependencies
├── tsconfig.json               # TypeScript config
├── tailwind.config.ts          # Tailwind config
└── next.config.ts              # Next.js config
```

## Getting Started

### Prerequisites

- Node.js 22.13.0 (use nvm: `nvm use`)
- pnpm (`npm install -g pnpm`)

### Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build for Production

```bash
# Create production build
pnpm build

# Start production server
pnpm start
```

## Authentication

The application uses NextAuth.js v5 for authentication.

### Login Credentials (Development)

Currently using placeholder authentication. Any username/password combination will work for development.

**TODO:** Replace with actual backend API integration in `src/auth.ts`

### Protected Routes

All routes under `/dashboard` are protected and require authentication.

## Internationalization

Supported languages:
- Chinese (zh) - Default
- English (en)
- Vietnamese (vi)
- Indonesian (id)
- Thai (th)

Translation files are located in `src/i18n/locales/`

## Environment Variables

Copy `.env.local` and update the values:

```env
# Authentication secret (generate with: openssl rand -base64 32)
AUTH_SECRET=your-secret-key-here

# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

## Features Implemented

- ✅ Next.js 15 with App Router
- ✅ Material-UI component library
- ✅ Tailwind CSS for utility styling
- ✅ TypeScript for type safety
- ✅ NextAuth.js authentication
- ✅ Protected routes with middleware
- ✅ Internationalization (5 languages)
- ✅ Responsive layout (Sidebar + TopBar)
- ✅ Sample Employee page with CRUD operations

## Migration from Old Frontend

This is a new Next.js implementation replacing the old Vite-based frontend.

### Key Improvements

- **Unified UI Library:** Uses MUI exclusively (removed shadcn/ui dual system)
- **File-based Routing:** Next.js App Router with URL support
- **Secure Auth:** NextAuth.js with middleware protection
- **Better Organization:** Feature-based structure with clear separation
- **Type Safety:** Strict TypeScript configuration
- **Performance:** Server-side rendering and optimizations

### Migration Status

- [x] Project setup
- [x] Authentication system
- [x] Layout components (Sidebar, TopBar)
- [x] Dashboard page
- [x] Employee page (sample)
- [ ] Remaining 25 pages (to be migrated)
- [ ] Backend API integration
- [ ] Real data fetching

## Next Steps

1. **Backend Integration**
   - Update `src/auth.ts` with real API authentication
   - Create API service layer in `src/lib/api.ts`
   - Replace hardcoded data with API calls

2. **Page Migration**
   - Migrate remaining pages from old frontend
   - Follow the employee page pattern
   - Use TypeScript interfaces for all data models

3. **Features**
   - Add data tables with pagination/sorting
   - Implement real-time updates
   - Add form validation
   - Error handling and loading states

## Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

## License

Private - Chia Yi Steel Enterprise
