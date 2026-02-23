🧱 EXECUTION & CAPITAL ROTATION SPEC v1.0
Mode: Dividend Cycle Dominance
Status: LOCKED
Type: Deterministic Capital Deployment Model
1️⃣ OBJECTIVE
Mengatur:
Kapan masuk
Berapa besar masuk
Kapan keluar
Bagaimana memutar modal antar 170 emiten
Bagaimana menjaga compounding
Tanpa discretionary override.
2️⃣ GLOBAL CAPITAL PARAMETERS
Define di awal:
Text id="f0b1a9"
Salin kode
Total_Capital = 100%
Max_Position_Size = 10%
Max_Concurrent_Positions = 8
Min_Position_Size = 5%
Cash_Buffer = 10%
Artinya:
Maksimal 8 saham aktif
Maksimal 10% per saham
Minimal 5% supaya meaningful
10% selalu cash (anti forced liquidation)
3️⃣ ENTRY EXECUTION RULE
Entry hanya jika:
Text id="9u3kxq"
Salin kode
State == ACCUMULATION_WINDOW
AND Adj_Float_Rotation < 25%
AND Forward_Yield >= 3%
Execution:
Entry 50% dari target position
Sisa 50% jika:
Rotation naik tapi < 25%
Price_Deviation < 8%
Tidak pernah full entry 1 kali.
4️⃣ POSITION SIZING LOGIC
Position size dihitung dari:
Text id="z41lpw"
Salin kode
Position_Size =
Min(
  Max_Position_Size,
  Capital_Available / Remaining_Opportunities
)
Tidak boleh overweight 1 saham.
Karena strategi ini berbasis:
Event diversification.
5️⃣ HOLDING RULE
Selama:
Text id="y3kead"
Salin kode
State ∈ {IGNITION, MOMENTUM_EXPANSION}
AND Adj_Float_Rotation < 50%
→ Hold penuh.
Tidak ada averaging down.
Tidak ada tambah posisi di IGNITION.
6️⃣ PARTIAL EXIT RULE
Jika:
Text id="kgp4nf"
Salin kode
State == DISTRIBUTION_RISK
Maka:
Reduce 50% position
Sisakan 50% untuk momentum tail
Jika Rotation_Velocity_5D > 10%
→ Reduce tambahan 25%
7️⃣ FULL EXIT RULE (MANDATORY)
Jika:
Text id="x6mtey"
Salin kode
State == TERMINAL
OR
Text id="ac0g5k"
Salin kode
Adj_Float_Rotation >= 50%
OR
Text id="onbl3g"
Salin kode
Price_Deviation >= 20%
→ Exit 100%
No override.
8️⃣ CAPITAL ROTATION ENGINE
Setiap hari setelah EOD:
Tutup posisi yang TERMINAL
Hitung Capital_Available
Scan 170 emiten
Ranking bukan berdasarkan score
tapi berdasarkan:
Text id="c2kr8m"
Salin kode
Lowest Float_Rotation
Highest Forward_Yield
Days_to_RUPS within 30–45
Ranking deterministic:
Text id="2e9p3v"
Salin kode
Priority_Index =
(Forward_Yield) / (Adj_Float_Rotation + 1)
Tanpa weight.
9️⃣ ROTATION DISCIPLINE RULE
Tidak boleh:
Re-enter ticker yang sama dalam 30 hari setelah exit
Overlap dua saham dengan RUPS di minggu yang sama lebih dari 3 posisi
Ini mencegah cluster risk.
🔟 DRAWDOWN CONTROL
Jika:
Text id="1f4q6k"
Salin kode
Portfolio_Drawdown >= 15%
Maka:
Kurangi Max_Position_Size jadi 5%
Pause entry 5 hari
Ini menjaga survival.
11️⃣ COMPOUNDING MECHANISM
Keuntungan tidak di-withdraw.
Capital baru:
Text id="78yqbe"
Salin kode
Total_Capital_next = Total_Capital + Realized_Profit
Position size tetap % based.
Compounding otomatis terjadi.
12️⃣ PHILOSOPHY
Engine ini tidak mencari:
Multibagger tunggal
Jackpot 1 saham
Engine ini mencari:
Konsistensi event rotation
5–12% per cycle
Dikalikan banyak cycle
Dengan 170 emiten, liquidity rotation hampir tidak pernah berhenti.

🔒 STATUS
Execution & Capital Rotation Spec v1.0
Mode: Dividend Cycle
Status: LOCKED
Sekarang blueprint sudah lengkap:
✔ Corporate Validation
✔ Earnings Projection
✔ Dividend Projection
✔ Event State Machine
✔ Float Rotation Model
✔ Execution & Capital Rotation
