import serverless from "serverless-http";
import express from "express";

// Minimal placeholder (replace with real admin APIs if needed)
const app = express();
app.get("/api/health", (_req, res) => res.json({ ok: true }));

export const handler = serverless(app);
