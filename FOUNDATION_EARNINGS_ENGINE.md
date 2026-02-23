🧱 FOUNDATION: EARNINGS ENGINE v1.0
Kita bangun layer matematis dulu.
1️⃣ DATA YANG WAJIB ADA
Per ticker:
Shares outstanding
Free float
Q1 net income
Q2 net income
Q3 net income
Q4 net income (jika sudah ada)
Historical DPR 3–5 tahun
Historical seasonal pattern
2️⃣ CORE FORMULA
EPS tahunan:
Salin kode

EPS = Total Net Income / Shares Outstanding
Kalau baru Q1:
Salin kode

Projected FY Net Income =
    Q1 × seasonal_multiplier
Kalau sudah Q2:
Salin kode

Projected FY =
    (Q1 + Q2) + estimate_Q3 + estimate_Q4
3️⃣ SEASONAL MULTIPLIER ENGINE
Contoh bank seperti Bank CIMB Niaga Tbk. biasanya punya pattern:
Q4 paling besar
Q1 relatif normal
Q2 naik
Q3 stabil
Kita hitung historis:
Salin kode

seasonal_ratio_Q1 = avg(Q1 / FY_total)
seasonal_ratio_Q2 = avg(Q2 / FY_total)
seasonal_ratio_Q3 = avg(Q3 / FY_total)
seasonal_ratio_Q4 = avg(Q4 / FY_total)
Contoh:
Q1 = 22% dari FY Q2 = 24% Q3 = 25% Q4 = 29%
Kalau Q1 keluar:
Salin kode

Projected FY = Q1 / 0.22
Kalau Q1+Q2 keluar:
Salin kode

Observed_ratio = 0.22 + 0.24 = 0.46
Projected FY = (Q1+Q2) / 0.46
100% matematis. No guess.
4️⃣ DPR ENGINE
Dividend Payout Ratio biasanya stabil.
Hitung historis:
Salin kode

DPR_avg_5y
DPR_std
Min / Max
Kalau DPR 5 tahun terakhir:
45%, 50%, 48%, 52%, 49%
Berarti kemungkinan range 45–52%.
Projected dividend:
Salin kode

Projected Dividend =
    Projected EPS × DPR_assumption
Kita buat 3 scenario:
Conservative (min DPR)
Base (avg DPR)
Aggressive (max DPR)
5️⃣ FORWARD DIVIDEND YIELD
Salin kode

Forward Yield =
    Projected Dividend / Current Price
Kalau yield > historical yield band, market belum pricing.
6️⃣ WHY THIS IS POWERFUL
Karena sebelum RUPS:
Retail hanya lihat:
"wah laba naik"
Tapi kita sudah tahu:
EPS final kira-kira berapa
Dividend kira-kira berapa
Yield kira-kira berapa
Range undervalued di harga berapa
Ini bukan AI neural network.
Ini financial engine.
7️⃣ KENAPA INI MIRIP MACHINE LEARNING CATUR?
Karena:
Catur:
Engine hitung semua kemungkinan move
Evaluasi posisi
Kita:
Hitung semua kemungkinan EPS outcome
Evaluasi dividend outcome
Evaluasi pricing gap
Pure tree evaluation.
8️⃣ BACKEND STRUCTURE YANG DIPERLUKAN
Tambahkan table:
SQL
Salin kode
quarterly_reports (
    ticker_id INT,
    year INT,
    quarter INT,
    net_income NUMERIC,
    PRIMARY KEY (ticker_id, year, quarter)
)
SQL
Salin kode
earnings_projection (
    ticker_id INT,
    date DATE,
    projected_fy_income NUMERIC,
    projected_eps NUMERIC,
    projected_dividend_conservative NUMERIC,
    projected_dividend_base NUMERIC,
    projected_dividend_aggressive NUMERIC
)
Semua deterministic.
9️⃣ ADVANCED: GROWTH ADJUSTMENT
Kalau mau level lebih tinggi:
Tambahkan YoY growth:
Salin kode

growth_Q1 = (Q1_current - Q1_last_year) / Q1_last_year
Kalau growth konsisten:
Kita bisa adjust seasonal multiplier.
Tapi tetap matematis. Tidak pakai random weight.
🔥 KUNCI KEUNGGULAN
Market Indonesia lambat pricing forward dividend.
Kalau kamu:
Hitung EPS sebelum market sadar
Hitung DPR realistis
Hitung yield > 8% sebelum diumumkan
Kamu sudah di depan.
