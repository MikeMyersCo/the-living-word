import { getUserIdFromRequest, unauthorized } from "../../../lib/auth.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const userId = getUserIdFromRequest(req);
  if (!userId) return unauthorized(res);

  const { bookNum, chapter } = req.query;

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

    res.setHeader("Cache-Control", "public, max-age=86400, s-maxage=86400");
    res.json(result);
  } catch (error) {
    console.error("Bible API Error:", error.message);
    res.status(500).json({ error: "Failed to fetch scripture text" });
  }
}
