App Check and Storage CORS setup

App Check (reCAPTCHA v3)
1) Create a reCAPTCHA v3 site key in Firebase Console > Build > App Check
2) Add your app origin(s):
   - Local: http://localhost:5173, 5174, 5175
   - Production domains
3) Put the site key into each app's .env(.production): VITE_APP_CHECK_SITE_KEY
4) For local dev, set VITE_APP_CHECK_DEBUG_TOKEN to any string and enable debug token in the browser console per Firebase docs.
5) We initialize App Check in firebase.ts when the key is present.

Enforce App Check
- After confirming clients send valid tokens, enable enforcement in:
  - Firestore Rules (Console toggle)
  - Storage Rules (Console toggle)

Cloud Storage CORS
- Edit firebase/storage.cors.json with your real domains.
- Apply via gsutil or Firebase Console:

Using gsutil:
  gsutil cors set firebase/storage.cors.json gs://<your-storage-bucket>

Note: gsutil requires Google Cloud SDK. Alternatively, set CORS in Cloud Console > Storage > Browser > Bucket > Configuration > CORS.
