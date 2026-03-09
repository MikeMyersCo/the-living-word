import bcrypt from "bcryptjs";
import { signToken, serializeCookie } from "../lib/auth.js";
import { initSchema, findUserByUsername } from "../lib/db.js";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    await initSchema();

    const { username, password } = req.body || {};
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password required" });
    }

    const user = await findUserByUsername(username);
    if (!user || !bcrypt.compareSync(password, user.password_hash)) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = signToken(user.id);
    const maxAge = 60 * 60 * 24 * 30;

    const authCookie = serializeCookie("auth_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge,
    });

    const flagCookie = serializeCookie("logged_in", "1", {
      httpOnly: false,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge,
    });

    res.setHeader("Set-Cookie", [authCookie, flagCookie]);
    return res.status(200).json({
      success: true,
      user: { id: user.id, username: user.username, displayName: user.display_name },
    });
  } catch (e) {
    return res.status(500).json({ error: e.message, stack: e.stack?.split("\n").slice(0, 8) });
  }
}
