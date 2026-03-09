import { createClient } from "@libsql/client/web";

let client;

export function getDb() {
  if (!client) {
    client = createClient({
      url: process.env.TURSO_DATABASE_URL,
      authToken: process.env.TURSO_AUTH_TOKEN,
    });
  }
  return client;
}

export async function initSchema() {
  const db = getDb();
  await db.executeMultiple(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      display_name TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      is_admin INTEGER DEFAULT 0
    );
    CREATE TABLE IF NOT EXISTS bookmarks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      book_id TEXT NOT NULL,
      chapter INTEGER NOT NULL,
      verse INTEGER DEFAULT 1,
      notes TEXT DEFAULT '',
      updated_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id),
      UNIQUE(user_id)
    );
  `);
}

export async function findUserByUsername(username) {
  const db = getDb();
  const result = await db.execute({ sql: "SELECT * FROM users WHERE username = ?", args: [username] });
  return result.rows[0] || null;
}

export async function createUser(username, passwordHash, displayName, isAdmin = false) {
  const db = getDb();
  return db.execute({
    sql: "INSERT INTO users (username, password_hash, display_name, is_admin) VALUES (?, ?, ?, ?)",
    args: [username, passwordHash, displayName || username, isAdmin ? 1 : 0],
  });
}

export async function getUserById(userId) {
  const db = getDb();
  const result = await db.execute({
    sql: "SELECT id, username, display_name FROM users WHERE id = ?",
    args: [userId],
  });
  return result.rows[0] || null;
}

export async function getBookmark(userId) {
  const db = getDb();
  const result = await db.execute({ sql: "SELECT * FROM bookmarks WHERE user_id = ?", args: [userId] });
  return result.rows[0] || null;
}

export async function upsertBookmark(userId, bookId, chapter, verse, notes) {
  const db = getDb();
  return db.execute({
    sql: `INSERT INTO bookmarks (user_id, book_id, chapter, verse, notes, updated_at)
          VALUES (?, ?, ?, ?, ?, datetime('now'))
          ON CONFLICT(user_id) DO UPDATE SET
            book_id = excluded.book_id, chapter = excluded.chapter,
            verse = excluded.verse, notes = excluded.notes,
            updated_at = datetime('now')`,
    args: [userId, bookId, chapter, verse, notes || ""],
  });
}
