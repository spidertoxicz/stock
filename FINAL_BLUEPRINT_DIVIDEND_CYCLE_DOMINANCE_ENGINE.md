🧱 FINAL BLUEPRINT — DIVIDEND CYCLE DOMINANCE ENGINE v1.0
Ini kita bikin clean, tidak lompat layer lagi.
1️⃣ DATA LAYER (FOUNDATION)
A. Market Ledger (Immutable)
OHLCV daily
Shares outstanding
Free float %
Value traded
B. Corporate Ledger
RUPS date
Cum date
Ex-date
Dividend history
Quarterly earnings
Semua tersimpan snapshot per tanggal.
No overwrite.
2️⃣ FUNDAMENTAL REALITY ENGINE
A. Earnings Projection
Seasonal vector (R1–R4)
Q1→Q4 projection
EPS forward
B. Dividend Projection
DPR historical band
Projected dividend
Forward yield
Output layer ini harus bisa jawab:
Plain text
Salin kode
Kalau RUPS besok diumumkan,
dividen paling masuk akal berapa?
Yield real berapa?
Tanpa opini.
3️⃣ EVENT STATE MACHINE (CORE LOGIC)
State berdasarkan Days_to_RUPS:
Phase
Days_to_RUPS
Makna
PRE_ACCUMULATION
>45
Early
ACCUMULATION_WINDOW
45–30
Entry zone
IGNITION
30–14
Momentum
DISTRIBUTION_RISK
14–7
Exit zone
TERMINAL
<7
Trap zone
Engine hanya boleh entry di:
ACCUMULATION_WINDOW
Ini HARD RULE.
4️⃣ FLOAT ROTATION ENGINE (MICROSTRUCTURE CORE)
Tanpa orderbook, kita pakai float.
Hitung:
Salin kode

Cumulative Volume (T-45 → today) / Free Float
Interpretasi:
Float Rotation
Makna
<20%
Early accumulation
20–35%
Institutional positioning
35–50%
Retail ignition
>50%
Distribution exhaustion
Ini sangat powerful.
Karena bandar tidak bisa rotate 100% float tanpa jejak.
5️⃣ OVEREXTENSION DETECTOR
Block entry jika:
Price > 12% dari MA20
Float rotation > 35%
Days_to_RUPS < 20
Itu zona mahal.
6️⃣ EXECUTION ENGINE (MODE A — PURE HOLD)
Rule:
Salin kode

Entry:
  Days_to_RUPS 30–45
  Forward_Yield ≥ 3%
  Float_Rotation < 25%

Exit:
  Days_to_RUPS ≤ 14
  OR Float_Rotation ≥ 35%
  OR Overextension triggered
Tidak peduli ex-date. Tidak peduli rumor. Tidak peduli euforia.
🧠 KENAPA INI KUAT?
Karena kita:
✔ Masuk sebelum yield awareness massal
✔ Keluar sebelum dividend trap
✔ Gunakan float sebagai supply proxy
✔ Gunakan time as structural anchor
🔥 Edge Lu Bukan Chart
Edge lu sekarang:
Waktu
Yield matematis
Float constraint
Event determinism
Itu 4 pilar.
📈 Sekarang Real Question
Kalau kita implement blueprint ini dengan disiplin:
Apakah bisa lebih gacor dari Bloomberg untuk niche ini?
Jawabannya:
Yes.
Karena Bloomberg:
Generalist.
Engine ini:
Sniper.
