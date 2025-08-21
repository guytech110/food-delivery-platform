# Security Guide

This document describes the security model, Firebase rules, environment variables, and deployment practices used in this repository.

## Overview

- Authentication: Firebase Auth (email/password). No role-revealing messages are shown to end users.
- Authorization: Enforced primarily via Firestore and Storage security rules.
- Data Separation: Users can only access their own documents. Admins have elevated permissions.
- Secrets: All client-side configs are supplied via Vite `VITE_` environment variables. No secrets are committed.

## Firebase Firestore Rules (Summary)

See `firebase/firestore.rules` for the canonical rules. Key points:

- Signed-in users can create and read/write only their own documents in `users/{uid}` and `cooks/{uid}`.
- Admins are recognized if they have either:
  - A document at `admins/{uid}` with `role` in `['admin', 'super_admin']`, or
  - A document at `users/{uid}` with `role` equal to `admin`.
- Orders (`orders/{orderId}`) are readable/writable by participants (customerId or cookId) and admins.
- `menuItems` are publicly readable; only the owning cook (by `cookId`) or an admin can write.
- `cookVerifications/{cookId}` accessible by the cook owner and admins.
- Notifications are scoped to `userId` and to order participants when tied to an order.
- All other paths are denied by default.

## Firebase Storage Rules (Summary)

See `firebase/storage.rules` for the canonical rules. Key points:

- Uploads must be stored under `uploads/{userId}/**`.
- Only the owning user (matching `request.auth.uid`) or an admin can read/write.
- Max file size: 5MB. Content type must match `image/*`.
- Only admins can perform broad list operations; all other paths denied by default.

## Client Upload Guidelines

- Prefix all uploads with the authenticated user’s ID: `uploads/${uid}/...`.
- Always include `contentType` metadata when uploading to satisfy Storage rules.
- Validate files on the client before upload: type `image/*`, size ≤ 5MB.

## Environment Variables

Each app has a `.env.example` and should have a private `.env` file (ignored by git):

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_FIREBASE_MEASUREMENT_ID` (optional)
- `VITE_GOOGLE_MAPS_API_KEY` (cook and customer apps only)

Admin Portal (optional for local dev):
- `VITE_DEV_ADMIN_BYPASS` and `VITE_DEV_ADMIN_EMAIL` for development-only bypass.
- `SEED_ADMIN_EMAIL` and `SEED_ADMIN_PASSWORD` for the seeding script.

## Google Maps API Key

- Use `VITE_GOOGLE_MAPS_API_KEY`. Never hardcode keys.
- Restrict the key in Google Cloud Console to allowed domains and the specific Maps APIs used.

## Deployment

Deploy Firebase security rules to the active project:

```bash
firebase login
firebase use <your-project-id>
firebase deploy --only firestore:rules,storage:rules
```

Recommended CI checks (also available as npm scripts at repo root):

- No committed env files
- No hardcoded Google API keys (pattern `AIza`)
- Consistent Firebase project ID across apps

## Incident Response

- If a key leaks, rotate it immediately in Firebase/Google Cloud and update environment variables.
- Review Firebase Security Rules and recent access logs.
- Invalidate deploys and re-deploy rules if necessary.
