import { db } from "./config/db";

const rows = db.prepare("SELECT * FROM daily_prices").all();

console.log("Daily Prices Snapshot:");
console.table(rows);
