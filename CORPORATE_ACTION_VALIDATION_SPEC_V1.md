🧱 CORPORATE ACTION VALIDATION SPEC v1.0
(Dividend Mode – Deterministic)
Tujuan:
Memastikan data RUPS, Cum Date, Ex Date, Dividend Amount valid
sebelum engine aktif.
Tanpa validasi → Event Engine tidak boleh jalan.
1️⃣ PRINCIPLE DASAR
Corporate action dianggap VALID hanya jika:
Plain text
Salin kode
Minimal 2 sumber independen cocok
Jika tidak → status = UNCONFIRMED
Dan event state machine = DISABLED
2️⃣ EVENT DATA STRUCTURE
Setiap event disimpan dalam bentuk:
JSON
Salin kode
{
  "ticker": "BNGA",
  "event_type": "DIVIDEND",
  "rups_date": "2025-04-14",
  "cum_date": "2025-04-23",
  "ex_date": "2025-04-24",
  "dividend_amount": 156,
  "source_1": "...",
  "source_2": "...",
  "validation_status": "PENDING"
}
3️⃣ SOURCE HIERARCHY (PRIORITY RANK)
Sumber dibagi 3 level:
🔹 LEVEL 1 (Primary Authority)
Website IDX (Pengumuman Resmi)
Keterbukaan Informasi BEI
Website resmi emiten (IR page)
🔹 LEVEL 2 (Secondary Confirmation)
RTI / Stockbit / Kontan
News finansial nasional
🔹 LEVEL 3 (Noise – Tidak Boleh Jadi Primary)
Forum
Sosial media
4️⃣ VALIDATION RULES
RULE 1 — DATE CONSISTENCY
Event VALID jika:
Plain text
Salin kode
RUPS date sama di minimal 2 sumber
Cum date sama di minimal 2 sumber
Dividend amount sama di minimal 2 sumber
Jika mismatch → status = CONFLICT
RULE 2 — DATE LOGIC VALIDITY
Harus memenuhi:
Plain text
Salin kode
RUPS_date < Cum_date ≤ Ex_date
Jika tidak → INVALID
RULE 3 — DIVIDEND RATIONALITY CHECK
Dividend tidak boleh:
Plain text
Salin kode
Dividend > EPS terbaru
Jika iya → flag anomaly
(karena bisa special dividend atau salah input)
RULE 4 — REVISION HANDLING
Kadang:
RUPS diundur
Cum date berubah
Maka:
Jika sumber Level 1 update →
Event status berubah jadi:
Plain text
Salin kode
REVISION_PENDING
Engine harus:
Freeze state machine
Update timeline
Recalculate Days_to_RUPS
5️⃣ EVENT STATUS STATE
Event punya status:
Status
Meaning
PENDING
Baru 1 sumber
CONFIRMED
≥2 valid match
CONFLICT
Data beda antar sumber
REVISED
Ada update resmi
CANCELLED
Event dibatalkan
Engine hanya aktif jika:
Plain text
Salin kode
Status == CONFIRMED
6️⃣ AUTO REVALIDATION SCHEDULE
Karena kita tidak pakai API real-time:
Setiap hari:
Scrape ulang event yang statusnya:
PENDING
CONFIRMED (cek perubahan)
REVISION_PENDING
Ini mencegah data stale.
7️⃣ EDGE CASE HANDLING
Case A — Dividend diumumkan tapi belum ada Cum Date
→ status tetap CONFIRMED
→ tapi phase machine belum aktif penuh
Case B — RUPS belum menetapkan nominal final
→ gunakan “proposed dividend” → flag sebagai:
Plain text
Salin kode
PROVISIONAL
Engine boleh jalan tapi dengan risk flag.
8️⃣ EVENT ACTIVATION LOGIC
Event dianggap ACTIVE jika:
Plain text
Salin kode
validation_status == CONFIRMED
AND
dividend_amount != NULL
AND
rups_date != NULL
Baru setelah itu:
Event Phase State Machine mulai menghitung:
Plain text
Salin kode
Days_to_RUPS
9️⃣ LOGGING & AUDIT TRAIL (WAJIB)
Setiap perubahan event harus tersimpan:
JSON
Salin kode
{
  "ticker": "BNGA",
  "field_changed": "cum_date",
  "old_value": "2025-04-22",
  "new_value": "2025-04-23",
  "timestamp": "...",
  "source": "IDX"
}
Supaya replay tetap deterministic.
🔥 KENAPA LAYER INI KRUSIAL?
Karena dividend engine sangat tergantung pada:
Plain text
Salin kode
Timeline precision
Kalau cum-date salah 3 hari saja, entry window bisa meleset ke distribution zone.
Itu fatal.
🎯 SEKARANG STATUS ENGINE
Dengan layer ini ditambahkan:
Scraper ✔
Immutable ledger ✔
Corporate validation ✔
Earnings projection ✔
Dividend projection ✔
Event state machine ✔
Float rotation ✔
Blueprint sekarang rapi. Tidak lompat layer. Tidak chaos.
