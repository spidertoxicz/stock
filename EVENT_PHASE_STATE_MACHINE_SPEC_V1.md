🧱 EVENT PHASE STATE MACHINE SPEC v1.0
Mode: Dividend Cycle Deterministic
Status: LOCKED
Scope: Regular Annual Dividend Only
1️⃣ PURPOSE
Menentukan secara deterministic:
Kapan entry diizinkan
Kapan hold
Kapan exit wajib
Kapan engine dinonaktifkan
State machine ini hanya aktif jika:
Plain text
Salin kode
CorporateAction.validation_status == CONFIRMED
Jika tidak → STATE = INACTIVE
2️⃣ INPUT VARIABLES (MANDATORY)
Setiap ticker, setiap hari:
Plain text
Salin kode
Today_Date
RUPS_Date
Cum_Date
Ex_Date
Dividend_Amount
Projected_EPS
Forward_Yield
FreeFloat_Shares
Daily_Volume
MA20
ATR14
Derived:
Plain text
Salin kode
Days_to_RUPS = RUPS_Date - Today_Date
Float_Rotation = Σ(volume from T-45 to today) / FreeFloat_Shares
Price_Deviation = (Close - MA20) / MA20
3️⃣ STATE ENUMERATION
State hanya boleh salah satu dari berikut:
Plain text
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
4️⃣ STATE DEFINITIONS (HARD RULE)
🔹 STATE: INACTIVE
Condition:
Plain text
Salin kode
Validation != CONFIRMED
OR
Forward_Yield < 3%
Action:
Entry disabled
Exit ignored
🔹 STATE: PRE_ACCUMULATION
Condition:
Plain text
Salin kode
Days_to_RUPS > 45
Action:
Monitor only
Entry disabled
🔹 STATE: ACCUMULATION_WINDOW
Condition:
Plain text
Salin kode
30 <= Days_to_RUPS <= 45
AND Float_Rotation < 25%
Action:
Entry allowed
Position building phase
This is PRIMARY ENTRY ZONE.
🔹 STATE: IGNITION
Condition:
Plain text
Salin kode
14 < Days_to_RUPS < 30
AND Float_Rotation < 35%
Action:
Hold
New entry allowed only if Price_Deviation < 8%
Momentum begins but not yet distribution.
🔹 STATE: MOMENTUM_EXPANSION
Condition:
Plain text
Salin kode
Days_to_RUPS <= 14
AND Float_Rotation < 50%
AND Price_Deviation < 15%
Action:
Hold only
No new entry
Monitor volatility expansion
🔹 STATE: DISTRIBUTION_RISK
Triggered if ANY:
Plain text
Salin kode
Float_Rotation >= 35%
AND Days_to_RUPS <= 20
OR
Plain text
Salin kode
5-day return > 15%
AND Volume > 2.5x MA20
Action:
Partial exit allowed
No new entry
This is early distribution signal.
🔹 STATE: TERMINAL
Triggered if ANY:
Plain text
Salin kode
Float_Rotation >= 50%
OR
Plain text
Salin kode
Price_Deviation >= 20%
OR
Plain text
Salin kode
Days_to_RUPS <= 7
Action:
Full exit mandatory
Entry blocked
This is dividend trap zone.
🔹 STATE: POST_EVENT
Condition:
Plain text
Salin kode
Today_Date >= Ex_Date
Action:
Engine reset
Wait next cycle
5️⃣ STATE TRANSITION RULE
Transition evaluated DAILY (EOD).
Rule priority (highest first):
Plain text
Salin kode
POST_EVENT
TERMINAL
DISTRIBUTION_RISK
MOMENTUM_EXPANSION
IGNITION
ACCUMULATION_WINDOW
PRE_ACCUMULATION
INACTIVE
First matched condition wins.
This prevents ambiguous overlapping.
6️⃣ ENTRY PERMISSION MATRIX
State
Entry
Add Position
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
Exit triggered if:
Plain text
Salin kode
State == TERMINAL
No override.
8️⃣ DESIGN PHILOSOPHY
This engine assumes:
Dividend liquidity is gradual
Float rotation reflects supply exhaustion
Time to event defines risk compression
Distribution is visible before collapse
This is not prediction engine.
This is structural transition detector.
9️⃣ DETERMINISM GUARANTEE
Given same:
Historical data
Corporate validation
Float data
Engine will always produce identical state.
No randomness. No scoring. No ML black box.
🔒 STATUS
Event Phase State Machine v1.0
Mode: Dividend Cycle
Status: LOCKED
Sekarang blueprint sudah:
✔ Clean
✔ Deterministic
✔ Layered
✔ Anti-chaos
✔ Sejalan mindset DEX engine
