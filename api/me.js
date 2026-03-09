import { getUserIdFromRequest, unauthorized } from "../lib/auth.js";
import { initSchema, getUserById, getBookmark } from "../lib/db.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  await initSchema();

  const userId = getUserIdFromRequest(req);
  if (!userId) return unauthorized(res);

  const user = await getUserById(userId);
  if (!user) return res.status(401).json({ error: "User not found" });

  const bookmark = await getBookmark(userId);

  res.json({
    user: { id: user.id, username: user.username, displayName: user.display_name },
    bookmark: bookmark
      ? { bookId: bookmark.book_id, chapter: bookmark.chapter, verse: bookmark.verse, notes: bookmark.notes, updatedAt: bookmark.updated_at }
      : null,
  });
}
