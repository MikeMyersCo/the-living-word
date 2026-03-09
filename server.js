import Anthropic from "@anthropic-ai/sdk";
import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { serialize, parse } from "cookie";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.static(__dirname));

const APP_PASSWORD = process.env.APP_PASSWORD || "nowebs4U12345!";

// ─── Auth endpoint ───
app.post("/api/auth", (req, res) => {
  const { password } = req.body;

  if (password === APP_PASSWORD) {
    const authCookie = serialize("auth_token", "authenticated", {
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
    return res.json({ success: true });
  }

  return res.status(401).json({ error: "Invalid password" });
});

// ─── Auth middleware for API routes ───
function requireAuth(req, res, next) {
  const cookies = parse(req.headers.cookie || "");
  if (cookies.auth_token !== "authenticated") {
    return res.status(401).json({ error: "Not authenticated" });
  }
  next();
}

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n  ✦ NT Study Companion running at http://localhost:${PORT}\n`);
});
