// Script to create an admin user in Firebase
// Run this script with: node create-admin-user.js

const { initializeApp } = require('firebase/app');
const { getAuth, createUserWithEmailAndPassword } = require('firebase/auth');
const { getFirestore, doc, setDoc } = require('firebase/firestore');

// Your Firebase configuration (copy from your firebase.ts file)
const firebaseConfig = {
  apiKey: "AIzaSyBXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

async function createAdminUser() {
  try {
    const email = 'admin@fooddelivery.com';
    const password = 'admin123456'; // Change this to a secure password
    
    console.log('Creating admin user...');
    
    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    console.log('User created successfully:', user.uid);
    
    // Create user document in Firestore with admin role
    await setDoc(doc(db, 'users', user.uid), {
      id: user.uid,
      name: 'Admin User',
      email: email,
      role: 'admin',
      phoneNumber: '+1 (555) 123-4567',
      deliveryAddress: 'Admin Address',
      allergies: [],
      createdAt: new Date(),
      lastLogin: new Date(),
      isActive: true
    });
    
    console.log('Admin user document created successfully');
    console.log('Admin credentials:');
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('You can now log in to the admin portal at http://localhost:5174/login');
    
  } catch (error) {
    console.error('Error creating admin user:', error);
    
    if (error.code === 'auth/email-already-in-use') {
      console.log('User already exists. You can try logging in with:');
      console.log('Email: admin@fooddelivery.com');
      console.log('Password: admin123456');
    }
  }
}

createAdminUser(); 