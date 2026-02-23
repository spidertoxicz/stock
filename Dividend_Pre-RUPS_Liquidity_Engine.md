Dividend Pre-RUPS Liquidity Engine (Deterministic Version).
Kita anggap:
Universe = semua sektor
Filter utama = Forward Yield > 3%
Entry window wajib = T-45 sampai T-30 sebelum RUPS
T-14 ke bawah = zona distribusi institusi
Dan kamu benar.
Entry terlalu dekat RUPS = kita jadi exit liquidity.
Sekarang kita bikin framework matematis, bukan feeling.
🧱 1️⃣ CORE EVENT TIMELINE MODEL
Untuk setiap emiten (contoh: Mitra Pinasthika Mustika Tbk., Bank CIMB Niaga Tbk., Bank Pembangunan Daerah Jawa Timur Tbk.):
Definisikan:
Salin kode

T0 = RUPS date
Buat fase deterministik:
Salin kode

T-90  → Early valuation zone
T-60  → Yield awareness zone
T-45  → Smart money accumulation zone
T-30  → Momentum ignition zone
T-14  → Retail participation zone
T-7   → Distribution risk zone
T0    → Event day
T+1   → Post event reposition
Engine kamu wajib fokus:
Entry optimal = T-45 sampai T-30
🧮 2️⃣ ENTRY CONDITION (MATEMATIS, BUKAN SCORING)
FILTER 1 — Forward Yield Threshold
Salin kode

Projected_Dividend / Current_Price ≥ 3%
Lebih bagus kalau:
Salin kode

Forward_Yield > Historical_Yield_Avg
Karena berarti undervalued vs kebiasaan.
FILTER 2 — Yield Spread Edge
Bandingkan:
Salin kode

Dividend_Yield – BI Rate
Kalau spread positif besar → magnet liquidity.
(Institusi bandingkan dengan obligasi.)
FILTER 3 — Price Structure Constraint
Entry hanya kalau:
Salin kode

Price tidak > 15% dari MA50
Karena kalau sudah terlalu jauh = kita telat.
📊 3️⃣ LIQUIDITY ACCUMULATION DETECTOR (MICROSTRUCTURE PROXY)
Karena tidak ada orderbook depth:
Gunakan proxy matematis:
A. Turnover Ratio
Salin kode

Volume / Free_Float_Shares
Kalau naik gradual 10–20 hari → akumulasi.
B. Range Compression
Salin kode

ATR(14) turun
Lalu breakout kecil → awal ignition.
C. Higher Low Pattern
Deterministik:
Salin kode

Low_today > Low_20_day_min
Berulang 3–4 kali.
🧠 4️⃣ EXIT LOGIC (ANTI SUICIDE MODE)
Kita formal-kan.
Kalau:
Salin kode

Days_to_RUPS < 14
AND Price_distance_from_MA20 > 12%
→ Engine wajib flag:
Salin kode

Reduce exposure
Kalau:
Salin kode

Days_to_RUPS < 7
→ Dilarang entry.
🔬 5️⃣ KENAPA POLA SAMA DI SEMUA SEKTOR YIELD > 3%?
Karena dividend play bukan soal sektor.
Ini soal:
Salin kode

Capital allocation decision.
Institusi hitung:
Expected yield
Holding duration
Risk of drawdown post ex-date
Selama yield > threshold psikologis (3–5%),
pattern mikrostruktural hampir selalu sama.
📈 6️⃣ KENAPA ENTRY 30–45 HARI SEBELUM RUPS?
Karena:
Institusi mulai akumulasi jauh sebelum retail sadar
Retail biasanya masuk H-14 sampai H-5
Distribution sering terjadi H-10 ke atas
Chart MPMX yang kamu kirim itu textbook:
Run-up → Spike → Drop cepat.
Itu tanda distribution selesai.
⚙ 7️⃣ ENGINE RULE LOCK (VERSI 1.0)
Dividend Pre-RUPS Engine:
Salin kode

IF:
  Days_to_RUPS BETWEEN 30 AND 45
  AND Forward_Yield ≥ 3%
  AND Price < MA50 + 15%
  AND Turnover rising 10-day
THEN:
  ENTRY_ZONE = TRUE
Hard rule:
Salin kode

IF Days_to_RUPS < 14:
  BLOCK_NEW_ENTRY
🔥 8️⃣ STRATEGIC EDGE
Kenapa ini lebih aman dari earnings?
Karena earnings:
Bisa negative surprise
Dividend:
Basisnya laba final
DPR jarang berubah drastis
Market slow pricing
Dividend engine lebih stabil untuk pondasi.
🎯 Final Jawaban
Kalau kamu mau bangun pondasi event liquidity engine:
Fokus full ke Dividend Pre-RUPS deterministic model dulu.
Itu paling clean. Paling bisa diukur. Paling bisa di-automate.
