import Anthropic from "@anthropic-ai/sdk";
import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { serialize, parse } from "cookie";
import { randomBytes, createHmac } from "crypto";
import bcrypt from "bcryptjs";
import db, { findUserByUsername, getBookmark, upsertBookmark } from "./db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.static(__dirname));

const SESSION_SECRET = process.env.SESSION_SECRET || randomBytes(32).toString("hex");

function signToken(userId) {
  const payload = Buffer.from(`${userId}:${Date.now()}`).toString("base64");
  const sig = createHmac("sha256", SESSION_SECRET).update(payload).digest("hex");
  return `${payload}.${sig}`;
}

function verifyToken(token) {
  if (!token || !token.includes(".")) return null;
  const [payload, sig] = token.split(".");
  const expected = createHmac("sha256", SESSION_SECRET).update(payload).digest("hex");
  if (sig !== expected) return null;
  const decoded = Buffer.from(payload, "base64").toString();
  const userId = parseInt(decoded.split(":")[0]);
  return isNaN(userId) ? null : userId;
}

// ─── Auth endpoint ───
app.post("/api/auth", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password required" });
  }

  const user = findUserByUsername(username);
  if (!user || !bcrypt.compareSync(password, user.password_hash)) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = signToken(user.id);

  const authCookie = serialize("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  const flagCookie = serialize("logged_in", "1", {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  res.setHeader("Set-Cookie", [authCookie, flagCookie]);
  return res.json({
    success: true,
    user: { id: user.id, username: user.username, displayName: user.display_name },
  });
});

// ─── Auth middleware ───
function requireAuth(req, res, next) {
  const cookies = parse(req.headers.cookie || "");
  const userId = verifyToken(cookies.auth_token);
  if (!userId) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  req.userId = userId;
  next();
}

// ─── Current user + bookmark ───
app.get("/api/me", requireAuth, (req, res) => {
  const user = db.prepare("SELECT id, username, display_name FROM users WHERE id = ?").get(req.userId);
  if (!user) return res.status(401).json({ error: "User not found" });

  const bookmark = getBookmark(req.userId);
  res.json({
    user: { id: user.id, username: user.username, displayName: user.display_name },
    bookmark: bookmark
      ? { bookId: bookmark.book_id, chapter: bookmark.chapter, verse: bookmark.verse, notes: bookmark.notes, updatedAt: bookmark.updated_at }
      : null,
  });
});

// ─── Bookmark endpoints ───
app.get("/api/bookmark", requireAuth, (req, res) => {
  const bookmark = getBookmark(req.userId);
  res.json(
    bookmark
      ? { bookId: bookmark.book_id, chapter: bookmark.chapter, verse: bookmark.verse, notes: bookmark.notes, updatedAt: bookmark.updated_at }
      : null
  );
});

app.put("/api/bookmark", requireAuth, (req, res) => {
  const { bookId, chapter, verse, notes } = req.body;
  if (!bookId || !chapter) {
    return res.status(400).json({ error: "bookId and chapter are required" });
  }
  upsertBookmark(req.userId, bookId, chapter, verse || 1, notes || "");
  res.json({ success: true });
});

// ─── Scholar AI endpoint ───
app.post("/api/ask", requireAuth, async (req, res) => {
  const { question, bookContext } = req.body;

  if (!question) {
    return res.status(400).json({ error: "Question is required" });
  }

  const systemPrompt = `You are a warm, knowledgeable New Testament scholar and Bible teacher. You provide historically accurate, well-sourced information about the New Testament books, their authors, historical context, geography, and theology.

Your responses should be:
- Academically informed but accessible to everyday readers
- Respectful of the Christian faith tradition
- Rich with historical detail and cultural context
- Clear about when something is scholarly consensus vs. debated

When discussing authorship or dating, present the traditional view first, then note scholarly discussions where relevant.

Format your responses with clear paragraphs. Use **bold** for key terms and names. You may use bullet points for lists.

${bookContext ? `The user is currently studying: ${bookContext}` : ""}`;

  try {
    const anthropic = new Anthropic();

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1500,
      system: systemPrompt,
      messages: [{ role: "user", content: question }],
    });

    const text = message.content
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("");

    res.json({ answer: text });
  } catch (error) {
    console.error("API Error:", error.message);
    res.status(500).json({ error: "Failed to get response from AI scholar" });
  }
});

// ─── Bible text proxy (bolls.life NIV) with caching ───
const bibleCache = new Map();

app.get("/api/bible/:bookNum/:chapter", requireAuth, async (req, res) => {
  const { bookNum, chapter } = req.params;
  const cacheKey = `${bookNum}:${chapter}`;

  if (bibleCache.has(cacheKey)) {
    return res.json(bibleCache.get(cacheKey));
  }

  try {
    const url = `https://bolls.life/get-chapter/NIV/${bookNum}/${chapter}/`;
    const response = await fetch(url);

    if (!response.ok) {
      return res.status(response.status).json({ error: "Failed to fetch scripture" });
    }

    const data = await response.json();
    const result = {
      reference: req.query.ref || `Chapter ${chapter}`,
      verses: data.map((v) => ({
        verse: v.verse,
        text: v.text.replace(/^[^<]*<br\s*\/?>/i, "").replace(/<[^>]*>/g, "").trim(),
      })),
    };

    bibleCache.set(cacheKey, result);
    res.json(result);
  } catch (error) {
    console.error("Bible API Error:", error.message);
    res.status(500).json({ error: "Failed to fetch scripture text" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n  ✦ NT Study Companion running at http://localhost:${PORT}\n`);
});
