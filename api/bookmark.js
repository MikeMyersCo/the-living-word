import { getUserIdFromRequest, unauthorized } from "../lib/auth.js";
import { initSchema, getBookmark, upsertBookmark } from "../lib/db.js";

export default async function handler(req, res) {
  await initSchema();

  const userId = getUserIdFromRequest(req);
  if (!userId) return unauthorized(res);

  if (req.method === "GET") {
    const bookmark = await getBookmark(userId);
    return res.json(
      bookmark
        ? { bookId: bookmark.book_id, chapter: bookmark.chapter, verse: bookmark.verse, notes: bookmark.notes, updatedAt: bookmark.updated_at }
        : null
    );
  }

  if (req.method === "PUT") {
    const { bookId, chapter, verse, notes } = req.body || {};
    if (!bookId || !chapter) {
      return res.status(400).json({ error: "bookId and chapter are required" });
    }
    await upsertBookmark(userId, bookId, chapter, verse || 1, notes || "");
    return res.json({ success: true });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
