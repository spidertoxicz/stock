Mode: Strict Contract Definition
🧱 FILE
core/state_machine/evaluate_state.ts
🎯 1️⃣ FUNCTION CONTRACT (LOCKED)
Ts
Salin kode
evaluateState(
  ticker: string,
  dailyBar: DailyBar,
  derived: DerivedMetrics,
  previousState: State
): State
RULES:
Pure function
No mutation
No portfolio access
No signal awareness
No future data
No randomness
Tidak boleh akses history langsung (hanya via derived)
State machine hanya tahu:
dailyBar (hari ini)
derived metrics (hari ini)
previousState (optional, untuk continuity logic)
🧠 2️⃣ PRIORITY ORDER (ABSOLUTE)
Evaluasi harus mengikuti urutan ini, tanpa pengecualian:
Text
Salin kode
1. POST_EVENT
2. TERMINAL
3. DISTRIBUTION_RISK
4. MOMENTUM_EXPANSION
5. IGNITION
6. ACCUMULATION_WINDOW
7. PRE_ACCUMULATION
8. INACTIVE
First matched wins.
Tidak boleh reorder. Tidak boleh multi-state.
🧱 3️⃣ STATE CONDITIONS (FINAL LOCK v2.2)
🔹 INACTIVE
Ts
Salin kode
if (
  dailyBar.validationStatus !== "CONFIRMED" ||
  dailyBar.forwardYield < 0.03
)
  return INACTIVE
🔹 POST_EVENT
Ts
Salin kode
if (dailyBar.exDate && today >= exDate)
  return POST_EVENT
POST_EVENT lebih tinggi dari TERMINAL.
🔹 TERMINAL
Ts
Salin kode
if (
  derived.floatRotation60 >= 0.60 ||
  derived.priceDeviation >= 0.20
)
  return TERMINAL
Tidak boleh ada kondisi lain. Tidak boleh tambah threshold baru.
🔹 DISTRIBUTION_RISK
Ts
Salin kode
if (
  derived.floatRotation30 >= 0.40 ||
  (
    derived.rotationVelocity5D > 0 &&
    derived.priceDeviation >= 0.15
  )
)
  return DISTRIBUTION_RISK
Masih structure-based. Tidak time-based.
🔹 MOMENTUM_EXPANSION
Ts
Salin kode
if (
  derived.priceDeviation > 0.05 &&
  derived.priceDeviation < 0.15 &&
  derived.floatRotation30 < 0.40
)
  return MOMENTUM_EXPANSION
🔹 IGNITION
Ts
Salin kode
if (
  derived.priceDeviation > 0 &&
  derived.rotationVelocity5D <= 0 &&
  derived.floatRotation30 < 0.30
)
  return IGNITION
🔹 ACCUMULATION_WINDOW (EARLY MODE v2.2)
Ts
Salin kode
if (
  derived.floatRotation30 <= 0.25 &&
  Math.abs(derived.priceDeviation) <= 0.05 &&
  (
    derived.rangeCompression <= compressionThreshold
  ) &&
  derived.avgVolume20D >= liquidityThreshold &&
  higherLowCondition == true
)
  return ACCUMULATION_WINDOW
Important: Compression threshold harus di config. Tidak hardcoded.
🔹 PRE_ACCUMULATION
Fallback jika:
Ts
Salin kode
return PRE_ACCUMULATION
Jika tidak memenuhi kondisi di atas tapi masih CONFIRMED.
🛡 4️⃣ NO STATE MEMORY DEPENDENCY
State machine tidak boleh:
Mengunci state tertentu
Memerlukan X hari berturut state sama
Mengingat berapa lama di state tertentu
State = pure daily evaluation.
Kalau mau continuity logic, itu di derived layer, bukan di state.
🧪 5️⃣ ASSERTION GUARDS
Tambahkan:
Ts
Salin kode
assert(Object.values(State).includes(result))
Dan:
Ts
Salin kode
assert(!(result === TERMINAL && previousState === INACTIVE))
Karena TERMINAL tidak boleh muncul dari INACTIVE tanpa CONFIRMED.
🔒 6️⃣ WHAT STATE MACHINE CANNOT DO
❌ Tidak boleh mengirim signal
❌ Tidak boleh baca capital
❌ Tidak boleh tahu posisi
❌ Tidak boleh tahu drawdown
❌ Tidak boleh tahu sektor
❌ Tidak boleh tahu ranking
Hanya klasifikasi struktur.
🧠 7️⃣ TRANSITION INTEGRITY RULE
Tidak boleh ada kondisi di mana:
Dua state bisa true bersamaan
Karena priority order menangani itu.
Pastikan setiap threshold tidak overlap ambigu.
🎯 8️⃣ DESIGN PHILOSOPHY LOCK
State machine harus menjawab satu pertanyaan saja:
Di fase struktur mana saham ini hari ini?
Bukan:
Apakah menarik?
Apakah murah?
Apakah yield tinggi?
Itu bukan tugasnya.
🏁 STATUS
Dengan ini kita sudah punya:
✔ Derived Metrics Contract
✔ State Machine Contract
✔ Deterministic hierarchy
✔ No leakage
✔ No overlap ambiguity
✔ Early mode embedded
Arsitektur core sekarang 100% terkunci secara engineering.
