Mode: EARLY EXHAUSTION DETECTION DRILL
Target: Masuk sedini mungkin setelah distribusi selesai
Tanpa jadi predictive, tanpa merusak determinism.
Kita pakai pola seperti:
Bank CIMB Niaga Tbk
Mitra Pinasthika Mustika Tbk
Yang kita cari:
Bisa tidak kita masuk 3–5 hari lebih awal tanpa meningkatkan false signal drastis?
🎯 DEFINISI “AKHIR DISTRIBUSI PALING AWAL”
Secara struktur, akhir distribusi biasanya punya 4 ciri:
1️⃣ Float rotation mulai melambat
2️⃣ Range makin sempit (compression)
3️⃣ Breakdown gagal (false breakdown)
4️⃣ Volume mengecil sebelum reclaim
Bukan menunggu breakout. Bukan menunggu RUPS.
🔎 DRILL STEP 1 — ROTATION VELOCITY
Saat ini kita pakai:
Text
Salin kode
Float_Rotation_30 ≤ 25%
Masalah: Ini angka statis.
Untuk masuk lebih awal, kita tambahkan satu syarat kecil:
Text
Salin kode
Rotation_Velocity_5D menurun ≥ 2 hari berturut
Artinya: Bukan hanya rotasi kecil, tapi laju distribusi melambat.
Ini membuat entry bisa 2–4 hari lebih cepat, tanpa menunggu compression terlalu lama.
Tetap deterministic. Tidak predictive.
🔎 DRILL STEP 2 — COMPRESSION EARLY SIGNAL
Saat ini:
Range_Compression 8–12 hari.
Untuk early detection, kita bisa izinkan:
Text
Salin kode
Range_Compression ≥ 7 hari
Tapi hanya jika:
Text
Salin kode
Rotation_Velocity melambat
Jadi kita tidak longgarkan sembarangan. Harus kombinasi.
🔎 DRILL STEP 3 — FALSE BREAKDOWN FILTER
Kasus BNGA & MPMX:
Ada flush kecil sebelum naik.
Tambahkan rule kecil:
Jika:
Low hari ini < low 5 hari sebelumnya
Tapi Close kembali ke dalam range
→ Tambah bobot exhaustion valid.
Ini menangkap stop-hunt. Masih deterministic. Tidak pakai dividen math.
🧠 SIMULASI LOGIKA DI MPMX
Distribusi ke 975, volume mengecil, range makin rapat.
Kalau kita tunggu 10 hari compression, mungkin entry di 990–1000.
Kalau pakai early drill: Rotation velocity turun + 7 hari compression → Entry bisa di 980–985.
Itu 15 poin lebih awal. Tanpa prediksi DPR. Tanpa prediksi RUPS.
🔥 RISIKO FALSE POSITIVE?
Kita ukur secara logika:
Kalau rotation velocity tidak turun, maka meskipun compression 7 hari, tidak trigger.
Kalau breakdown tidak gagal, tidak trigger.
Jadi false base tetap tersaring.
🎯 REFINED ACCUMULATION_WINDOW v2.1 (EARLY MODE)
Tanpa ubah DNA:
Text
Salin kode
Float_Rotation_30 ≤ 25%
AND
(
  Range_Compression ≥ 8 hari
  OR
  (Range_Compression ≥ 7 hari AND Rotation_Velocity menurun)
)
AND
Price_Deviation between -5% to +5%
Tidak tambah state. Tidak tambah layer. Hanya refine condition.
🧠 Kenapa Ini Elegan?
Karena:
Tetap structure-first
Tidak menyentuh dividend math
Tidak menyentuh macro
Tidak menyentuh ranking
Tidak predictive
Tapi bisa masuk 2–5 hari lebih awal.
