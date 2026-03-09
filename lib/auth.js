import { createHmac } from "crypto";

function parseCookies(str) {
  const obj = {};
  if (!str) return obj;
  for (const pair of str.split(";")) {
    const idx = pair.indexOf("=");
    if (idx < 0) continue;
    const key = pair.substring(0, idx).trim();
    const val = pair.substring(idx + 1).trim();
    obj[key] = decodeURIComponent(val);
  }
  return obj;
}

export function serializeCookie(name, value, opts = {}) {
  let str = `${name}=${encodeURIComponent(value)}`;
  if (opts.maxAge != null) str += `; Max-Age=${opts.maxAge}`;
  if (opts.path) str += `; Path=${opts.path}`;
  if (opts.httpOnly) str += "; HttpOnly";
  if (opts.secure) str += "; Secure";
  if (opts.sameSite) str += `; SameSite=${opts.sameSite}`;
  return str;
}

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
  const cookies = parseCookies(req.headers.cookie);
  return verifyToken(cookies.auth_token);
}

export function unauthorized(res) {
  return res.status(401).json({ error: "Not authenticated" });
}
