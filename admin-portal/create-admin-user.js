// Script to create an admin user in Firebase
// Run this script with: node create-admin-user.js

// Load environment variables (supports ENV_FILE override and production mode)
const dotenv = require('dotenv');
const envFile = process.env.ENV_FILE || (process.env.NODE_ENV === 'production' ? '.env.production' : '.env');
dotenv.config({ path: envFile });

const { initializeApp } = require('firebase/app');
const { getAuth, createUserWithEmailAndPassword } = require('firebase/auth');
const { getFirestore, doc, setDoc } = require('firebase/firestore');

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
  measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID,
};

if (!firebaseConfig.apiKey || !firebaseConfig.projectId || !firebaseConfig.appId) {
  console.error('Missing Firebase environment variables. Please set VITE_FIREBASE_* in the env file.');
  process.exit(1);
}

const email = process.env.SEED_ADMIN_EMAIL;
const password = process.env.SEED_ADMIN_PASSWORD;

if (!email || !password) {
  console.error('Missing SEED_ADMIN_EMAIL or SEED_ADMIN_PASSWORD. Set them in env before running.');
  process.exit(1);
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

async function createAdminUser() {
  try {
    console.log('Creating admin user...');

    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    console.log('User created successfully:', user.uid);

    // Create user document in Firestore with admin role under users/{uid}
    await setDoc(doc(db, 'users', user.uid), {
      id: user.uid,
      name: 'Admin User',
      email: email,
      role: 'admin',
      createdAt: new Date(),
      lastLogin: new Date(),
    }, { merge: true });

    console.log('Admin profile created under users/{uid} with role "admin"');
    console.log('Admin email:', email);
    console.log('Password is set via SEED_ADMIN_PASSWORD (not printed).');
    console.log('You can now log in to the admin portal.');
  } catch (error) {
    console.error('Error creating admin user:', error);
    if (error.code === 'auth/email-already-in-use') {
      console.log('User already exists. Try logging in with the seeded credentials.');
    }
  }
}

createAdminUser();