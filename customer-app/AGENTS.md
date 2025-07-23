# Food Delivery Platform - Project Documentation

## Business Overview
A food delivery platform inspired by Uber Eats, focusing on home cooks and restaurants. Built with React, Vite, TailwindCSS, and TypeScript.

## Business Roadmap (Phased Approach)

### 1. Project Setup ✅
- UI design in Builder.io, imported into Cursor
- File/folder structure, TailwindCSS, routing, and environment setup

### 2. Customer App MVP ✅
- Authentication (login/signup, protected routes, allergy selection)
- Home page (map, search, category filter, recommended/popular/new arrivals, "Near me" toggle)
- Cart system (add/remove/update, summary, checkout)
- Profile and order history pages
- Community page (feed, questions, events, post input)
- Responsive/mobile-friendly design

### 3. Backend/API (Next Phase)
- Replace mock data with real API endpoints
- User authentication and session management
- Restaurant, dish, and order management

### 4. Payments (Future Phase)
- Integrate payment gateway (e.g., Stripe)
- Handle tipping, refunds, and payouts

### 5. Cook App MVP (Future Phase)
- Cook onboarding and profile management
- Menu management (add/edit/remove dishes)
- Order management (accept/reject, status updates)
- Earnings and payout tracking

### 6. Real-Time Features (Future Phase)
- Live order tracking (for customers and cooks)
- Real-time notifications (order status, chat, etc.)

### 7. Polish & Production (Future Phase)
- QA, bug fixes, and UX improvements
- Accessibility and performance enhancements
- Deployment and production readiness

**MVP vs. Final Product:** The MVP focuses on core flows and uses mock data for speed and validation. The final product will have full backend integration, payments, real-time features, and production polish.

## Project Checklist

### ✅ Project Setup
- [x] UI design in Builder.io
- [x] Import design into Cursor
- [x] Set up file/folder structure
- [x] Configure TailwindCSS
- [x] Set up routing
- [x] Configure environment files
- [x] Set up GitHub repository

### ✅ Customer App MVP
- [x] Authentication system
  - [x] Login page
  - [x] Signup page
  - [x] Protected routes
  - [x] Allergy selection
- [x] Home page
  - [x] Map integration
  - [x] Search functionality
  - [x] Category filter
  - [x] Recommended restaurants
  - [x] Popular dishes
  - [x] New arrivals
  - [x] "Near me" toggle
- [x] Cart system
  - [x] Add items to cart
  - [x] Remove items from cart
  - [x] Update quantities
  - [x] Cart summary
  - [x] Checkout flow
- [x] Profile page
  - [x] Personal information
  - [x] Delivery address
  - [x] Phone number
  - [x] Allergy preferences
- [x] Order history
  - [x] Active orders
  - [x] Past orders
  - [x] Order status tracking
- [x] Community page
  - [x] Feed display
  - [x] Questions section
  - [x] Events section
  - [x] Post input functionality
- [x] Responsive design
  - [x] Mobile-friendly layout
  - [x] Touch-friendly interactions

### 🔄 Backend/API (Next Phase)
- [ ] Replace mock data with real API
- [ ] User authentication endpoints
- [ ] Restaurant data endpoints
- [ ] Dish management endpoints
- [ ] Order management endpoints
- [ ] Session management

### ⏳ Payments (Future Phase)
- [ ] Payment gateway integration
- [ ] Tipping functionality
- [ ] Refund processing
- [ ] Payout system for cooks

### ⏳ Cook App MVP (Future Phase)
- [ ] Cook onboarding
- [ ] Profile management
- [ ] Menu management
- [ ] Order management
- [ ] Earnings tracking

### ⏳ Real-Time Features (Future Phase)
- [ ] Live order tracking
- [ ] Real-time notifications
- [ ] Chat functionality

### ⏳ Polish & Production (Future Phase)
- [ ] QA testing
- [ ] Bug fixes
- [ ] Performance optimization
- [ ] Accessibility improvements
- [ ] Production deployment

**Current Status:** Customer App MVP is 100% complete and ready for testing or next phase development.

---

# Fusion Starter

A production-ready full-stack React application template with integrated Express server, featuring React Router 6 SPA mode, TypeScript, Vitest, Zod and modern tooling.

