import React from 'react';
import { useAuth } from "../contexts/AuthContext";
import { auth } from "../lib/firebase";

export default function AuthDebug() {
  const { user, isLoading, authReady } = useAuth() as any;
  const meta = auth.currentUser?.metadata;

  return (
    <pre style={{ padding: 16, whiteSpace: "pre-wrap" }}>
      {JSON.stringify({
        authReady,
        isLoading,
        user,
        firebaseUser: auth.currentUser
          ? {
              uid: auth.currentUser.uid,
              email: auth.currentUser.email,
              creationTime: meta?.creationTime,
              lastSignInTime: meta?.lastSignInTime,
            }
          : null,
      }, null, 2)}
    </pre>
  );
}
