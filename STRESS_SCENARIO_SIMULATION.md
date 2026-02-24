Mode: STRESS SCENARIO SIMULATION — STRUCTURAL TRUTH ONLY
Scope: Uji robustness arsitektur saat kondisi ekstrem.
Tidak mengubah design. Hanya menguji konsistensi & survivability.
Arsitektur yang diuji:
Layer 1 → Event Phase State Machine v2.0
Layer 2 → Dividend Cycle Engine v2.0
Layer 3 → Portfolio Controller v2.0
🧨 SCENARIO 1 — MARKET CRASH 25% (IHSG Drop)
Contoh historis: IHSG saat crash pandemi 2020.
Kondisi:
Harga turun tajam
ATR melonjak
Float rotation spike
Price_Deviation negatif ekstrem
Apa yang terjadi di arsitektur kita?
Layer 1:
Structure rusak
Float_Rotation_30 naik cepat
Price breakdown → STATE → DISTRIBUTION_RISK atau TERMINAL
Layer 2: → FULL_EXIT
Layer 3: → Close semua posisi
Apakah kita butuh macro kill-switch?
Tidak.
Karena structure sudah rusak → auto exit.
✔ Engine survive crash
✔ Tidak butuh macro override
Verdict: PASS
🧨 SCENARIO 2 — EARNINGS SHOCK MENDADAK
Contoh: Bank CIMB Niaga Tbk tiba-tiba lapor EPS -40% YoY.
Layer 2: Earnings shock → Force TERMINAL
Layer 3: FULL_EXIT
Tidak perlu menunggu price collapse.
✔ Shock tidak menciptakan jalur paralel
✔ Tetap satu arah
Verdict: PASS
🧨 SCENARIO 3 — FALSE IGNITION (Fake Breakout)
Struktur:
Close > MA20
5D_Return > 5%
Masuk IGNITION
ENTRY / ADD terjadi
3 hari kemudian breakdown lagi
Layer 1: Structure rusak Float_Rotation naik → DISTRIBUTION_RISK → TERMINAL
Layer 3: Partial → Full Exit
Kerugian kecil. Tidak averaging down. Tidak ada double entry.
✔ Tidak spiral loss
✔ Tidak martingale
Verdict: PASS
🧨 SCENARIO 4 — ROTATION SPIKE SEBELUM RUPS (Dividend Trap)
Kasus tipikal: Harga naik tajam 12 hari sebelum RUPS. Float_Rotation_30 > 40%. Price_Deviation > 15%.
Layer 1: → DISTRIBUTION_RISK
Jika spike berlanjut: → TERMINAL
Layer 3: Partial → Full Exit
Kita keluar sebelum narrative climax.
✔ Alpha inti terlindungi
✔ Tidak jadi liquidity provider
Verdict: PASS
🧨 SCENARIO 5 — DIVIDEND DIBATALKAN
Corporate validation berubah jadi INVALID.
Layer 1: → INACTIVE
Layer 2: Tidak ENTRY lagi. Jika sudah posisi? Karena event invalid, harus trigger:
Best practice: Force TERMINAL.
Jika belum kita set explicit rule, ini satu celah kecil.
⚠ Minor refinement: Jika CorporateAction.validation_status berubah dari CONFIRMED → REVOKED → Force TERMINAL
Tanpa itu, posisi bisa bertahan tanpa event relevance.
Verdict: PASS with minor patch suggestion
🧨 SCENARIO 6 — 8 POSISI SEMUA MASUK DISTRIBUTION_RISK BERSAMAAN
Layer 2: Semua kirim PARTIAL_EXIT
Layer 3: Reduce 50% masing-masing
Jika lanjut ke TERMINAL: Semua FULL_EXIT
Capital kembali jadi cash. Tidak ada forced hold. Tidak ada panic override.
✔ Clean unwinding
✔ No allocation chaos
Verdict: PASS
🧠 SCENARIO 7 — LIQUIDITY DRY UP (Volume Turun Ekstrem)
Range compression naik, float rotation stagnan.
State Machine: Tetap di PRE_ACCUMULATION atau ACCUMULATION_WINDOW.
Portfolio: Tidak dipaksa entry jika slot kosong.
✔ Tidak overtrade
✔ Tidak forced deployment
Verdict: PASS
🧨 SCENARIO 8 — LONG SIDEWAYS MARKET 1 TAHUN
Tidak banyak event besar. Sedikit ticker valid.
Portfolio: Cash buffer tetap ada. Tidak memaksa entry. Compounding lambat tapi stabil.
Tidak ada feature drift. Tidak ada desperation logic.
Verdict: PASS
🔥 OVERALL STRESS RESULT
Crash Survival: PASS
Shock Handling: PASS
False Breakout: PASS
Dividend Trap: PASS
Cluster Exit: PASS
Liquidity Freeze: PASS
Sideways Regime: PASS
Satu minor patch:
Corporate event revocation → Force TERMINAL
Selain itu: Arsitektur robust.
🎯 FINAL STRUCTURAL VERDICT
Blueprint sekarang:
✔ Deterministic
✔ Layered
✔ No alpha duplication
✔ No macro contamination
✔ No ranking chaos
✔ No circular dependency
✔ Survive crash
✔ Capture pre-RUPS markup
✔ Exit before trap
Engine ini sekarang benar-benar:
Event-Phase Exploitation System
Bukan dividend collector biasa.
