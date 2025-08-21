Production setup checklist

1) Environment variables (all apps use the same Firebase project)
- Create .env.production in each app using the provided templates
  - admin-portal/.env.production
  - cook-app/.env.production
  - customer-app/.env.production
- Fill with real Firebase values and Maps key (for cook/customer)
- Ensure VITE_DEV_ADMIN_BYPASS=false in production

2) Firebase project (hometaste-aaba7)
- Enable Email/Password auth only (disable Anonymous)
- Add authorized domains for your production/staging URLs
- Optional: Enable App Check and later enforce on Firestore/Storage

3) Security rules deployment
- From repo root:
  - npm run firebase:login
  - npm run firebase:use
  - npm run deploy:rules

4) Seed first admin (one time in production)
- Set SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD in admin-portal/.env.production
- From admin-portal folder, run: node create-admin-user.js
- Remove those two env vars after successful seed

5) Build and deploy apps
- npm run build:all
- Connect each app to hosting (e.g., Netlify) and set the same VITE_ envs in site settings

6) Final verification
- Auth flows work and remain role-neutral in errors
- Admin routes gated; cook/customer routes gated
- Uploads restricted to uploads/{userId}/ and validated for type/size
- Dev-only routes/features disabled in production
- Console logs are quiet in production
