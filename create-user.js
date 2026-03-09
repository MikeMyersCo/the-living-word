#!/usr/bin/env node
// Usage: TURSO_DATABASE_URL=... TURSO_AUTH_TOKEN=... node create-user.js <username> <password> [options]
import bcrypt from "bcryptjs";
import { initSchema, findUserByUsername, createUser } from "./lib/db.js";

const args = process.argv.slice(2);

if (args.length < 2) {
  console.log(`
  Usage: node create-user.js <username> <password> [options]

  Options:
    --display "Name"   Display name (defaults to username)
    --admin            Make this user an admin

  Requires TURSO_DATABASE_URL and TURSO_AUTH_TOKEN env vars.

  Examples:
    node create-user.js admin "nowebs4U12345!" --admin
    node create-user.js mike "password123" --display "Mike"
  `);
  process.exit(1);
}

const username = args[0];
const password = args[1];
const isAdmin = args.includes("--admin");
const displayIdx = args.indexOf("--display");
const displayName = displayIdx !== -1 ? args[displayIdx + 1] : username;

await initSchema();

const existing = await findUserByUsername(username);
if (existing) {
  console.error(`  ✗ User "${username}" already exists.`);
  process.exit(1);
}

const hash = bcrypt.hashSync(password, 12);
await createUser(username, hash, displayName, isAdmin);

console.log(`  ✦ User "${username}" created${isAdmin ? " (admin)" : ""}.`);
