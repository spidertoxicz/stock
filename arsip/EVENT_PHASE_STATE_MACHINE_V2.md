Mode: STRICT ARCHITECT — STRUCTURE FIRST
Tidak tambah state.
Tidak tambah fitur spekulatif.
Hanya re-anchor logic dari Time → Structure.
🧱 EVENT_PHASE_STATE_MACHINE v2.0
Mode: Event-Driven Structural Transition
Status: DRAFT REBUILD
Scope: Regular Annual Dividend Only
Philosophy: Structure First · Time Secondary
1️⃣ PURPOSE
Menentukan secara deterministic:
Kapan distribusi selesai
Kapan pre-accumulation valid
Kapan ignition terjadi
Kapan distribution dimulai
Kapan exit wajib
Kapan engine reset
State machine aktif hanya jika:
Salin kode

CorporateAction.validation_status == CONFIRMED
Jika tidak → STATE = INACTIVE
2️⃣ INPUT VARIABLES (MANDATORY)
Daily per ticker:
Salin kode

Today_Date
RUPS_Date
Ex_Date
Dividend_Amount
Forward_Yield
FreeFloat_Shares
Close
Daily_Volume
MA20
MA50
ATR14
Derived:
Salin kode

Days_to_RUPS = RUPS_Date - Today_Date
Float_Rotation_30 = Σ(volume 30 hari) / FreeFloat_Shares
Float_Rotation_60 = Σ(volume 60 hari) / FreeFloat_Shares
Price_Deviation = (Close - MA20) / MA20
Range_Compression = ATR14 / Close
5D_Return
3️⃣ STATE ENUMERATION (UNCHANGED)
Salin kode

INACTIVE
PRE_ACCUMULATION
ACCUMULATION_WINDOW
IGNITION
MOMENTUM_EXPANSION
DISTRIBUTION_RISK
TERMINAL
POST_EVENT
Tidak boleh ada state tambahan.
4️⃣ STRUCTURE-FIRST STATE DEFINITIONS
🔹 INACTIVE
Condition:
Salin kode

Validation != CONFIRMED
OR
Forward_Yield < 3%
Action: Entry disabled
🔹 PRE_ACCUMULATION
Structural condition:
Salin kode

Float_Rotation_60 > 40%
AND
Price_Deviation < 0
Interpretation: Distribusi lama masih berlangsung. Supply belum selesai.
Entry disabled.
Time tidak relevan di sini.
🔹 ACCUMULATION_WINDOW (PRIMARY ENTRY ZONE)
Structural exhaustion:
Salin kode

Float_Rotation_30 < 20%
AND
Range_Compression menurun ≥ 10 hari
AND
Price_Deviation between -5% to +5%
Time filter (secondary only):
Salin kode

Days_to_RUPS > 21
Entry allowed.
Ini zona exhaustion + base formation. Bukan sekadar 30–45 hari.
🔹 IGNITION
Structure reclaim:
Salin kode

Close > MA20
AND
5D_Return > 5%
AND
Float_Rotation_30 < 30%
Time secondary:
Salin kode

Days_to_RUPS > 14
Action: Add allowed (limited) Momentum emerging.
Ignition adalah reclaim structure, bukan countdown hari.
🔹 MOMENTUM_EXPANSION
Salin kode

Close > MA50
AND
Price_Deviation < 15%
AND
Float_Rotation_30 < 40%
Time secondary:
Salin kode

Days_to_RUPS > 7
Action: Hold only No new entry
Ini fase markup institusi.
🔹 DISTRIBUTION_RISK
Triggered if ANY structural overheating:
Salin kode

Float_Rotation_30 >= 40%
OR
5D_Return > 12% AND Volume > 2x MA20
OR
Price_Deviation >= 15%
Time only amplifies risk if:
Salin kode

Days_to_RUPS <= 14
Action: Partial exit allowed. No new entry.
Ini early narrative saturation.
🔹 TERMINAL
Triggered if ANY:
Salin kode

Float_Rotation_60 >= 60%
OR
Price_Deviation >= 20%
OR
Blowoff pattern (5D_Return > 20%)
Time override only if:
Salin kode

Days_to_RUPS <= 5
Action: Full exit mandatory. No override.
Ini dividend trap zone.
Bukan karena cumdate. Karena supply kembali dominan.
🔹 POST_EVENT
Salin kode

Today_Date >= Ex_Date
Action: Reset cycle. Wait next confirmation.
5️⃣ TRANSITION PRIORITY (UNCHANGED)
Evaluated daily (EOD).
Priority order:
Salin kode

POST_EVENT
TERMINAL
DISTRIBUTION_RISK
MOMENTUM_EXPANSION
IGNITION
ACCUMULATION_WINDOW
PRE_ACCUMULATION
INACTIVE
First matched wins.
6️⃣ ENTRY MATRIX (UNCHANGED)
State
Entry
Add
INACTIVE
❌
❌
PRE_ACCUMULATION
❌
❌
ACCUMULATION_WINDOW
✅
✅
IGNITION
⚠ Limited
⚠ Limited
MOMENTUM_EXPANSION
❌
❌
DISTRIBUTION_RISK
❌
❌
TERMINAL
❌
❌
POST_EVENT
❌
❌
7️⃣ EXIT RULE (ABSOLUTE)
Salin kode

State == TERMINAL → Full exit mandatory.
No override.
8️⃣ DESIGN PHILOSOPHY SHIFT
v1.0: Event-time compression model.
v2.0: Structure exhaustion → structure reclaim → event acceleration.
Time sekarang: Contextual risk amplifier. Bukan primary trigger.
9️⃣ DETERMINISM GUARANTEE
Given identical:
Historical OHLCV
Float data
Corporate validation
State output selalu identik.
No scoring. No ML. No dynamic threshold. No adaptive tuning.
🔥 STRATEGIC DIFFERENCE vs v1.0
v1 bisa masuk karena: “30 hari sebelum RUPS”.
v2 hanya masuk jika: Distribusi benar-benar selesai.
Kasus seperti BNGA: Distribusi selesai 17 Maret, Ignition sebelum RUPS, Exit sebelum narrative climax.
v2 mampu menangkap itu. v1 tidak.
🎯 FINAL VERDICT
Sekarang state machine sudah:
✔ Structure-first
✔ Deterministic
✔ Tidak event-obsessed
✔ Tidak chaos
✔ Sejalan mindset DEX engine
