🧱 FINAL BLUEPRINT SUMMARY (LOCKED VERSION)
Engine kamu sekarang terdiri dari 3 layer inti + replay framework.
Tidak ada macro.
Tidak ada ranking.
Tidak ada predictive dividend math.
Fokus: Exhaustion → Markup → Exit before trap
🥇 LAYER 1 — EVENT_PHASE_STATE_MACHINE v2.2 (LOCKED)
🎯 Purpose
Mendeteksi fase struktur harian per ticker.
🔑 Core Philosophy
Structure-first. Time-secondary. Deterministic.
🔍 Early Mode + False Base Immunity
ACCUMULATION_WINDOW aktif jika:
Float_Rotation_30 ≤ 25%
Price_Deviation ±5%
Compression ≥ 8 hari
ATAU ≥7 hari + rotation velocity melambat
Higher low valid
Liquidity minimum terpenuhi
🧭 State Flow
Salin kode

INACTIVE
PRE_ACCUMULATION
ACCUMULATION_WINDOW   → ENTRY ZONE
IGNITION              → RECLAIM
MOMENTUM_EXPANSION    → MARKUP
DISTRIBUTION_RISK     → OVERHEAT
TERMINAL              → TRAP ZONE
POST_EVENT
Single state per day. Priority strict.
🥈 LAYER 2 — DIVIDEND_CYCLE_ENGINE v2.0 (Signal Mapper)
🎯 Purpose
Mapping state → action.
🔁 Mapping (Locked)
STATE
SIGNAL
ACCUMULATION_WINDOW
ENTRY
IGNITION
ADD_LIMITED
MOMENTUM_EXPANSION
HOLD
DISTRIBUTION_RISK
PARTIAL_EXIT
TERMINAL
FULL_EXIT
Others
NO_ACTION
Tidak boleh ada override. Tidak boleh baca calendar. Tidak boleh baca capital.
Alpha hidup di layer ini.
🥉 LAYER 3 — PORTFOLIO_CONTROLLER v2.0 (Pure Allocation)
🎯 Purpose
Eksekusi signal tanpa sentuh alpha.
🔐 Rules
Max 8 posisi
Max 10% per posisi
Min 5% entry
Cash buffer 10%
Cooldown 30 hari
🔁 Execution Order (Sacred)
FULL_EXIT
PARTIAL_EXIT
ADD_LIMITED
ENTRY
HOLD
Tidak boleh diubah.
🧮 DERIVED METRICS CONTRACT
Semua dihitung dari data historis ≤ hari ini:
Float_Rotation_30 / 60
Rotation_Velocity_5D
MA20
ATR14
Price_Deviation
Range_Compression
Avg_Volume_20D
False_Breakdown_Recovery
Pure. No future leak.
🧪 BACKTEST FRAMEWORK (Deterministic Replay)
Flow:
Salin kode

DailyBar
 → Derived Calculator
 → State Machine
 → Signal Mapper
 → Portfolio Controller
 → Performance Tracker
Rules:
No lookahead
Double run identical
Capital conservation
Terminal supremacy
🛡 What We Explicitly DID NOT Include
❌ Dividend pricing predictor
❌ Macro overlay
❌ Sector ranking
❌ Yield ranking
❌ Adaptive threshold
❌ ML
❌ Multi-factor scoring
Engine tetap clean.
🎯 CORE IDENTITY ENGINE
Engine kamu sekarang adalah:
Event-Phase Exhaustion Exploitation System
Bukan: Dividend yield hunter
Bukan calendar trader
Bukan macro regime model
Fokusnya:
Supply selesai → markup dimulai → keluar sebelum trap.
