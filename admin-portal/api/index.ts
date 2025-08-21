import serverless from "serverless-http";
import express from "express";

// Minimal admin API placeholder
const app = express();

// Middleware
app.use(express.json());

// Health check
app.get("/api/health", (_req, res) => res.json({ ok: true }));

// Consistent endpoints with other apps
app.get("/api/ping", (_req, res) => {
  res.json({ message: "Hello from Admin API" });
});

app.get("/api/demo", (_req, res) => {
  res.status(200).json({ message: "Hello from Admin API" });
});

const handler = serverless(app);

export default async (req: any, res: any) => {
  await handler(req, res);
};
