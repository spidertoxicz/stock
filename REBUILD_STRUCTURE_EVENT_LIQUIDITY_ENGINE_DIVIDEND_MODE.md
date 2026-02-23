🔧 UPDATED STRUCTURE — EVENT LIQUIDITY ENGINE v3.0
(Context preserved + upgraded foundation)
Struktur lama:
Salin kode

[ SCRAPER LAYER ]
        ↓
[ RAW DATA STORAGE ]
        ↓
[ NORMALIZATION LAYER ]
        ↓
[ EVENT DETECTION ENGINE ]
        ↓
[ EVENT SCORING ENGINE ]
        ↓
[ MOMENTUM / LIQUIDITY ENGINE ]
        ↓
[ SIGNAL ENGINE ]
        ↓
[ PORTFOLIO DECISION LAYER ]
Kita upgrade tanpa chaos.
✅ FINAL REFACTORED STRUCTURE (DETERMINISTIC VERSION)
Salin kode

[ SCRAPER LAYER ]
        ↓
[ RAW DATA STORAGE ]
        ↓
[ NORMALIZED MARKET DATABASE ]
        ↓
[ CORPORATE EVENT REGISTRY ]
        ↓
[ EARNINGS PROJECTION ENGINE ]
        ↓
[ DIVIDEND PROJECTION ENGINE ]
        ↓
[ EVENT PHASE STATE MACHINE ]
        ↓
[ LIQUIDITY TRANSITION ENGINE ]
        ↓
[ EXECUTION ENGINE ]
        ↓
[ PORTFOLIO DECISION LAYER ]
Sekarang kita jelaskan perbaikan, layer by layer.
1️⃣ SCRAPER LAYER  (unchanged)
Ambil:
OHLCV
Quarterly reports
Shares outstanding
Free float
RUPS date
Ex-date
Dividend history
No logic. Pure ingestion.
2️⃣ RAW DATA STORAGE  (unchanged)
Immutable.
Analog dengan RAW_BLOCK_FRAME di DEX engine.
Tidak boleh:
Modify
Overwrite
Adjust retroactively
3️⃣ NORMALIZED MARKET DATABASE  (NEW — MISSING BEFORE)
Ini yang dulu tidak jelas.
Fungsi:
Hitung MA, ATR
Hitung turnover
Hitung YoY growth
Hitung seasonal vector
Index per ticker per date
Ini bukan logic layer. Ini database computation layer.
4️⃣ CORPORATE EVENT REGISTRY  (clarified)
Semua event harus tercatat:
RUPS
Dividend announcement
Ex-date
Earnings release
Ini jadi trigger engine.
Tanpa event → engine tidak aktif.
5️⃣ EARNINGS PROJECTION ENGINE  (NEW CORE)
Ini yang tadi kita bahas.
Input:
Q1–Q4
Seasonal vector
Output:
Projected FY
Projected EPS
Error band
Pure matematis. No scoring. No guessing.
6️⃣ DIVIDEND PROJECTION ENGINE  (NEW CORE)
Input:
Projected EPS
Historical DPR
Output:
Projected dividend
Forward yield
Yield spread vs risk-free
Ini menggantikan scoring layer lama.
EVENT_SCORING_ENGINE → dihapus.
Karena sekarang yield itu bukan score. Itu angka matematis.
7️⃣ EVENT PHASE STATE MACHINE  (replacing vague momentum)
State:
Salin kode

PRE_ACCUMULATION
ACCUMULATION_WINDOW
IGNITION_ZONE
DISTRIBUTION_RISK
EVENT_DAY
POST_EVENT
Transition berbasis:
Days_to_RUPS
Yield validity
Overextension
Ini deterministic transition.
8️⃣ LIQUIDITY TRANSITION ENGINE  (refined momentum layer)
Bukan momentum. Bukan indicator generik.
Fungsi:
Detect accumulation absorption
Detect distribution spike
Detect overextension
Ini microstructure proxy.
9️⃣ EXECUTION ENGINE  (replacing SIGNAL ENGINE)
Tidak ada signal subjektif.
Hard rule:
Entry allowed:
State == ACCUMULATION_WINDOW
Days_to_RUPS 30–45
Yield ≥ 3%
Exit forced:
Days_to_RUPS < 14
Overextension
Distribution onset
Ini deterministic executor.
🔟 PORTFOLIO DECISION LAYER  (unchanged concept)
Tugas:
Allocate capital
Cap exposure per ticker
Risk management
Tidak boleh override engine rule.
⚠️ PERBAIKAN YANG BARU DITAMBAHKAN
✔ Database normalization layer eksplisit
✔ Earnings mathematical core
✔ Dividend projection core
✔ Hilangkan scoring ambigu
✔ Hilangkan momentum generik
✔ Formal state machine
✔ Execution layer terpisah
Struktur lama tetap ada. Tapi sekarang clean.
🎯 KENAPA SEKARANG VALID?
Karena layer flow jadi:
Data → Financial Reality → Event State → Liquidity Transition → Execution
Bukan:
Data → Indicator → Score → Feeling → Entry
