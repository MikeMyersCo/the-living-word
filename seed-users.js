#!/usr/bin/env node
// Re-run this after a fresh deploy to set up users
// Usage: TURSO_DATABASE_URL=... TURSO_AUTH_TOKEN=... node seed-users.js

import bcrypt from "bcryptjs";
import { initSchema, findUserByUsername, createUser } from "./lib/db.js";

const users = [
  { username: "admin", password: "nowebs4U12345!", display: "Admin", admin: true },
  { username: "mmyers", password: "warri0r!", display: "Mike Myers", admin: false },
];

await initSchema();

for (const u of users) {
  const existing = await findUserByUsername(u.username);
  if (existing) {
    console.log(`  · "${u.username}" already exists, skipping.`);
    continue;
  }
  const hash = bcrypt.hashSync(u.password, 12);
  await createUser(u.username, hash, u.display, u.admin);
  console.log(`  ✦ Created "${u.username}"${u.admin ? " (admin)" : ""}`);
}

console.log("  Done.");
