🧱 ARSITEKTUR FINAL — SEMI-AUTOMATED MODE
Engine tetap full deterministic di backend.
Manusia hanya konfirmasi eksekusi.
Struktur final:
Salin kode

[ Data Acquisition ]
        ↓
[ Corporate Validation ]
        ↓
[ Earnings & Dividend Projection ]
        ↓
[ Event Phase State Machine ]
        ↓
[ Float Rotation Engine ]
        ↓
[ Execution Decision Engine ]
        ↓
[ Alert & Dashboard Layer ]
        ↓
[ Manual Order Execution ]
Tidak ada auto order. Tapi keputusan sudah 90% dibuat engine.
🎯 Apa Artinya Semi-Automated Secara Praktis?
Setiap hari EOD, engine output:
📌 1️⃣ Entry Candidates
Contoh output:
Salin kode

Ticker: BNGA
State: ACCUMULATION_WINDOW
Days_to_RUPS: 38
Forward_Yield: 7.8%
Float_Rotation: 18%
Sector Exposure: 1/2
Suggested Position: 8%
Confidence: VALID
Lu tinggal:
Cek cepat chart
Confirm tidak ada anomaly berita
Klik buy manual
📌 2️⃣ Distribution Warning
Salin kode

Ticker: BJTM
State: DISTRIBUTION_RISK
Float_Rotation: 36%
5D Rotation Velocity: 12%
Action: Reduce 50%
Lu tinggal eksekusi reduce.
📌 3️⃣ Terminal Alert
Salin kode

Ticker: MPMX
State: TERMINAL
Float_Rotation: 52%
Price_Deviation: 22%
Action: Exit 100%
Tidak perlu mikir lagi.
🧠 Kenapa Ini Lebih Kuat dari Auto Bot?
Karena:
Auto bot:
Bisa error karena slippage
Bisa salah eksekusi saat liquidity tipis
Bisa kena rejection
Semi-auto:
Engine tetap disiplin
Lu tetap kontrol timing entry
Bisa lihat anomali berita mendadak
Edge tetap di engine,
control tetap di manusia.
🔥 Keuntungan Besar Model Ini
Tidak tergantung API broker
Bisa pakai broker apapun
Risiko compliance rendah
Bisa audit manual kalau ada anomaly
Psychological discipline tetap terjaga
📊 Sekarang Yang Paling Penting
Kalau semi-auto:
Kita butuh satu layer tambahan:
📊 DASHBOARD SPEC
Karena tanpa dashboard rapi, lu akan capek seperti hedge fund manual lagi.
Dashboard harus menampilkan:
Ranking 170 emiten
State color-coded
Float rotation gauge
Days_to_RUPS countdown
Sector exposure meter
Portfolio heatmap
Capital allocation snapshot
Kalau ini jadi, lu benar-benar punya “mini Bloomberg khusus dividend”.
