import { createHmac } from "crypto";
import { parse } from "cookie";

export function signToken(userId) {
  const secret = process.env.SESSION_SECRET;
  const payload = Buffer.from(`${userId}:${Date.now()}`).toString("base64");
  const sig = createHmac("sha256", secret).update(payload).digest("hex");
  return `${payload}.${sig}`;
}

export function verifyToken(token) {
  if (!token || !token.includes(".")) return null;
  const secret = process.env.SESSION_SECRET;
  const [payload, sig] = token.split(".");
  const expected = createHmac("sha256", secret).update(payload).digest("hex");
  if (sig !== expected) return null;
  const decoded = Buffer.from(payload, "base64").toString();
  const userId = parseInt(decoded.split(":")[0]);
  return isNaN(userId) ? null : userId;
}

export function getUserIdFromRequest(req) {
  const cookies = parse(req.headers.cookie || "");
  return verifyToken(cookies.auth_token);
}

export function unauthorized(res) {
  return res.status(401).json({ error: "Not authenticated" });
}
