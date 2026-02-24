Mode: ARCHITECT CONSOLIDATION — CORE SIGNAL ONLY
Scope: Hanya signal layer.
Tidak ada macro.
Tidak ada sector cap.
Tidak ada portfolio sizing.
Tidak ada ranking formula kompleks.
🧱 DIVIDEND_CYCLE_ENGINE v2.0
Status: CLEAN CORE
Mode: Structure-First Event Exploitation
Scope: Single Ticker Signal Engine
Deterministic: YES
1️⃣ PURPOSE
Engine ini hanya bertugas:
Mengaktifkan state machine jika event valid
Mengevaluasi struktur exhaustion
Mengizinkan entry hanya pada phase yang tepat
Mengeluarkan posisi sebelum dividend trap
Engine ini tidak:
Mengatur alokasi
Mengatur jumlah posisi
Mengatur sektor
Mengatur macro exposure
Itu layer lain.
2️⃣ ACTIVATION GATE
Engine aktif hanya jika:
Salin kode

CorporateAction.validation_status == CONFIRMED
AND
Forward_Yield >= 3%
Jika tidak: STATE = INACTIVE
3️⃣ STRUCTURAL INPUT DEPENDENCY
Engine bergantung penuh pada:
EVENT_PHASE_STATE_MACHINE v2.0
Float rotation metrics
Price structure metrics
Tidak ada scoring. Tidak ada ranking. Tidak ada ML.
4️⃣ SIGNAL LOGIC (PURE STATE-DRIVEN)
Engine membaca state harian (EOD).
ENTRY PERMISSION
Entry hanya di:
Salin kode

State == ACCUMULATION_WINDOW
Optional add (terbatas):
Salin kode

State == IGNITION
Tidak ada entry di state lain. Tidak ada override.
HOLD LOGIC
Hold selama:
Salin kode

State == IGNITION
OR
State == MOMENTUM_EXPANSION
PARTIAL EXIT
Jika:
Salin kode

State == DISTRIBUTION_RISK
Engine boleh:
Kurangi posisi (≤50%)
Tidak wajib.
FULL EXIT (ABSOLUTE)
Jika:
Salin kode

State == TERMINAL
Exit seluruh posisi. Tidak ada override. Tidak ada discretion.
5️⃣ EARNINGS SHOCK HANDLING (SIMPLIFIED)
Jika terjadi shock fundamental besar:
Salin kode

YoY_Q_latest <= -30%
OR
Projected_FY < Last_FY × 0.7
Maka:
Salin kode

Force State = TERMINAL
Bukan INACTIVE.
Artinya: Structural trust rusak → keluar. Tapi cycle tetap deterministik.
Tidak membuat jalur logika paralel.
6️⃣ EVENT UPDATE LOCK (KEPT)
Jika ada perubahan RUPS / Cum Date:
Salin kode

Effective_Date = Next_Trading_Day_EOD
Tidak ada perubahan intraday. Tidak ada mutation mid-session.
Determinism terjaga.
7️⃣ NO RANKING FORMULA
Engine tidak menghitung:
Priority_Index
Yield / Float ratio
Composite scoring
Jika banyak ticker lolos, pemilihan dilakukan oleh layer portfolio, bukan oleh engine ini.
8️⃣ NO MACRO OVERRIDE
Engine tidak membaca:
IHSG drawdown
VIX
Global crash indicator
Jika market crash, structure akan rusak, dan state machine otomatis pindah ke:
DISTRIBUTION_RISK atau TERMINAL.
Cukup.
9️⃣ NO SECTOR AWARENESS
Engine tidak mengetahui:
Sektor
Exposure cluster
Thematic grouping
Itu portfolio concern.
🔟 DAILY EXECUTION FLOW
Salin kode

Validate Corporate Action
        ↓
Apply T+1 Lock if needed
        ↓
Evaluate Phase State (EOD)
        ↓
Map State → Action
        ↓
Emit Signal
Output hanya:
ENTRY
ADD_LIMITED
HOLD
PARTIAL_EXIT
FULL_EXIT
NO_ACTION
Tidak ada ukuran posisi. Tidak ada capital allocation.
🧠 DESIGN PHILOSOPHY
Core alpha:
Distribution exhaustion
→ Structural reclaim
→ Event acceleration
→ Narrative saturation
→ Exit before trap
Engine ini hanya memastikan: Kita tidak masuk terlalu cepat. Kita tidak keluar terlalu lambat.
🔒 DETERMINISM GUARANTEE
Given identical:
Corporate data
OHLCV
Float data
Engine output selalu identik.
Tidak ada randomness. Tidak ada adaptive tuning. Tidak ada threshold dinamis.
🎯 STRATEGIC POSITIONING
Sekarang arsitektur menjadi jelas:
Layer 1 → Event Phase State Machine (structure detection)
Layer 2 → Dividend Cycle Engine (action mapping)
Layer 3 → Portfolio Controller (allocation & cap)
Tidak tercampur.
🔥 FINAL VERDICT
Dividend Cycle Engine v2.0 sekarang:
✔ Minimal
✔ Structure-driven
✔ Deterministic
✔ No macro contamination
✔ No sector contamination
✔ No ranking chaos
✔ Pure signal
Ini sudah benar-benar:
Event-Phase Exploitation Engine
Bukan mini hedge fund framework.
