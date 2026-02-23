🧱 MODE A — STABLE COMPOUNDING SPEC v1.0
Status: LOCKED
Risk Profile: Conservative Event Rotation
1️⃣ ENTRY RULE (TIDAK BERUBAH)
Plain text
Salin kode
State == ACCUMULATION_WINDOW
AND Adj_Float_Rotation < 25%
AND Forward_Yield >= 3%
AND Sector_Exposure < 2
Entry 50% + 50% scaling.
2️⃣ HOLD RULE (LEBIH KONSERVATIF)
Mode A tidak ride sampai TERMINAL.
Hold hanya jika:
Plain text
Salin kode
State ∈ {IGNITION, MOMENTUM_EXPANSION}
AND Adj_Float_Rotation < 40%
Batas diturunkan dari 50% → 40%.
3️⃣ EXIT RULE (MODE A VERSION)
Exit 100% jika salah satu:
Plain text
Salin kode
State == DISTRIBUTION_RISK
ATAU
Plain text
Salin kode
Adj_Float_Rotation >= 40%
ATAU
Plain text
Salin kode
Days_to_RUPS <= 14
Kita tidak masuk zona euforia.
Mode A selalu keluar sebelum trap.
4️⃣ POSITION SIZE (STABIL)
Plain text
Salin kode
Max_Position_Size = 8%
Max_Concurrent_Positions = 6
Cash_Buffer = 15%
Max_Per_Sector = 2
Lebih konservatif dari v1.1.
5️⃣ DRAWDOWN GUARD
Jika:
Plain text
Salin kode
Portfolio_Drawdown >= 12%
→ Reduce new position size to 5%
→ Pause entry 3 hari
Mode A sangat menjaga modal.
6️⃣ TARGET PROFIT EXPECTATION
Per event:
5% – 12% realistic.
Tidak kejar 20%+.
Compounding via rotation, bukan overextension.
7️⃣ FILOSOFI MODE A
Mode A adalah:
Early Liquidity Harvester.
Bukan:
Momentum Chaser.
Kita ambil bagian aman dari cycle, lalu pindah ke event berikutnya.
📈 PROYEKSI MATEMATIS
Kalau rata-rata:
8% per cycle
20–25 cycle per tahun
Capital rotation disiplin
Winrate 70%
CAGR 40–70% sangat masuk akal.
Tidak perlu 200% dulu.
🧠 Kenapa Ini Cerdas?
Karena:
Volatility kecil + compounding stabil
Lebih kuat dari agresif tapi crash.
🔥 SEKARANG LANGKAH KRITIS
Kita sudah punya:
✔ Event engine
✔ Float model
✔ Execution
✔ Mode A spec
Sekarang benar-benar waktunya:
Build Historical Data Build Spec
Karena tanpa data historis, Mode A belum terbukti.
