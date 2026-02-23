import { db } from "../config/db";

function seed() {
  const now = new Date().toISOString();

  db.prepare(`
    INSERT INTO daily_prices 
    (ticker, date, open, high, low, close, volume, value_traded, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run("TEST", "2023-01-02", 100, 105, 99, 104, 1000000, 104000000, now);

  db.prepare(`
    INSERT INTO corporate_events_history
    (ticker, event_type, rups_date, cum_date, ex_date, dividend_amount, announcement_date, source_url, scrape_timestamp, dataset_version)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    "TEST",
    "DIVIDEND",
    "2023-03-30",
    "2023-04-10",
    "2023-04-11",
    50,
    "2023-02-20",
    "https://example.com",
    now,
    "v1.0"
  );

  console.log("Seed data inserted.");
}

seed();
