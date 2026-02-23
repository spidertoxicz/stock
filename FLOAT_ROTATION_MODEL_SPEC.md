🧱 FLOAT ROTATION MODEL SPEC v1.0
Mode: Dividend Cycle
Status: LOCKED
Type: Deterministic Supply Absorption Model
1️⃣ PURPOSE
Mengukur secara matematis:
Seberapa besar free float telah berpindah tangan
Apakah akumulasi masih berjalan
Apakah distribusi sudah mulai
Apakah exhaustion sudah terjadi
Tanpa orderbook. Tanpa broker summary. Tanpa guess.
2️⃣ INPUT VARIABLES (MANDATORY)
Per ticker, per hari (EOD):
Plain text
Salin kode
FreeFloat_Shares
Daily_Volume
Today_Date
RUPS_Date
Close
MA20
ATR14
Derived:
Plain text
Salin kode
Days_to_RUPS = RUPS_Date - Today_Date
3️⃣ ROTATION WINDOW DEFINITION
Rotation hanya dihitung mulai:
Plain text
Salin kode
Rotation_Start_Date = RUPS_Date - 45 hari
Jika Today_Date < Rotation_Start_Date →
Float_Rotation = 0
Ini HARD RULE.
Kita tidak hitung volume di luar window.
4️⃣ CORE FORMULA
4.1 Cumulative Rotation Volume
Plain text
Salin kode
Cum_Volume = Σ(Daily_Volume dari Rotation_Start_Date sampai Today_Date)
4.2 Raw Float Rotation
Plain text
Salin kode
Raw_Float_Rotation = Cum_Volume / FreeFloat_Shares
Tidak ada smoothing. Tidak ada weighting. Pure turnover ratio.
5️⃣ ADJUSTMENT RULE (ANTI-OVERCOUNT)
Karena volume bisa bolak-balik dalam satu hari.
Kita tambahkan cap per hari:
Plain text
Salin kode
Effective_Daily_Rotation =
MIN(Daily_Volume, FreeFloat_Shares × 0.15)
Artinya:
Dalam satu hari, maksimal 15% float dianggap berpindah tangan.
Ini mencegah:
Overestimation akibat high-frequency trading
Wash trading illusion
5.1 Adjusted Cumulative Rotation
Plain text
Salin kode
Adj_Cum_Volume = Σ(Effective_Daily_Rotation)
Adj_Float_Rotation = Adj_Cum_Volume / FreeFloat_Shares
Ini yang dipakai engine.
6️⃣ ROTATION ZONE CLASSIFICATION
Based on Adj_Float_Rotation:
Rotation %
Interpretation
0–15%
Early Accumulation
15–25%
Institutional Positioning
25–35%
Liquidity Expansion
35–50%
Distribution Onset
>50%
Exhaustion
Zone ini HARUS konsisten dengan State Machine.
7️⃣ ROTATION VELOCITY (SECONDARY METRIC)
Mengukur percepatan distribusi.
Plain text
Salin kode
Rotation_Velocity_5D =
(Adj_Float_Rotation_today - Adj_Float_Rotation_5days_ago)
Jika:
Plain text
Salin kode
Rotation_Velocity_5D > 10%
AND Days_to_RUPS <= 20
→ Distribution acceleration flag
8️⃣ PARABOLIC ROTATION CONDITION
Jika dalam 10 hari:
Plain text
Salin kode
Adj_Float_Rotation naik > 20%
→ Aggressive liquidity event detected
Biasanya retail ignition.
9️⃣ HARD LIMIT RULES
Engine MUST trigger TERMINAL state jika:
Plain text
Salin kode
Adj_Float_Rotation >= 50%
Tidak ada override.
🔟 EDGE CASE HANDLING
Case A — Free Float berubah
Jika:
Ada stock split
Ada rights issue
→ FreeFloat_Shares harus update
→ Rotation reset ulang
Dividend Mode v1.0 tidak meng-handle rights issue
Jika rights issue terjadi → engine set INACTIVE
Case B — Volume anomali 1 hari ekstrem
Jika:
Plain text
Salin kode
Daily_Volume > 50% FreeFloat
→ Flag anomaly
→ Cap tetap 15% rule
→ Tidak override model
11️⃣ DETERMINISM GUARANTEE
Dengan input sama:
FreeFloat_Shares
Daily_Volume
RUPS_Date
Engine akan selalu menghasilkan rotation yang sama.
Tidak ada random. Tidak ada parameter adaptif.
12️⃣ DESIGN PHILOSOPHY
Asumsi dasar:
Bandar tidak bisa rotate >50% float tanpa jejak
Distribution terlihat melalui rotation acceleration
Time + rotation lebih penting dari indikator teknikal
Model ini adalah:
Supply Absorption Tracker.
🔒 STATUS
FLOAT ROTATION MODEL v1.0
Mode: Dividend Cycle
Status: LOCKED
Sekarang struktur kita sudah:
✔ Corporate Validation
✔ State Machine
✔ Float Rotation Model
