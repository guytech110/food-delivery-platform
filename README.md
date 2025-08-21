# 🍕 Food Delivery Platform

A complete food delivery platform inspired by Uber Eats, featuring home cooks and restaurants. Built with React, TypeScript, Vite, TailwindCSS, and Firebase.

## 🏗️ Project Structure

This is a monorepo containing three main applications:

```
food-delivery-platform/
├── customer-app/          # Customer-facing application (neon-lab)
├── cook-app/             # Cook/restaurant application (builder-cosmos-sanctuary-main)
├── admin-portal/         # Admin dashboard (gravy-goat-22650524.figma.site_gd5lp4)
└── README.md
```

## 🚀 Applications

### 1. Customer App (`customer-app/`)
- Port: 5179
- URL: http://localhost:5179/
- Features:
  - User authentication (login/signup)
  - Browse restaurants and dishes
  - Cart management
  - Order tracking
  - Profile management
  - Community features

### 2. Cook App (`cook-app/`)
- Port: 5178
- URL: http://localhost:5178/
- Features:
  - Cook onboarding and KYC verification
  - Menu management
  - Order management
  - Earnings tracking
  - Profile management

### 3. Admin Portal (`admin-portal/`)
- Port: 5176
- URL: http://localhost:5176/
- Features:
  - User management
  - Order management
  - Cook management
  - Analytics and reports
  - Real-time dashboard

## 🧰 Tech Stack

