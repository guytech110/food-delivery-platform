import React from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function DebugAuth() {
  const { diag } = useAuth();
  const d = diag();
  return (
    <div style={{ fontFamily: 'monospace', padding: 16 }}>
      <h1>Auth Debug</h1>
      <p>Use ?forceLog=1 in URL to increase logging verbosity.</p>
      <section>
        <h2>State</h2>
        <pre>{JSON.stringify({
          user: d.user,
          rawFirebaseUser: d.rawFirebaseUser,
          isLoading: d.isLoading,
        }, null, 2)}</pre>
      </section>
      <section>
        <h2>Recent Events</h2>
        <ul>
          {d.lastEvents.slice().reverse().map(ev => (
            <li key={ev.ts+ev.type}>
              <strong>{new Date(ev.ts).toISOString()}</strong> {ev.type}
              {ev.info && <pre style={{whiteSpace:'pre-wrap'}}>{JSON.stringify(ev.info, null, 2)}</pre>}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
