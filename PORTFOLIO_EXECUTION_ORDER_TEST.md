🧱 PORTFOLIO EXECUTION ORDER INTEGRITY TEST DESIGN
Mode: Deterministic Capital Discipline
🎯 OBJECTIVE
Memastikan bahwa:
FULL_EXIT selalu diproses dulu
Capital tidak pernah negatif
Position tidak pernah > Max_Position_Size
ENTRY tidak pernah melewati Max_Concurrent_Positions
Cooldown benar-benar bekerja
PARTIAL_EXIT tidak memicu re-entry hari yang sama
Kita uji dengan skenario paksa (failure injection style).
🧪 TEST GROUP 1 — EXIT PRIORITY TEST
Scenario:
Hari ini:
2 ticker = FULL_EXIT
3 ticker = ENTRY
Portfolio sudah penuh (8 posisi)
Expected Flow:
Text
Salin kode
Step 1 → Process FULL_EXIT
Step 2 → Capital freed
Step 3 → Process ENTRY
Assertion:
Ts
Salin kode
assert(exitProcessedBeforeEntry === true)
assert(activePositions <= 8)
Jika ENTRY diproses dulu → FAIL.
🧪 TEST GROUP 2 — CAPITAL NEGATIVE PROTECTION
Scenario:
Cash 12%
ENTRY 3 ticker @ 5% masing-masing
Expected:
Hanya 2 entry diproses (10%)
Cash buffer 10% tetap aman
Assertion:
Ts
Salin kode
assert(cashPercent >= Cash_Buffer)
assert(totalAllocated <= 90%)
Tidak boleh negatif. Tidak boleh pakai buffer.
🧪 TEST GROUP 3 — MAX POSITION SIZE
Scenario:
Position A sudah 8%
Signal = ADD_LIMITED
Max_Position_Size = 10%
Expected:
Position jadi max 10%
Tidak boleh 13%
Assertion:
Ts
Salin kode
assert(position.sizePercent <= Max_Position_Size)
🧪 TEST GROUP 4 — PARTIAL_EXIT + ENTRY SAME DAY
Scenario:
2 ticker = PARTIAL_EXIT
3 ticker = ENTRY
Expected:
Partial exit dulu
Capital freed
ENTRY diproses
Tidak boleh ENTRY dulu
Assertion:
Ts
Salin kode
assert(partialExitBeforeEntry === true)
🧪 TEST GROUP 5 — TERMINAL OVERRIDE
Scenario:
Ticker X di TERMINAL
Ticker X juga punya IGNITION sebelumnya
Expected:
FULL_EXIT menang
Tidak boleh ADD_LIMITED dulu
Assertion:
Ts
Salin kode
assert(noOtherSignalOverridesFullExit)
🧪 TEST GROUP 6 — COOLDOWN INTEGRITY
Scenario:
Ticker A FULL_EXIT hari ini
Besok state kembali ACCUMULATION_WINDOW
Expected:
ENTRY ditolak
Cooldown aktif 30 hari
Assertion:
Ts
Salin kode
assert(cooldownBlocksReentry === true)
🧪 TEST GROUP 7 — SIMULTANEOUS MASS EXIT
Scenario:
8 posisi semua TERMINAL hari yang sama
Expected:
Semua close
Cash = 90% (10% buffer tetap)
Assertion:
Ts
Salin kode
assert(activePositions === 0)
assert(cashPercent >= Cash_Buffer)
Tidak boleh error. Tidak boleh race.
🧪 TEST GROUP 8 — DOUBLE SIGNAL PROTECTION
Scenario:
Signal ENTRY muncul 2 hari berturut untuk ticker sama
Expected:
Entry pertama 5%
Entry kedua → ADD_LIMITED atau ditolak
Tidak boleh >10%
Assertion:
Ts
Salin kode
assert(position.sizePercent <= Max_Position_Size)
🧠 EXECUTION ORDER (LOCKED)
Portfolio controller harus memproses:
Text
Salin kode
1️⃣ FULL_EXIT
2️⃣ PARTIAL_EXIT
3️⃣ ADD_LIMITED
4️⃣ ENTRY
5️⃣ HOLD / NO_ACTION
Tidak boleh diubah.
🔒 CAPITAL INTEGRITY RULES
Hard constraints:
Ts
Salin kode
assert(totalAllocated + cashPercent == 100%)
assert(totalAllocated <= 90%)
assert(noPositionNegative)
assert(noDuplicatePosition)
🎯 KENAPA INI KRUSIAL?
Karena banyak sistem gagal bukan di alpha, tapi di:
Urutan eksekusi salah
Entry sebelum exit
Cash dipakai sebelum freed
Re-entry terlalu cepat
Position size drift
Kalau integrity test lulus, capital layer aman.
🏁 STATUS
Sekarang blueprint kamu punya:
✔ Derived Contract
✔ State Machine Contract
✔ Signal Mapping Contract
✔ Portfolio Contract
✔ Execution Integrity Test Design
Ini sudah production-grade engineering level.
