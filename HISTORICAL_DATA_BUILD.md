🧱 HISTORICAL DATA BUILD SPEC v1.0
Mode: Dividend Cycle Engine
Status: FOUNDATION LOCK
Tujuan:
Membangun dataset historis 3–5 tahun yang bersih, snapshot-consistent, dan replayable.
Tanpa data bersih → tidak ada backtest valid.
1️⃣ DATA CATEGORIES (MANDATORY)
Dataset dibagi 5 domain terpisah:
📈 A. MARKET DATA (DAILY LEDGER)
Per ticker, per hari:
Plain text
Salin kode
Date
Open
High
Low
Close
Volume
Value_Traded
Constraint:
Tidak boleh ada missing trading day
Corporate action adjustment tidak boleh diubah retroaktif
Gunakan raw historical price (bukan adjusted future split)
🏛 B. CORPORATE ACTION LEDGER
Per event historis:
Plain text
Salin kode
Ticker
RUPS_Date
Cum_Date
Ex_Date
Dividend_Amount
Announcement_Date
Source
WAJIB:
Timestamp kapan info tersedia publik
Tidak boleh pakai tanggal RUPS tanpa announcement timestamp
Kenapa?
Backtest tidak boleh tahu event sebelum diumumkan.
📊 C. QUARTERLY EARNINGS LEDGER
Per ticker, per quarter:
Plain text
Salin kode
Ticker
Year
Quarter
Net_Income
EPS
Report_Release_Date
WAJIB:
Report_Release_Date historis
Jangan gunakan data sebelum tanggal rilis
🏦 D. FREE FLOAT SNAPSHOT HISTORY
Per ticker, minimal per tahun:
Plain text
Salin kode
Ticker
Effective_Date
FreeFloat_Shares
Shares_Outstanding
FreeFloat_Percentage
Ini krusial.
Karena float bisa berubah.
Kalau pakai float hari ini untuk 2021 → backtest palsu.
🏷 E. SECTOR CLASSIFICATION SNAPSHOT
Per ticker:
Plain text
Salin kode
Ticker
Sector
Effective_Date
Untuk sector cap logic.
2️⃣ DATA INTEGRITY RULES
RULE 1 — SNAPSHOT CONSISTENCY
Data yang digunakan pada tanggal T hanya boleh:
Plain text
Salin kode
Data yang sudah tersedia sebelum atau pada tanggal T
No future knowledge.
RULE 2 — EVENT AVAILABILITY CONSTRAINT
RUPS atau dividend hanya aktif di engine setelah:
Plain text
Salin kode
Announcement_Date <= Today_Date
Kalau RUPS 14 April diumumkan 20 Maret:
Engine tidak boleh tahu sebelum 20 Maret.
RULE 3 — FLOAT VALIDITY
Jika FreeFloat update di 2023:
Semua tanggal sebelum update harus pakai float lama.
Tidak boleh overwrite historis.
3️⃣ DATA SOURCES STRATEGY
Karena tidak ada API resmi:
Primary:
IDX historical disclosure archive
Website emiten (IR page)
Secondary:
RTI historical corporate action
Financial news archive
Semua event harus simpan:
Plain text
Salin kode
Source_URL
Scrape_Timestamp
Untuk audit.
4️⃣ STORAGE ARCHITECTURE
Gunakan 5 tabel terpisah:
daily_prices
corporate_events_history
quarterly_reports_history
free_float_history
sector_history
Semua immutable.
Jika ada revisi historis: → Buat record baru dengan timestamp, bukan overwrite.
5️⃣ DATA VALIDATION CHECKLIST
Sebelum dataset dinyatakan READY:
✔ Tidak ada missing earnings quarter
✔ Tidak ada dividend event tanpa announcement date
✔ Tidak ada volume > free float × 5 (data error)
✔ Tidak ada RUPS setelah ex-date (logically invalid)
✔ Float snapshot minimal 1x per tahun
6️⃣ MINIMUM DATA DEPTH
Ideal:
5 tahun historis
Minimal 3 tahun
Dengan 170 emiten:
Itu sudah cukup untuk melihat:
Dividend cycle repeatability
Regime variation
Shock year (2020)
Recovery year
7️⃣ DATA FREEZE PROTOCOL
Setelah dataset bersih:
Plain text
Salin kode
Dataset_Version = v1.0
Freeze_Date = YYYY-MM-DD
Backtest hanya boleh jalan di dataset frozen.
Kalau dataset berubah → buat v1.1.
Ini penting untuk reproducibility.
🔥 KENAPA LAYER INI PALING PENTING?
Karena:
Float rotation model sangat sensitif terhadap:
Volume historis
Float historis
Event date akurat
Kalau salah 1 saja, backtest akan memberi hasil palsu “100% winrate”.