- Frontend: React 18 + TypeScript + Vite + TailwindCSS
- Backend: Firebase (Authentication, Firestore, Storage)
- UI Components: Radix UI + Lucide React icons
- State Management: React Context API
- Real-time: Firebase onSnapshot listeners
- Authentication: Firebase Auth

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Firebase project setup

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/guytech110/food-delivery-platform.git
   cd food-delivery-platform
   ```

2. Install dependencies for all apps
   ```bash
   # Customer App
   cd customer-app && npm install && cd ..
   
   # Cook App
   cd cook-app && npm install && cd ..
   
   # Admin Portal
   cd admin-portal && npm install && cd ..
   ```

3. Set up Firebase
   - Create a Firebase project
   - Enable Authentication, Firestore, and Storage
   - Copy `.env.example` to `.env.local` in each app and fill in the values (see below)

4. Start the applications
   ```bash
   # Terminal 1: Customer App
   cd customer-app && npm run dev
   
   # Terminal 2: Cook App
   cd cook-app && npm run dev
   
   # Terminal 3: Admin Portal
   cd admin-portal && npm run dev
   ```

## 📱 Access Points

- Customer App: http://localhost:5179/
- Cook App: http://localhost:5178/
- Admin Portal: http://localhost:5176/

## 🔐 Security and Environment Setup

All apps share the same Firebase project configuration and rely on environment variables prefixed with `VITE_`.

- Copy `.env.example` to `.env.local` in each app directory and populate:
  - `VITE_FIREBASE_API_KEY`
  - `VITE_FIREBASE_AUTH_DOMAIN`
  - `VITE_FIREBASE_PROJECT_ID`
  - `VITE_FIREBASE_STORAGE_BUCKET`
  - `VITE_FIREBASE_MESSAGING_SENDER_ID`
  - `VITE_FIREBASE_APP_ID`
  - `VITE_FIREBASE_MEASUREMENT_ID` (optional)
  - `VITE_GOOGLE_MAPS_API_KEY` (cook and customer apps only)
- `.env*` files are ignored by git across all apps.
- No API keys are hardcoded in the repo; Vite injects them at build time.

### Google Maps API Key
- Set `VITE_GOOGLE_MAPS_API_KEY` only in environments that use maps (cook and customer apps).
- Do not paste raw keys in source. Search for accidental leaks using:
  ```bash
  git ls-files | xargs grep -n "AIza" || true
  ```
- Restrict the key in Google Cloud Console to the app domains and required APIs.

### Firebase Security Rules
See `firebase/firestore.rules` and `firebase/storage.rules` for the full rules. Summary:

- Firestore
  - Users/cooks can read/write only their own document.
  - Orders readable/writable by order participants (customer/cook) and admins.
  - Admins are recognized if they have a document under `admins/{uid}` with role in `['admin','super_admin']` OR a `users/{uid}` document with role `admin`.
  - `menuItems` readable by anyone; only owning cook (by `cookId`) or admins can write.
  - `cookVerifications` readable/writable by the cook owner and admins.
  - Notifications restricted to the intended `userId` and to participants when tied to an order.
- Storage
  - Uploads restricted to `uploads/{userId}/**` with a 5MB size limit and `image/*` content type.
  - Reads allowed for the owner or admins; broad lists allowed only for admins.
  - All other paths are denied by default.

Deploy rules with Firebase CLI:
```bash
npm i -g firebase-tools
firebase login
firebase use <your-project-id>
firebase deploy --only firestore:rules,storage:rules
```

### Shared Firebase Config
- All apps import config from environment variables and must point to the same project ID.
- Verify by checking each app's `client/lib/firebase.ts` or `src/lib/firebase.ts`.

## 🧪 Operational Checks

Before committing or deploying:
- [ ] No `.env` files are tracked (`git ls-files | grep -E "\.env(\.|$)"` should be empty)
- [ ] No API keys are hardcoded (`grep -R "AIza" .` returns nothing)
- [ ] All three apps use the same `VITE_FIREBASE_PROJECT_ID`
- [ ] Google Maps key is only referenced via `VITE_GOOGLE_MAPS_API_KEY`
- [ ] Firestore and Storage rules deployed to the active project
- [ ] Upload paths are prefixed with authenticated `userId` and include `contentType`

## ☁️ Deploying to Vercel

Each app can be deployed as a separate Vercel project. Recommended settings:

- Framework Preset: Vite
- Root Directory: app folder (e.g., `customer-app`)
- Build Command: `npm run build`
- Output Directory: `dist/spa`
- Development Command: `npm run dev`
- Install Command: `npm install`
- Ignore Build Step: leave blank
- Environment Variables: add the same `VITE_*` variables as your `.env.local`

API Routes:
- We provide a minimal Express-based handler at `api/index.ts` in each app.
- Vercel will build it as an Edge/Serverless Function exposed at `/api/*`.
- Test after deploy: `/api/health` (admin) or `/api/ping`/`/api/demo` (cook/customer).

Monorepo hints:
- Create three separate projects in Vercel, each pointing to one of: `admin-portal`, `cook-app`, `customer-app` as the root.
- Alternatively, add three Vercel projects connected to the same repo and set each root accordingly.

## Vercel deployment and environment variables

Each app (admin-portal, cook-app, customer-app) is linked to a separate Vercel project.

Dev ports
- admin-portal: http://localhost:5176
- cook-app: http://localhost:5178
- customer-app: http://localhost:5179

Local envs
- Place app-specific secrets in each app's `.env.local`. These are consumed by Vite as `import.meta.env.VITE_*`.
- Example keys: `VITE_FIREBASE_*`, optionally `VITE_GOOGLE_MAPS_API_KEY`, and `VITE_APP_CHECK_*`.

Vercel envs
- Use the Vercel CLI to manage envs per app and environment:
  - Pull: `vercel env pull .env.vercel.development --environment=development`
  - Push: `vercel env push .env.vercel.production --environment=production`
- We commit only `.env.example` files. Real secrets live in Vercel or local `.env.local`.

API routes
- Lightweight Express handlers exist in `/api/index.ts` per app; they are built with `@vercel/node` via each app's `vercel.json`.

Migration from Netlify
- All Netlify config and functions were removed. Use Vercel projects, `vercel.json`, and Vercel CLI for deploys.

## 🧭 Development Notes

- Each app is independent and can be developed separately. Common patterns:
  1. New Page → `pages/`
  2. New Component → `components/`
  3. New Context → `contexts/`
  4. API Integration → Firebase services
- Code style: TypeScript, TailwindCSS, React hooks, Firebase SDK.

## 📊 Roadmap

### ✅ Completed
- [x] Customer App MVP
- [x] Cook App MVP
- [x] Admin Portal
- [x] Firebase Integration
- [x] Real-time Features
- [x] Authentication System

### 🔄 Next Phase
- [ ] Payment Integration (Stripe)
- [ ] Push Notifications
- [ ] Advanced Analytics
- [ ] Mobile App Development
- [ ] Performance Optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test all applications
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, please contact the development team or create an issue in the repository.
