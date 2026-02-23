import { db } from "../config/db";

function migrate() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS daily_prices (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ticker TEXT NOT NULL,
      date TEXT NOT NULL,
      open REAL NOT NULL,
      high REAL NOT NULL,
      low REAL NOT NULL,
      close REAL NOT NULL,
      volume INTEGER NOT NULL,
      value_traded REAL,
      created_at TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_prices_ticker_date
    ON daily_prices (ticker, date);

    CREATE TABLE IF NOT EXISTS corporate_events_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ticker TEXT NOT NULL,
      event_type TEXT NOT NULL,
      rups_date TEXT,
      cum_date TEXT,
      ex_date TEXT,
      dividend_amount REAL,
      announcement_date TEXT NOT NULL,
      source_url TEXT,
      scrape_timestamp TEXT NOT NULL,
      dataset_version TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_corp_ticker_announce
    ON corporate_events_history (ticker, announcement_date);

    CREATE TABLE IF NOT EXISTS quarterly_reports_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ticker TEXT NOT NULL,
      year INTEGER NOT NULL,
      quarter INTEGER NOT NULL,
      net_income REAL NOT NULL,
      eps REAL NOT NULL,
      report_release_date TEXT NOT NULL,
      dataset_version TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_qr_ticker_release
    ON quarterly_reports_history (ticker, report_release_date);

    CREATE TABLE IF NOT EXISTS free_float_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ticker TEXT NOT NULL,
      effective_date TEXT NOT NULL,
      free_float_shares INTEGER NOT NULL,
      shares_outstanding INTEGER NOT NULL,
      free_float_percentage REAL NOT NULL,
      dataset_version TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_float_ticker_effective
    ON free_float_history (ticker, effective_date);

    CREATE TABLE IF NOT EXISTS sector_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ticker TEXT NOT NULL,
      sector TEXT NOT NULL,
      effective_date TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS dataset_meta (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      dataset_version TEXT NOT NULL,
      freeze_date TEXT NOT NULL,
      description TEXT
    );
  `);

  console.log("Migration completed successfully.");
}

migrate();
