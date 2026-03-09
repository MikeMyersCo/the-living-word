import Database from "better-sqlite3";
import { mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DB_PATH = join(__dirname, "data", "app.db");

mkdirSync(join(__dirname, "data"), { recursive: true });

const db = new Database(DB_PATH);
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

// ─── Schema ───
db.exec(`
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

// ─── User queries ───
export function findUserByUsername(username) {
  return db.prepare("SELECT * FROM users WHERE username = ?").get(username);
}

export function createUser(username, passwordHash, displayName, isAdmin = false) {
  return db.prepare(
    "INSERT INTO users (username, password_hash, display_name, is_admin) VALUES (?, ?, ?, ?)"
  ).run(username, passwordHash, displayName || username, isAdmin ? 1 : 0);
}

// ─── Bookmark queries ───
export function getBookmark(userId) {
  return db.prepare("SELECT * FROM bookmarks WHERE user_id = ?").get(userId);
}

export function upsertBookmark(userId, bookId, chapter, verse, notes) {
  return db.prepare(`
    INSERT INTO bookmarks (user_id, book_id, chapter, verse, notes, updated_at)
    VALUES (?, ?, ?, ?, ?, datetime('now'))
    ON CONFLICT(user_id) DO UPDATE SET
      book_id = excluded.book_id,
      chapter = excluded.chapter,
      verse = excluded.verse,
      notes = excluded.notes,
      updated_at = datetime('now')
  `).run(userId, bookId, chapter, verse, notes || "");
}

export default db;
