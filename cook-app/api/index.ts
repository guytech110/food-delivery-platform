import type { VercelRequest, VercelResponse } from "@vercel/node";
import serverless from "serverless-http";
import { createServer } from "../server";

const handler = serverless(createServer());

export default async (req: VercelRequest, res: VercelResponse) => {
  await handler(req as any, res as any);
};
