🧱 BACKTEST FRAMEWORK SPEC v1.0
Mode: Dividend Cycle Deterministic
Status: DESIGN LOCK
Tujuan:
Membuktikan apakah Event + Float Rotation benar-benar punya edge 3–5 tahun historis.
Tanpa lookahead.
Tanpa data bocor.
Tanpa hindsight bias.
1️⃣ CORE PRINCIPLE
Backtest harus:
✔ Event-driven
✔ Daily EOD replay
✔ No future knowledge
✔ Corporate validation timestamp-aware
✔ Free float historical snapshot-based
Kalau tidak, hasilnya palsu.
2️⃣ DATA REQUIREMENT (MANDATORY)
Minimal 3–5 tahun:
For each ticker:
Daily OHLCV
Free float per tahun
Shares outstanding history
RUPS date history
Dividend history
Quarterly earnings
⚠ Penting:
Free float harus snapshot historis. Tidak boleh pakai free float hari ini untuk tahun 2021.
3️⃣ REPLAY ENGINE FLOW (DAILY LOOP)
Simulasi berjalan:
Plain text
Salin kode
FOR each trading day in chronological order:
Step-by-step:
Load data sampai hari itu saja
Update corporate validation (T+1 rule berlaku)
Hitung seasonal EPS projection (hanya pakai data tersedia saat itu)
Hitung forward yield
Hitung float rotation (dari T-45 window)
Evaluate State Machine
Evaluate Execution Spec
Simulasikan entry/exit
Update portfolio capital
Tidak boleh:
Plain text
Salin kode
Mengakses data setelah tanggal simulasi.
4️⃣ POSITION SIMULATION RULE
Entry price:
Plain text
Salin kode
Close price of next trading day
Exit price:
Plain text
Salin kode
Close price of next trading day after signal
Ini mencegah unrealistic fill.
5️⃣ COST MODEL
Minimal realistis:
Plain text
Salin kode
Fee = 0.15% buy
Fee = 0.25% sell
Slippage = 0.1%
Tanpa cost → overestimate return.
6️⃣ METRICS WAJIB DIEVALUASI
Backtest tidak boleh hanya lihat total return.
Hitung:
CAGR
Max Drawdown
Win Rate
Average Gain per Trade
Average Loss per Trade
Profit Factor
Sharpe Ratio
Capital Utilization %
Rotation Speed (trades per year)
7️⃣ STRATEGY VALIDATION CRITERIA
Engine dianggap valid jika:
✔ CAGR ≥ 40%
✔ Max Drawdown < 25%
✔ Win rate ≥ 60%
✔ Profit factor > 1.8
✔ No single sector dominates > 40% PnL
Kalau tidak lolos, kita revisi.
8️⃣ FAILURE MODES YANG HARUS DIPANTAU
1️⃣ Overfitting T-45 window
2️⃣ False float exhaustion detection
3️⃣ Cluster macro crash
4️⃣ Dividend cut year
5️⃣ Structural regime change
9️⃣ STRESS TEST SCENARIOS
Backtest wajib include:
2020 crash period
2022 rate hike period
Low volatility year
High volatility year
Kalau engine survive semua → valid.
🔟 CAPITAL ROTATION SIMULATION
Karena target 170 emiten:
Backtest harus simulasikan:
Concurrent max 8 positions
Sector cap 2
Cash buffer 10%
Tidak boleh idealistic unlimited capital.
🔥 REALITY CHECK
Kalau engine bisa:
Konsisten 40–70% CAGR
Dengan DD terkendali
Maka compounding 2–3 tahun bisa sangat agresif.
Kalau cuma 20–30% CAGR,
masih bagus tapi bukan 200% target.