While the starter comes with a express server, only create endpoint when strictly neccesary, for example to encapsulate logic that must leave in the server, such as private keys handling, or certain DB operations, db...

## Tech Stack

- **Frontend**: React 18 + React Router 6 (spa) + TypeScript + Vite + TailwindCSS 3
- **Backend**: Express server integrated with Vite dev server
- **Testing**: Vitest
- **UI**: Radix UI + TailwindCSS 3 + Lucide React icons

## Project Structure

```
client/                   # React SPA frontend
├── pages/                # Route components (Index.tsx = home)
├── components/ui/        # Pre-built UI component library
├── App.tsx                # App entry point and with SPA routing setup
└── global.css            # TailwindCSS 3 theming and global styles

server/                   # Express API backend
├── index.ts              # Main server setup (express config + routes)
└── routes/               # API handlers

shared/                   # Types used by both client & server
└── api.ts                # Example of how to share api interfaces
```

## Key Features

## SPA Routing System

The routing system is powered by React Router 6:

- `client/pages/Index.tsx` represents the home page.
- Routes are defined in `client/App.tsx` using the `react-router-dom` import
- Route files are located in the `client/pages/` directory

For example, routes can be defined with:

```typescript
import { BrowserRouter, Routes, Route } from "react-router-dom";

<Routes>
  <Route path="/" element={<Index />} />
  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
  <Route path="*" element={<NotFound />} />
</Routes>;
```

### Styling System

- **Primary**: TailwindCSS 3 utility classes
- **Theme and design tokens**: Configure in `client/global.css` 
- **UI components**: Pre-built library in `client/components/ui/`
- **Utility**: `cn()` function combines `clsx` + `tailwind-merge` for conditional classes

```typescript
// cn utility usage
className={cn(
  "base-classes",
  { "conditional-class": condition },
  props.className  // User overrides
)}
```

### Express Server Integration

- **Development**: Single port (8080) for both frontend/backend
- **Hot reload**: Both client and server code
- **API endpoints**: Prefixed with `/api/`

#### Example API Routes
- `GET /api/ping` - Simple ping api
- `GET /api/demo` - Demo endpoint  

### Shared Types
Import consistent types in both client and server:
```typescript
import { DemoResponse } from '@shared/api';
```

Path aliases:
- `@shared/*` - Shared folder
- `@/*` - Client folder

## Development Commands

```bash
npm run dev        # Start dev server (client + server)
npm run build      # Production build
npm run start      # Start production server
npm run typecheck  # TypeScript validation
npm test          # Run Vitest tests
```

## Adding Features

### Add new colors to the theme

Open `client/global.css` and `tailwind.config.ts` and add new tailwind colors.

### New API Route
1. **Optional**: Create a shared interface in `shared/api.ts`:
```typescript
export interface MyRouteResponse {
  message: string;
  // Add other response properties here
}
```

2. Create a new route handler in `server/routes/my-route.ts`:
```typescript
import { RequestHandler } from "express";
import { MyRouteResponse } from "@shared/api"; // Optional: for type safety

export const handleMyRoute: RequestHandler = (req, res) => {
  const response: MyRouteResponse = {
    message: 'Hello from my endpoint!'
  };
  res.json(response);
};
```

3. Register the route in `server/index.ts`:
```typescript
import { handleMyRoute } from "./routes/my-route";

// Add to the createServer function:
app.get("/api/my-endpoint", handleMyRoute);
```

4. Use in React components with type safety:
```typescript
import { MyRouteResponse } from '@shared/api'; // Optional: for type safety

const response = await fetch('/api/my-endpoint');
const data: MyRouteResponse = await response.json();
```

### New Page Route
1. Create component in `client/pages/MyPage.tsx`
2. Add route in `client/App.tsx`:
```typescript
<Route path="/my-page" element={<MyPage />} />
```

## Production Deployment

- **Standard**: `npm run build` + `npm start`
- **Docker**: Dockerfile included
- **Binary**: Self-contained executables (Linux, macOS, Windows)
- Express serves the built React SPA with fallback routing support

## Architecture Notes

- Single-port development with Vite + Express integration
- TypeScript throughout (client, server, shared)
- Full hot reload for rapid development
- Production-ready with multiple deployment options
- Comprehensive UI component library included
- Type-safe API communication via shared interfaces
