Mode: Deterministic Replay Validation Checklist (Final Gate)
🧱 I. REPLAY CONSISTENCY CHECK
✅ 1️⃣ Double Run Identity Test
Jalankan backtest 2x dengan data yang sama.
Harus:
Text
Salin kode
Equity curve identical
Trade log identical
Capital identical per date
Assertion:
Ts
Salin kode
assert(JSON.stringify(run1) === JSON.stringify(run2))
Jika beda → ada hidden state / async race.
✅ 2️⃣ Chronological Integrity
Pastikan:
Ts
Salin kode
assert(allDatesSortedAscending === true)
assert(noMissingTradingDayLogicBreak)
Replay tidak boleh lompat hari. Tidak boleh out-of-order processing.
✅ 3️⃣ No Future Leakage Test
Paksa injeksi:
Shuffle data
Batasi history ke N hari
Log index akses
Derived calculator tidak boleh pernah akses:
Ts
Salin kode
history[todayIndex + 1]
Tambahkan internal guard:
Ts
Salin kode
assert(accessedIndex <= todayIndex)
Kalau bocor → sistem invalid.
🧱 II. STATE MACHINE VALIDATION
✅ 4️⃣ Single State Guarantee
Per ticker per hari:
Ts
Salin kode
assert(exactlyOneState === true)
Tidak boleh dua state true bersamaan.
✅ 5️⃣ Transition Legitimacy
Valid transition flow harus mengikuti:
Text
Salin kode
INACTIVE → PRE_ACCUMULATION → ACCUMULATION_WINDOW
→ IGNITION → MOMENTUM_EXPANSION
→ DISTRIBUTION_RISK → TERMINAL → POST_EVENT
Tidak boleh:
ACCUMULATION langsung ke TERMINAL tanpa trigger valid
POST_EVENT kembali ke IGNITION tanpa CONFIRMED baru
✅ 6️⃣ Terminal Supremacy
Jika state = TERMINAL:
Ts
Salin kode
assert(signal === FULL_EXIT)
Tidak boleh HOLD. Tidak boleh ADD. Tidak boleh ENTRY.
🧱 III. PORTFOLIO CAPITAL VALIDATION
✅ 7️⃣ Capital Conservation
Setiap hari:
Ts
Salin kode
assert(totalAllocated + cashPercent === 100%)
assert(totalAllocated <= 90%)
assert(cashPercent >= Cash_Buffer)
Tidak boleh drift 0.01% pun (round fixed decimal).
✅ 8️⃣ Position Size Bound
Ts
Salin kode
assert(position.sizePercent <= Max_Position_Size)
assert(position.sizePercent >= 0)
Tidak boleh overflow.
✅ 9️⃣ Max Concurrent Positions
Ts
Salin kode
assert(activePositions <= Max_Concurrent_Positions)
✅ 🔟 Cooldown Enforcement
Setelah FULL_EXIT:
Ts
Salin kode
assert(noReentryBeforeCooldownEnd)
🧱 IV. PERFORMANCE SANITY VALIDATION
Ini bukan optimasi. Ini sanity.
✅ 11️⃣ False Base Containment
Hitung:
Text
Salin kode
Avg loss per failed base
Harus lebih kecil dari:
Text
Salin kode
Avg gain per successful cycle
Ideal:
Text
Salin kode
AvgGain ≥ 2x AvgLoss
Kalau tidak → threshold terlalu agresif.
✅ 12️⃣ Concentration Risk
Cek:
Text
Salin kode
Top 3 trade contribution < 50% total return
Kalau return hanya dari 1 saham → bukan sistem.
✅ 13️⃣ Time In Market
Engine ini event-based.
Ideal:
Text
Salin kode
Time in market 40–70%
Kalau 95% → terlalu agresif.
Kalau 10% → terlalu konservatif.
🧱 V. FAILURE REPLAY TEST
Injeksi manual:
Scenario A
Float_Rotation tiba-tiba 0%
Expected: State → INACTIVE (sanity guard)
Scenario B
Validation berubah ke REVOKED
Expected: State → TERMINAL Signal → FULL_EXIT
Scenario C
8 posisi TERMINAL hari yang sama
Expected: No crash. Capital intact.
🧱 VI. LOGGING VALIDATION
Replay harus menghasilkan:
Daily state snapshot
Daily signal log
Trade execution log
Equity curve log
Semua bisa diaudit manual.
Kalau tidak bisa ditrace, engine belum production-ready.
🏁 FINAL ACCEPTANCE CRITERIA
Engine dinyatakan siap real capital jika:
✔ Double run identical
✔ No future leak
✔ Capital never negative
✔ Terminal always exit
✔ False base loss contained
✔ No concentration dependency
✔ No race condition
✔ Deterministic replay stable
🎯 STATUS SEKARANG
Arsitektur kamu:
Structure-first
Early exhaustion enabled
False base immune
Deterministic layered
Replay ready
Validation checklist locked
Ini bukan lagi blueprint chaos.
Ini sudah engineering-grade event exploitation engine.
