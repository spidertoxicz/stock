🧱 DATABASE SCHEMA v1.0
Engine: Dividend Cycle Mode A
Status: FOUNDATION LOCK
1️⃣ TABLE: daily_prices
SQL
Salin kode
CREATE TABLE daily_prices (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ticker TEXT NOT NULL,
    date TEXT NOT NULL,                -- YYYY-MM-DD
    open REAL NOT NULL,
    high REAL NOT NULL,
    low REAL NOT NULL,
    close REAL NOT NULL,
    volume INTEGER NOT NULL,
    value_traded REAL,
    created_at TEXT NOT NULL
);
Index
SQL
Salin kode
CREATE INDEX idx_prices_ticker_date 
ON daily_prices (ticker, date);
⚠ No overwrite rule. Jika data revisi → insert ulang dengan dataset_version.
2️⃣ TABLE: corporate_events_history
SQL
Salin kode
CREATE TABLE corporate_events_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ticker TEXT NOT NULL,
    event_type TEXT NOT NULL,          -- DIVIDEND, RUPS, SPLIT, etc
    rups_date TEXT,
    cum_date TEXT,
    ex_date TEXT,
    dividend_amount REAL,
    announcement_date TEXT NOT NULL,
    source_url TEXT,
    scrape_timestamp TEXT NOT NULL,
    dataset_version TEXT NOT NULL
);
Rule: announcement_date wajib. Engine tidak boleh pakai event sebelum tanggal ini.
Index:
SQL
Salin kode
CREATE INDEX idx_corp_ticker_announce
ON corporate_events_history (ticker, announcement_date);
3️⃣ TABLE: quarterly_reports_history
SQL
Salin kode
CREATE TABLE quarterly_reports_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ticker TEXT NOT NULL,
    year INTEGER NOT NULL,
    quarter INTEGER NOT NULL,          -- 1-4
    net_income REAL NOT NULL,
    eps REAL NOT NULL,
    report_release_date TEXT NOT NULL,
    dataset_version TEXT NOT NULL
);
Index:
SQL
Salin kode
CREATE INDEX idx_qr_ticker_release
ON quarterly_reports_history (ticker, report_release_date);
⚠ Engine tidak boleh pakai data sebelum report_release_date.
4️⃣ TABLE: free_float_history
SQL
Salin kode
CREATE TABLE free_float_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ticker TEXT NOT NULL,
    effective_date TEXT NOT NULL,
    free_float_shares INTEGER NOT NULL,
    shares_outstanding INTEGER NOT NULL,
    free_float_percentage REAL NOT NULL,
    dataset_version TEXT NOT NULL
);
Index:
SQL
Salin kode
CREATE INDEX idx_float_ticker_effective
ON free_float_history (ticker, effective_date);
Float snapshot berlaku sampai ada snapshot baru.
5️⃣ TABLE: sector_history
SQL
Salin kode
CREATE TABLE sector_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ticker TEXT NOT NULL,
    sector TEXT NOT NULL,
    effective_date TEXT NOT NULL
);
6️⃣ TABLE: dataset_meta
Untuk freeze & reproducibility.
SQL
Salin kode
CREATE TABLE dataset_meta (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    dataset_version TEXT NOT NULL,
    freeze_date TEXT NOT NULL,
    description TEXT
);
🔒 DATA RULES (HARD)
Tidak ada UPDATE.
Tidak ada DELETE.
Hanya INSERT.
Gunakan dataset_version jika revisi.
Replay engine wajib pakai dataset_version spesifik.
Ini membuat backtest reproducible.
🧠 Kenapa Tidak Over-Complicated?
Tidak ada:
Foreign key strict
Join cascade
Trigger
Event sourcing rumit
Karena kita mau fleksibel.
Tapi tetap deterministic.
