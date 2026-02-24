🧱 FINAL CLEAN ARCHITECTURE v2.0
Minimal. Deterministic. Non-chaotic.
1️⃣ DATA INGESTION LAYER
Responsibility:
Fetch corporate action
Fetch earnings summary
Fetch price data
Validate
Store
Tidak ada logic ranking. Tidak ada alpha. Tidak ada guard.
Output: Normalized deterministic dataset.
2️⃣ CORE FUNDAMENTAL FILTER
Tujuan: Menentukan apakah saham eligible dividend engine.
Hanya 3 parameter:
Dividend consistency
Earnings stability
Payout sustainability
Binary outcome: PASS / FAIL
Tidak ada scoring. Tidak ada weight.
3️⃣ CAPITAL STABILITY FILTER
Mengganti semua guard chaos.
Parameter minimal:
Debt sanity check
Cashflow sanity check
No structural collapse
Binary: STABLE / UNSTABLE
Jika gagal → keluar.
4️⃣ RANKING LAYER (SINGLE OBJECTIVE)
Tujuan: Mengurutkan saham yang lolos filter.
Metric tunggal: Dividend Yield Adjusted by Stability
No multi-alpha. No composite complexity.
Deterministic formula. Fixed.
5️⃣ PORTFOLIO CONSTRUCTION
Aturan sederhana:
Equal weight
Max N positions
Rebalance fixed interval
Tidak ada dynamic sizing. Tidak ada volatility targeting. Tidak ada regime switching.
6️⃣ BACKTEST ENVIRONMENT
Bukan layer logic. Hanya runner terpisah yang:
Replay dataset
Apply core pipeline
Output performance metrics
Tidak boleh ada logic berbeda antara live & backtest.
🔒 STRUKTUR FINAL (VISUAL FLOW)
Salin kode

DATA INGESTION
      ↓
FUNDAMENTAL FILTER (Dividend + Earnings)
      ↓
CAPITAL STABILITY FILTER
      ↓
RANKING (Single Metric)
      ↓
PORTFOLIO BUILD
Selesai.
🧨 YANG SECARA RESMI DIHAPUS
Mode A
Mode B
Float Rotation Model
Separate Earnings Engine
Sector Guard
Macro Guard
Complex Risk Guard
Migration Spec
Cron Spec
Retry Spec (standalone)
Micro Alpha Pack
Multi scoring architecture
🎯 KARAKTER ENGINE v2.0
Deterministic
Linear pipeline
No branching chaos
No regime complexity
No defensive redundancy
Minimal parameter surface
Fully auditable
🔥 KENAPA INI BENAR
Karena dividend engine fase awal tujuannya:
✔ Capture stable dividend compounding
✔ Hindari collapse
✔ Simple rotation
✔ Bisa diaudit secara matematis
Bukan: ✘ Hedgefund multi-factor regime engine
✘ Macro predictive system
✘ Smart beta lab
