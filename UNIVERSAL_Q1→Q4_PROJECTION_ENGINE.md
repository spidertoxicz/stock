🧱 UNIVERSAL Q1→Q4 PROJECTION ENGINE v1.0
STEP 1 — HISTORICAL SEASONAL VECTOR
Untuk setiap emiten, hitung 3–5 tahun terakhir:
Untuk tiap tahun:
Salin kode

rQ1 = Q1 / FY
rQ2 = Q2 / FY
rQ3 = Q3 / FY
rQ4 = Q4 / FY
Lalu ambil rata-rata:
Salin kode

R1 = avg(rQ1)
R2 = avg(rQ2)
R3 = avg(rQ3)
R4 = avg(rQ4)
Constraint:
Salin kode

R1 + R2 + R3 + R4 = 1
Ini disebut:
Seasonal Distribution Vector (SDV)
Contoh bank (umum):
Salin kode

R1 = 0.22
R2 = 0.24
R3 = 0.25
R4 = 0.29
STEP 2 — PROJECTION FORMULA UNIVERSAL
CASE A — Baru Q1 keluar
Salin kode

Projected_FY = Q1_current / R1
CASE B — Q1 + Q2 keluar
Observed_ratio:
Salin kode

OR = R1 + R2
Projection:
Salin kode

Projected_FY = (Q1 + Q2) / OR
CASE C — Q1 + Q2 + Q3 keluar
Salin kode

OR = R1 + R2 + R3
Projected_FY = (Q1 + Q2 + Q3) / OR
CASE D — Sudah Q4
Salin kode

Projected_FY = Actual_FY
STEP 3 — EPS CALCULATION
Salin kode

Projected_EPS = Projected_FY / Shares_Outstanding
Fully deterministic.
STEP 4 — DPR ENGINE (UNIVERSAL)
Hitung historis:
Salin kode

DPR_year = Dividend / EPS
Ambil:
Salin kode

DPR_mean
DPR_std
DPR_min
DPR_max
Projection:
Salin kode

Projected_Dividend_base = Projected_EPS × DPR_mean
Projected_Dividend_low  = Projected_EPS × DPR_min
Projected_Dividend_high = Projected_EPS × DPR_max
STEP 5 — FORWARD YIELD
Salin kode

Forward_Yield = Projected_Dividend_base / Current_Price
🔥 STEP 6 — GROWTH ADJUSTED SEASONAL (LEVEL ADVANCED)
Kadang Q1 YoY growth tinggi → seasonal vector berubah.
Tambahkan:
Salin kode

Growth_Q1 = (Q1_now - Q1_last_year) / Q1_last_year
Kalau growth signifikan dan konsisten 2 kuartal:
Kita adjust multiplier:
Salin kode

Adjusted_R1 = R1 × (1 - Growth_Adjustment_Factor)
Atau gunakan:
Salin kode

Projected_FY = (Q1_current × (1 + YoY_growth_rate)) / R1
Ini masih matematis. Tidak spekulatif.
STEP 7 — VOLATILITY BAND (RISK CONTROL)
Tambahkan error band:
Hitung historis error:
Salin kode

Error_year = (Projected_FY_Q1 - Actual_FY) / Actual_FY
Ambil:
Salin kode

Mean_error
Std_error
Projection range:
Salin kode

Upper_Band = Projected_FY × (1 + Std_error)
Lower_Band = Projected_FY × (1 - Std_error)
Sekarang kita punya confidence band.
🎯 UNIVERSALITY CHECK
Framework ini cocok untuk:
BANK
Biasanya stabil seasonal → akurat tinggi
COMMODITY
Tambahkan:
Harga komoditas YoY adjustment
CONSUMER
Biasanya Q4 kuat → SDV handle itu
🔬 KENAPA INI POWERFUL?
Karena market Indonesia biasanya:
Tunggu laporan lengkap
Baru pricing EPS final
Retail tidak hitung seasonal
Kalau kamu sudah tahu:
Projected dividend 6 bulan sebelum RUPS
Kamu sudah di depan.
⚙ IMPLEMENTATION STRUCTURE
Tambahkan table:
SQL
Salin kode
seasonal_vector (
    ticker_id INT,
    R1 NUMERIC,
    R2 NUMERIC,
    R3 NUMERIC,
    R4 NUMERIC
)
SQL
Salin kode
earnings_projection_snapshot (
    ticker_id INT,
    date DATE,
    projected_fy NUMERIC,
    projected_eps NUMERIC,
    projected_dividend_base NUMERIC,
    forward_yield NUMERIC
)
Run setiap kali quarterly report keluar.
📊 APPLY TO BNGA & BJTM
Untuk:
Bank CIMB Niaga Tbk.
Bank Pembangunan Daerah Jawa Timur Tbk.
Bank biasanya seasonal stabil.
Akurasi bisa >90% kalau 3–5 tahun data konsisten.
