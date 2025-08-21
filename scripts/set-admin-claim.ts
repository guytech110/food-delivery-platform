/*
  Set Firebase custom claims (role=admin) for a user.
  Usage:
    ts-node scripts/set-admin-claim.ts <uid>
  or compile to JS and run with node.
*/

import 'dotenv/config';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFunctions, httpsCallable } from 'firebase/functions';

const email = process.env.SEED_ADMIN_EMAIL as string;
const password = process.env.SEED_ADMIN_PASSWORD as string;

if (!email || !password) {
  console.error('Missing SEED_ADMIN_EMAIL or SEED_ADMIN_PASSWORD.');
  process.exit(1);
}

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};

async function main() {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const functions = getFunctions(app);

  await signInWithEmailAndPassword(auth, email, password);

  const setAdmin = httpsCallable(functions, 'setAdminClaim');
  const uid = process.argv[2];
  if (!uid) {
    console.error('Usage: node set-admin-claim.js <uid>');
    process.exit(1);
  }

  const result = await setAdmin({ uid });
  console.log('Custom claim set result:', result.data);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
