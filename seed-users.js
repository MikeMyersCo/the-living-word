#!/usr/bin/env node
// Re-run this after a fresh deploy to set up users
// Usage: node seed-users.js

import bcrypt from "bcryptjs";
import { findUserByUsername, createUser } from "./db.js";

const users = [
  { username: "admin", password: "nowebs4U12345!", display: "Admin", admin: true },
  { username: "mmyers", password: "warri0r!", display: "Mike Myers", admin: false },
];

for (const u of users) {
  if (findUserByUsername(u.username)) {
    console.log(`  · "${u.username}" already exists, skipping.`);
    continue;
  }
  const hash = bcrypt.hashSync(u.password, 12);
  createUser(u.username, hash, u.display, u.admin);
  console.log(`  ✦ Created "${u.username}"${u.admin ? " (admin)" : ""}`);
}

console.log("  Done.");
