// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string,
  appId: import.meta.env.VITE_FIREBASE_APP_ID as string,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID as string,
};

// Basic validation & redaction for production diagnostics
const forcedDebug = typeof window !== 'undefined' && window.location.search.includes('forceLog=1');
const debugEnabled = !!import.meta.env.VITE_ENABLE_AUTH_DEBUG || forcedDebug || import.meta.env.DEV;
if (debugEnabled) {
  try {
    const redacted: Record<string,string|undefined> = {};
    Object.entries(firebaseConfig).forEach(([k,v]) => { redacted[k] = v ? (String(v).length > 8 ? String(v).slice(0,4)+"…"+String(v).slice(-2) : v) : undefined; });
    const missing = Object.entries(firebaseConfig).filter(([_,v]) => !v).map(([k]) => k);
    // eslint-disable-next-line no-console
    console.log('[Firebase] Config summary', redacted, 'missing', missing);
    if (missing.length) {
      // eslint-disable-next-line no-console
      console.warn('[Firebase] Missing Firebase environment variables:', missing.join(', '));
    }
  } catch(e) {
    // eslint-disable-next-line no-console
    console.warn('[Firebase] Config inspection failed', e);
  }
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize App Check (optional, enabled when site key provided)
const appCheckSiteKey = import.meta.env.VITE_APP_CHECK_SITE_KEY as string | undefined;
if (import.meta.env.DEV && import.meta.env.VITE_APP_CHECK_DEBUG_TOKEN) {
  // @ts-ignore - provided by Firebase App Check in runtime
  (self as any).FIREBASE_APPCHECK_DEBUG_TOKEN = import.meta.env.VITE_APP_CHECK_DEBUG_TOKEN;
}
if (appCheckSiteKey) {
  initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(appCheckSiteKey),
    isTokenAutoRefreshEnabled: true,
  });
}

// Initialize Firebase services
export const auth = getAuth(app);
console.log('[Firebase] Initialized app', app.name, 'Auth domain', import.meta.env.VITE_FIREBASE_AUTH_DOMAIN, 'debug', debugEnabled);

setPersistence(auth, browserLocalPersistence).then(()=>{
  console.log('[Firebase] Auth persistence set to local');
}).catch((e) => {
  console.warn('Failed to set auth persistence', e);
});

export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;