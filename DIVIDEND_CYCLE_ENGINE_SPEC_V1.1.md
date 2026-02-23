🧱 DIVIDEND CYCLE ENGINE SPEC v1.1
Status: LOCKED
Mode: Deterministic Event Rotation
Upgrade dari v1.0 dengan:
Earnings Shock Kill-Switch
Sector Exposure Cap
Event Update T+1 Lock
🔒 1️⃣ EVENT UPDATE T+1 LOCK RULE
Problem
Perubahan RUPS / Cum Date intraday bisa merusak state machine.
Solution (Hard Rule)
Semua update corporate action:
Plain text
Salin kode
Effective_Date = Next_Trading_Day_EOD
Artinya:
Jika event berubah hari ini
State machine tidak berubah hari ini
Perubahan berlaku mulai besok
Tidak ada mid-session mutation.
Determinism terjaga.
🔒 2️⃣ EARNINGS SHOCK KILL-SWITCH
Problem
Seasonal projection tidak valid jika fundamental anomali besar.
Shock Definition
Jika:
Plain text
Salin kode
YoY_Q_latest <= -30%
ATAU
Plain text
Salin kode
Projected_FY < Last_FY × 0.7
Maka:
Plain text
Salin kode
Fundamental_Status = SHOCK
Engine Reaction
Jika Fundamental_Status == SHOCK:
State = INACTIVE
Entry forbidden
Existing position → forced review
Dividend cycle tidak boleh aktif dalam kondisi earnings collapse.
🔒 3️⃣ SECTOR EXPOSURE CAP
Problem
Cluster risk (misal 5 bank sekaligus)
Hard Constraint
Tambahkan parameter:
Plain text
Salin kode
Max_Position_Per_Sector = 2
Jika sudah 2 saham sektor sama aktif:
Entry untuk sektor itu ditolak
Pindah ke sektor lain
Ini menjaga:
Rotation sehat
Tidak overexposed 1 macro theme
🔒 4️⃣ UPDATED EXECUTION PRIORITY FILTER
Ranking sekarang menjadi:
Plain text
Salin kode
Priority_Index =
Forward_Yield
/
(Adj_Float_Rotation + 1)
Dengan tambahan filter:
Plain text
Salin kode
Sector_Exposure < Max_Position_Per_Sector
🔒 5️⃣ UPDATED TERMINAL CONDITION (SAFETY)
Jika:
Plain text
Salin kode
Macro_Index_Drawdown >= 20%
(Contoh IHSG crash)
Engine global mode:
Plain text
Salin kode
Risk_Mode = DEFENSIVE
Max_Position_Size = 5%
No new entry
Dividend cycle tidak kebal macro crash.
🧠 AFTER PATCH REVIEW
Sekarang blueprint memiliki:
✔ Corporate validation deterministic
✔ Event update locking
✔ Earnings shock filter
✔ Float rotation structural model
✔ Clean state machine
✔ Execution discipline
✔ Sector risk cap
✔ Macro kill-switch
Chaos risk = rendah.
Overfit risk = rendah.
Operational stability = tinggi.
🎯 REALITY CHECK
Dengan v1.1 ini:
Engine bukan hanya:
“Dividend sniper”
Tapi sudah menjadi:
Event-driven capital rotation system with structural risk guard.
📌 STATUS
Dividend Cycle Engine v1.1
Deterministic
Layered
Audited
Stabil untuk implementasi
