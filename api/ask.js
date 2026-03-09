import Anthropic from "@anthropic-ai/sdk";
import { getUserIdFromRequest, unauthorized } from "../lib/auth.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const userId = getUserIdFromRequest(req);
  if (!userId) return unauthorized(res);

  const { question, bookContext } = req.body || {};
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
}
