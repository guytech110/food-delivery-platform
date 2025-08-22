export function isAuthBypassEnabled() {
  // Enable with env var or ?auth_bypass=1 (which writes to sessionStorage)
  const env = import.meta.env.VITE_AUTH_BYPASS === '1';
  const session = typeof window !== 'undefined' && sessionStorage.getItem('AUTH_BYPASS') === '1';
  return env || session;
}

export function maybeEnableBypassFromQuery() {
  if (typeof window === 'undefined') return;
  const params = new URLSearchParams(window.location.search);
  if (params.get('auth_bypass') === '1') {
    sessionStorage.setItem('AUTH_BYPASS', '1');
    console.log('[AuthBypass] Enabled via query parameter');
  }
  if (params.get('auth_bypass') === '0') {
    sessionStorage.removeItem('AUTH_BYPASS');
    console.log('[AuthBypass] Disabled via query parameter');
  }
}

// Clear any session-scoped auth bypass (used on logout)
export function clearAuthBypass() {
  if (typeof window !== 'undefined') sessionStorage.removeItem('AUTH_BYPASS');
}
