Dividend Engine = “apa aksi yang harus dilakukan atas struktur itu?”
Kalau mapping salah → entry telat / exit telat → alpha hilang.
Sekarang kita kunci mapping secara deterministik.
🧱 FILE
core/dividend_engine/map_state_to_signal.ts
🎯 1️⃣ CONTRACT SIGNATURE (LOCKED)
Ts
Salin kode
mapStateToSignal(
  ticker: string,
  date: string,
  state: State
): SignalPayload
Rules:
Pure function
Tidak boleh baca portfolio
Tidak boleh baca capital
Tidak boleh baca float/yield lagi
Tidak boleh baca derived metrics lagi
Hanya baca state
State sudah final. Signal hanya refleksi state.
🎯 2️⃣ STATE → SIGNAL MAPPING (FINAL LOCK)
Ini inti alpha pre-RUPS kita.
🔹 INACTIVE
Ts
Salin kode
→ NO_ACTION
Tidak boleh entry.
🔹 PRE_ACCUMULATION
Ts
Salin kode
→ NO_ACTION
Distribusi belum selesai.
🔹 ACCUMULATION_WINDOW (EARLY MODE ENTRY ZONE)
Ts
Salin kode
→ ENTRY
Ini titik alpha utama.
✔ Supply exhaustion
✔ Compression valid
✔ Rotation melambat
Di sinilah institusi mulai akumulasi.
🔹 IGNITION
Ts
Salin kode
→ ADD_LIMITED
Kenapa bukan ENTRY lagi?
Karena ENTRY hanya boleh dari accumulation.
IGNITION = reclaim structure. Momentum mulai.
Di sini:
Tambah posisi jika masih ada slot
Bukan entry baru besar
🔹 MOMENTUM_EXPANSION
Ts
Salin kode
→ HOLD
Tidak tambah. Tidak kurangi.
Kita riding markup menuju event narrative.
Ini fase pre-RUPS acceleration.
🔹 DISTRIBUTION_RISK
Ts
Salin kode
→ PARTIAL_EXIT
Ini sinyal awal bahwa:
Float naik lagi
Price overheating
Kita tidak tunggu cumdate. Kita mulai kurangi sebelum trap.
🔹 TERMINAL
Ts
Salin kode
→ FULL_EXIT
Ini zona trap.
Tidak boleh ditunda. Tidak boleh dinegosiasi. Tidak boleh override.
🔹 POST_EVENT
Ts
Salin kode
→ NO_ACTION
Cycle selesai. Reset.
🎯 3️⃣ HARD RULES (ALPHA PROTECTION)
Dividend Engine tidak boleh:
❌ Mengirim ENTRY dari IGNITION
❌ Mengirim ENTRY dari MOMENTUM
❌ Mengirim HOLD dari TERMINAL
❌ Mengirim PARTIAL dari ACCUMULATION
Semua harus satu arah dan disiplin.
🧠 4️⃣ TRANSITION PHILOSOPHY
Flow ideal alpha kita:
Text
Salin kode
PRE_ACCUMULATION
    ↓
ACCUMULATION_WINDOW  → ENTRY
    ↓
IGNITION             → ADD_LIMITED
    ↓
MOMENTUM_EXPANSION   → HOLD
    ↓
DISTRIBUTION_RISK    → PARTIAL_EXIT
    ↓
TERMINAL             → FULL_EXIT
Tidak ada lompatan liar. Tidak ada skip random.
🔒 5️⃣ NO TIME-BASED OVERRIDE
Mapping tidak boleh baca:
Days_to_RUPS
Ex_date proximity
Calendar countdown
Karena kita sudah structure-first.
Kalender hanya konteks, bukan trigger.
🧪 6️⃣ ASSERTION RULE
Tambahkan guard:
Ts
Salin kode
assert(Object.values(State).includes(state))
assert(Object.values(Signal).includes(signal))
Dan:
Ts
Salin kode
if (state === TERMINAL && signal !== FULL_EXIT)
  throw Error("Terminal must map to FULL_EXIT")
Zero tolerance bug.
🎯 7️⃣ KENAPA INI TEMPAT ALPHA?
Karena:
State machine mendeteksi exhaustion.
Mapping memastikan kita benar-benar masuk.
Kalau mapping terlalu konservatif: Kita telat.
Kalau mapping terlalu agresif: Kita masuk saat distribusi belum selesai.
Sekarang mapping sudah presisi.
🏁 STATUS
Sekarang kita punya:
✔ Derived Metrics Contract
✔ State Machine Contract v2.2
✔ Dividend Engine Mapping Contract
✔ Portfolio Controller Contract
Semua layer terpisah. Semua deterministic. Semua alpha fokus di exhaustion → markup.
