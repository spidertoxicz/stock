Backtest Framework Design saja.
Tidak nambah fitur. Tidak ubah logic. Hanya cara uji.
Mode: Deterministic Replay Only.
🎯 OBJECTIVE BACKTEST
Tujuan backtest bukan:
Optimasi parameter
Cari threshold terbaik
Curve fitting
Tujuan backtest adalah:
Membuktikan bahwa arsitektur deterministic ini konsisten menangkap: Exhaustion → Markup → Exit sebelum trap
🧱 1️⃣ DATA REQUIREMENT (MINIMAL & FIXED)
Per ticker, per hari (EOD):
Text
Salin kode
Date
Open
High
Low
Close
Volume
FreeFloat_Shares
CorporateAction.validation_status
RUPS_Date
Ex_Date
Forward_Yield
Tidak perlu data intraday. Tidak perlu macro index. Tidak perlu sektor.
Deterministic saja.
🧱 2️⃣ REPLAY ENGINE FLOW
Backtest harus identik dengan live flow:
Text
Salin kode
For each day (chronological order):

    Update State Machine v2.2
    Map to Signal (Dividend Engine)
    Execute via Portfolio Controller
    Record position & capital
⚠ Tidak boleh:
Melihat future data
Recompute threshold adaptif
Adjust parameter mid-run
Pure forward replay.
🧱 3️⃣ STRICT RULES
🔒 Rule 1 — No Future Leakage
State hari ini hanya pakai data ≤ hari ini.
🔒 Rule 2 — No Parameter Change
Threshold v2.2 tidak boleh berubah di tengah backtest.
🔒 Rule 3 — Exit Same-Day Close
Jika TERMINAL hari ini, anggap exit di close hari itu.
Tidak pakai hindsight best price.
🧱 4️⃣ METRIC YANG DIUKUR
Jangan terlalu banyak.
Cukup:
Total Return
CAGR
Max Drawdown
Win Rate per cycle
Avg Gain per winning cycle
Avg Loss per failed base
Time in Market %
Yang paling penting untuk engine ini:
Avg Gain per cycle vs Avg Loss per false base
Karena strategi ini cycle-based.
🧱 5️⃣ ANALISIS KHUSUS (WAJIB)
Buat 3 kategori hasil:
A. Successful Exhaustion Cycle
Entry → Ignition → Momentum → Exit Target: markup ≥ 70% dari total move
B. Early False Base
Entry → Breakdown → TERMINAL cepat Target: loss kecil (< 8–12%)
C. Late Entry Miss
Move sudah terjadi sebelum ENTRY Target: minimal loss opportunity
🧱 6️⃣ SAMPLE SIZE WAJIB
Minimal:
5 tahun data
≥100 event cycle
≥30 emiten berbeda
Karena ini event-based engine, bukan trend-following biasa.
🧱 7️⃣ VALIDATION CHECKLIST
Backtest dianggap sehat jika:
✔ False base loss kecil
✔ Avg gain > 2x avg loss
✔ Drawdown terkendali
✔ Tidak tergantung 1–2 saham saja
✔ Konsisten di sektor berbeda
Kalau hanya profit besar karena 2 saham, itu bukan sistem.
🧱 8️⃣ YANG TIDAK BOLEH DILAKUKAN
❌ Mengubah Float_Rotation threshold setelah lihat hasil
❌ Mengubah compression hari setelah lihat hasil
❌ Mengaktifkan dividend pricing layer
❌ Menambahkan macro filter saat drawdown tinggi
Backtest bukan untuk mempercantik. Backtest untuk validasi robustness.
🏁 FINAL STRUCTURE
Backtest Engine =
Layer 1 (State Machine v2.2)
→ Layer 2 (Dividend Engine v2.0)
→ Layer 3 (Portfolio Controller v2.0)
→ Performance Tracker
Tanpa shortcut.
