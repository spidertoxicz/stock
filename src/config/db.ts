import Database from "better-sqlite3";
import path from "path";

const dbPath = path.resolve(__dirname, "../../engine.db");

export const db = new Database(dbPath);

db.pragma("journal_mode = WAL");

console.log("Connected to SQLite database:", dbPath);
