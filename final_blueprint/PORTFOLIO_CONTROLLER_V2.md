Mode: ARCHITECT REBUILD — PURE ALLOCATION ONLY
Scope: Tidak menyentuh alpha.
Tidak membaca struktur.
Tidak membaca float.
Tidak membaca yield.
Tidak membaca macro.
Hanya eksekusi signal.
🧱 PORTFOLIO_CONTROLLER v2.0
Type: Pure Allocation Layer
Status: CLEAN
Deterministic: YES
Alpha Awareness: ZERO
1️⃣ PURPOSE
Layer ini hanya bertugas:
Mengalokasikan capital ke signal yang sudah valid
Menutup posisi ketika signal exit muncul
Menjaga batas jumlah posisi
Menjaga batas ukuran posisi
Menghitung compounding
Layer ini tidak menentukan:
Kapan entry
Kapan exit
Mana saham terbaik
Ranking
Risk regime
Macro condition
Semua itu sudah diputuskan oleh: Dividend Cycle Engine.
2️⃣ INPUT CONTRACT
Portfolio Controller menerima setiap hari (EOD):
For each ticker:
Text
Salin kode
Ticker_ID
Signal ∈ {ENTRY, ADD_LIMITED, HOLD, PARTIAL_EXIT, FULL_EXIT, NO_ACTION}
Current_Position_Size (%)
Global parameters:
Text
Salin kode
Total_Capital = 100%
Max_Position_Size = 10%
Min_Position_Size = 5%
Max_Concurrent_Positions = 8
Cash_Buffer = 10%
Cooldown_After_Full_Exit = 30 trading days
Tidak ada input lain.
3️⃣ CORE PRINCIPLES
Signal supremacy
No override
No scoring
No ranking
No structure evaluation
No macro logic
No sector logic
4️⃣ DAILY EXECUTION ORDER (STRICT PRIORITY)
Evaluated once per EOD.
STEP 1 — PROCESS FULL EXIT
For all tickers:
Text
Salin kode
If Signal == FULL_EXIT:
    Close 100% position immediately
    Mark ticker in Cooldown
Tidak boleh ditunda. Tidak boleh dikurangi. Tidak boleh dinegosiasikan.
STEP 2 — PROCESS PARTIAL EXIT
Text
Salin kode
If Signal == PARTIAL_EXIT:
    Reduce position by 50%
Jika posisi < Min_Position_Size: → Close full.
STEP 3 — PROCESS ADD_LIMITED
Text
Salin kode
If Signal == ADD_LIMITED
AND Current_Position_Size < Max_Position_Size
AND Capital_Available > 0
Add until:
Max_Position_Size tercapai
Capital habis
Cash_Buffer tetap ≥ 10%
Tidak boleh melebihi Max_Position_Size.
STEP 4 — PROCESS NEW ENTRY
Entry hanya jika:
Text
Salin kode
Signal == ENTRY
AND Active_Positions < Max_Concurrent_Positions
AND Ticker not in Cooldown
AND Capital_Available > 0
Initial entry size:
Text
Salin kode
Entry_Size = Min_Position_Size
Tidak langsung full. Tidak adaptive. Tidak weighted.
Jika setelah semua ENTRY diproses masih ada slot kosong: Biarkan kosong. Tidak dipaksa isi.
STEP 5 — HOLD
Text
Salin kode
If Signal == HOLD:
    Do nothing
Portfolio layer tidak boleh mengurangi atau menambah.
5️⃣ CAPITAL AVAILABILITY RULE
Text
Salin kode
Capital_Available =
Total_Capital
- Sum(Current_Positions)
- Cash_Buffer
Cash_Buffer wajib tetap tersedia.
Tidak boleh digunakan kecuali semua posisi sudah penuh dan tidak ada exit.
6️⃣ COOL DOWN RULE
Setelah FULL_EXIT:
Text
Salin kode
Ticker cannot re-enter for 30 trading days
Ini mencegah churn. Tidak berbasis event timing. Murni discipline.
7️⃣ COMPOUNDING
Setiap realized profit:
Text
Salin kode
Total_Capital_next =
Total_Capital + Realized_Profit
Semua ukuran tetap berbasis %.
Tidak ada withdrawal logic. Tidak ada reinvest formula kompleks.
8️⃣ WHAT THIS LAYER DOES NOT DO
Tidak melakukan:
Float check
Yield ranking
Days_to_RUPS filtering
Sector clustering
Macro drawdown defense
Volatility sizing
Conviction weighting
Score calculation
Jika logic tersebut muncul, itu pelanggaran arsitektur.
9️⃣ SYSTEM FLOW (FINAL)
Text
Salin kode
State Machine
      ↓
Dividend Cycle Engine
      ↓
Signal Output
      ↓
Portfolio Controller (this spec)
      ↓
Order Execution
Portfolio layer tidak pernah naik ke atas. Hanya menerima perintah.
🔒 DETERMINISM GUARANTEE
Given identical:
Signal stream
Capital state
Output allocation selalu identik.
Tidak ada random fill. Tidak ada adaptive behavior. Tidak ada time-window override.
🎯 RESULTING ARCHITECTURE
Sekarang blueprint kamu benar-benar clean:
Layer 1 → Event Phase State Machine
Layer 2 → Dividend Cycle Engine
Layer 3 → Portfolio Controller v2.0
Tidak saling tumpang tindih. Tidak ada ranking ulang. Tidak ada alpha tambahan.
🔥 FINAL VERDICT
Sekarang:
✔ Signal layer bersih
✔ Portfolio layer bersih
✔ Tidak ada macro contamination
✔ Tidak ada scoring chaos
✔ Tidak ada duplication
Arsitektur sudah stabil.
