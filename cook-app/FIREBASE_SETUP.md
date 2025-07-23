# Firebase Setup Guide

## Required Indexes

To resolve Firebase index errors, you need to create the following composite indexes in your Firebase Console:

### 1. Notifications Collection Index

**Collection:** `notifications`
**Fields:**
- `userId` (Ascending)
- `createdAt` (Descending)

**Steps:**
1. Go to Firebase Console
2. Navigate to Firestore Database
3. Click on "Indexes" tab
4. Click "Create Index"
5. Collection ID: `notifications`
6. Add fields:
   - Field path: `userId`, Order: `Ascending`
   - Field path: `createdAt`, Order: `Descending`
7. Click "Create"

### 2. Chat Messages Collection Index

**Collection:** `chatMessages`
**Fields:**
- `orderId` (Ascending)
- `createdAt` (Ascending)

**Steps:**
1. Go to Firebase Console
2. Navigate to Firestore Database
3. Click on "Indexes" tab
4. Click "Create Index"
5. Collection ID: `chatMessages`
6. Add fields:
   - Field path: `orderId`, Order: `Ascending`
   - Field path: `createdAt`, Order: `Ascending`
7. Click "Create"

## Alternative: Using Firebase CLI

If you have Firebase CLI installed, you can deploy the indexes using:

```bash
firebase deploy --only firestore:indexes
```

This will use the `firebase.indexes.json` file in the root directory.

## Index Status

After creating the indexes, they will be in "Building" status. This process can take a few minutes. Once the status changes to "Enabled", the index errors should be resolved.

## Troubleshooting

If you still see index errors after creating the indexes:

1. Wait a few minutes for the indexes to finish building
2. Check the Firebase Console to ensure the indexes are "Enabled"
3. Restart your development server
4. Clear your browser cache 