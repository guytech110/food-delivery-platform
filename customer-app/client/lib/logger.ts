export const logger = {
  debug: (...args: any[]) => {
    if (import.meta.env.DEV) console.debug(...args);
  },
  log: (...args: any[]) => {
    if (import.meta.env.DEV) console.log(...args);
  },
  warn: (...args: any[]) => {
    if (import.meta.env.DEV) console.warn(...args);
  },
  error: (...args: any[]) => {
    // Always log errors; keep messages minimal in production
    console.error(...args);
  },
};
