Mode: FAILURE INJECTION AUDIT — PARANOID ENGINEER MODE
Target: Cari titik hancur tersembunyi.
Mindset: “Kalau bisa rusak, kita paksa rusak sekarang.”
Arsitektur diuji:
Layer 1 → Event Phase State Machine
Layer 2 → Dividend Cycle Engine
Layer 3 → Portfolio Controller
🧨 FAILURE BATCH 1 — DATA ANOMALY
1️⃣ Float_Rotation Tiba-Tiba 0% (Data Feed Error)
Injected Fault:
Text
Salin kode
Float_Rotation_30 = 0
Float_Rotation_60 = 0
Padahal sebenarnya 45%.
Dampak:
Layer 1:
Bisa salah deteksi ACCUMULATION_WINDOW
ENTRY dipicu
Layer 3:
Entry dilakukan
Risiko:
Over-allocation ke saham yang sebenarnya masih distribusi.
Mitigasi Arsitektural?
Saat ini: ❌ Tidak ada sanity floor.
Rekomendasi minimal (tanpa merusak design):
Tambahkan di State Machine:
Text
Salin kode
If FreeFloat_Shares <= 0 → INACTIVE
If Volume history missing → INACTIVE
If Float_Rotation_30 < 0 OR > 200% → INACTIVE
Bukan macro. Bukan alpha. Pure data validation.
Verdict: ⚠ Minor vulnerability ditemukan.
2️⃣ Harga Spike 1 Hari (Bad Tick)
Injected: Close naik 25% satu hari karena bad print.
Layer 1: Price_Deviation >= 20% → TERMINAL
Layer 3: FULL_EXIT
Besok harga normal kembali.
Kerugian? Minimal (keluar lebih cepat).
Tidak ada runaway allocation.
Verdict: ✔ Safe (false positive exit lebih aman dari false negative)
🧨 FAILURE BATCH 2 — SIGNAL ANOMALY
3️⃣ Double ENTRY Signal 2 Hari Berturut
Bug di Dividend Engine: ENTRY dikirim dua hari.
Layer 3: Step 4 → Entry hanya jika:
Current_Position_Size < Max_Position_Size
Karena initial entry = Min_Position_Size (5%), hari kedua ENTRY bisa masuk lagi.
Hasil: Posisi jadi 10% (maksimal).
Tidak melebihi Max_Position_Size.
Verdict: ✔ Safe by cap constraint.
4️⃣ FULL_EXIT Signal Hilang 1 Hari
Injected: State → TERMINAL Tapi Signal tidak terkirim 1 hari.
Layer 3: Tidak exit hari itu.
Hari berikutnya signal muncul → exit.
Kerugian: 1 hari delay.
Arsitektur tidak collapse. Tidak ada re-entry.
Verdict: ✔ Tolerable risk.
🧨 FAILURE BATCH 3 — STATE DESYNC
5️⃣ State Machine Freeze 3 Hari
State stuck di MOMENTUM_EXPANSION Padahal structure sudah breakdown.
Portfolio: HOLD 3 hari.
Risiko: Drawdown tambahan.
Tapi: Begitu state update → TERMINAL → exit.
Tidak ada spiral logic. Tidak ada averaging down. Tidak ada size increase.
Verdict: ✔ Contained risk.
🧨 FAILURE BATCH 4 — CORPORATE EVENT CHAOS
6️⃣ Corporate Action Dicabut Mendadak
Validation berubah: CONFIRMED → REVOKED
Jika tidak ada rule khusus, State bisa tetap di MOMENTUM.
Ini celah.
Patch kecil diperlukan:
Di State Machine:
Text
Salin kode
If CorporateAction.validation_status != CONFIRMED
→ Force TERMINAL
Bukan INACTIVE. Karena posisi mungkin masih ada.
Verdict: ⚠ Patch required.
🧨 FAILURE BATCH 5 — CAPITAL EDGE CASE
7️⃣ Semua 8 Posisi ENTRY Bersamaan
Portfolio:
Max_Concurrent_Positions = 8
Min_Position_Size = 5%
Total = 40% exposure
Cash_Buffer 10% = 50% idle capital
Tidak overleveraged. Tidak forced full deployment.
Verdict: ✔ Stable.
8️⃣ PARTIAL_EXIT + ENTRY Hari yang Sama
Urutan eksekusi:
FULL_EXIT
PARTIAL_EXIT
ADD
ENTRY
Artinya: Capital freed dulu. Baru dipakai.
Tidak ada negative capital. Tidak ada race.
Verdict: ✔ Clean execution order.
🧠 CRITICAL FAILURE CHECK
Pertanyaan paling penting:
Apakah ada skenario di mana:
Portfolio bisa over-allocate?
Position bisa > Max_Position_Size?
Exit bisa diabaikan?
Signal bisa menciptakan loop?
Capital bisa negatif?
Jawaban: ❌ Tidak.
Semua dibatasi constraint keras.
🔥 SUMMARY — FAILURE INJECTION RESULT
Data anomaly → Minor patch needed
Signal duplication → Safe
State desync → Contained
Corporate revoke → Patch needed
Capital race → Safe
Over allocation → Impossible
🎯 2 PATCH WAJIB UNTUK PRODUCTION-GRADE
Tambahkan di State Machine:
Text
Salin kode
If validation lost → TERMINAL
If Float_Rotation abnormal → INACTIVE
If FreeFloat invalid → INACTIVE
Itu saja.
Tidak perlu macro guard. Tidak perlu complexity tambahan.
🧠 FINAL VERDICT
Engine kamu sekarang:
✔ Robust terhadap crash
✔ Robust terhadap signal glitch
✔ Robust terhadap state freeze
✔ Robust terhadap capital race
✔ Tidak bisa runaway
Setelah 2 patch kecil tadi, ini sudah level production-grade deterministic engine.
