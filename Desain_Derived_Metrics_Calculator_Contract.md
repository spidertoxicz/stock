Desain Derived Metrics Calculator Contract dengan prinsip:
Pure function
No future leakage
No side effect
Deterministic
Historical window explicit
Tidak boleh baca data > today
🧱 FILE: core/metrics/derived_calculator.ts
🎯 1️⃣ CONTRACT SIGNATURE
Ts
Salin kode
calculateDerivedMetrics(
  ticker: string,
  history: DailyBar[],   // ordered ASC, up to today
  todayIndex: number     // index of today inside history
): DerivedMetrics
RULES:
history sudah chronological
todayIndex menunjuk hari yang sedang dievaluasi
Function tidak boleh mengakses history[todayIndex + 1]
Jika data tidak cukup → return safe fallback
🧠 2️⃣ DERIVED METRICS DEFINITIONS (LOCKED)
Kita definisikan satu per satu secara eksplisit.
🔹 A. FLOAT_ROTATION_30
Ts
Salin kode
floatRotation30 =
  sum(volume from todayIndex-29 to todayIndex)
  /
  freeFloatShares(today)
Constraints:
Jika data < 30 hari → return 0
Jika freeFloatShares ≤ 0 → return 0
Tidak boleh pakai rata-rata free float
Pakai freeFloatShares hari ini
🔹 B. FLOAT_ROTATION_60
Sama seperti di atas, window 60 hari.
🔹 C. ROTATION_VELOCITY_5D
Ts
Salin kode
rotationVelocity5D =
  floatRotation30(today)
  -
  floatRotation30(5 hari lalu)
Kalau data < 35 hari → return 0
Ini untuk deteksi distribusi melambat.
🔹 D. PRICE_DEVIATION
Ts
Salin kode
priceDeviation =
  (close(today) - MA20(today))
  /
  MA20(today)
MA20 Definition (locked):
Simple moving average 20 hari close.
Jika data < 20 hari → return 0
🔹 E. RANGE_COMPRESSION
Definisi yang deterministic:
Ts
Salin kode
rangeCompression =
  ATR14(today) / close(today)
ATR14 = Average True Range 14 hari (SMA, bukan EMA)
Jika data < 14 hari → return 0
Semakin kecil → semakin compress.
🔹 F. AVG_VOLUME_20D
Ts
Salin kode
avgVolume20D =
  sum(volume 20 hari) / 20
Jika data < 20 → return 0
🔹 G. FALSE_BREAKDOWN_RECOVERY
Deterministic definition:
Ts
Salin kode
lowest5 =
  min(low from todayIndex-5 to todayIndex-1)

if
  low(today) < lowest5
AND
  close(today) >
      min(low from todayIndex-3 to todayIndex-1)
then
  falseBreakdownRecovery = true
else
  falseBreakdownRecovery = false
Jika data < 6 hari → false
Tidak boleh pakai subjective pattern recognition. Pure rule.
🛡 3️⃣ DATA SANITY GUARD (WAJIB)
Di awal function:
Ts
Salin kode
if (!isFinite(close) || close <= 0) return zeroMetrics
if (!isFinite(volume) || volume < 0) return zeroMetrics
if (!isFinite(freeFloatShares) || freeFloatShares <= 0) return zeroMetrics
Ini untuk failure injection protection.
🧱 4️⃣ RETURN OBJECT (IMMUTABLE)
Ts
Salin kode
return {
  floatRotation30,
  floatRotation60,
  rotationVelocity5D,
  priceDeviation,
  rangeCompression,
  avgVolume20D,
  falseBreakdownRecovery
}
Tidak boleh ada field tambahan.
🔒 5️⃣ HARD RULES
Derived calculator:
❌ Tidak boleh baca portfolio
❌ Tidak boleh baca signal
❌ Tidak boleh baca state
❌ Tidak boleh baca RUPS timing
❌ Tidak boleh baca forward yield
Ini pure structure calculator.
🧪 6️⃣ REQUIRED ASSERTIONS
Tambahkan internal check:
Ts
Salin kode
assert(floatRotation30 >= 0)
assert(rangeCompression >= 0)
assert(Math.abs(priceDeviation) < 10)
Kalau violation → throw error.
Better crash early than silent corruption.
🎯 FINAL FLOW
Replay Runner akan:
Ts
Salin kode
for each ticker per day:

  derived = calculateDerivedMetrics(...)
  state = evaluateState(derived, dailyBar)
  signal = mapStateToSignal(state)
  portfolio = executeSignal(...)
Derived layer sepenuhnya terisolasi.
🏁 STATUS
Derived Metrics Contract sekarang:
✔ Deterministic
✔ No future leak
✔ Window explicit
✔ Sanity guarded
✔ Failure injection resistant
✔ Tidak bisa drift layer
Blueprint kamu sekarang secara teknis sudah sangat solid.
