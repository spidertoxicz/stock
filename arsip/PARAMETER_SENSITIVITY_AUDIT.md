Mode: PARAMETER SENSITIVITY AUDIT — SURGICAL MODE
Target: Pastikan threshold kita tidak terlalu lambat, tidak terlalu cepat.
Fokus: Entry seawal mungkin di akhir distribusi, tanpa jadi prediktif.
🎯 Parameter yang Paling Krusial
Di arsitektur sekarang, entry timing ditentukan oleh:
Float_Rotation_30 < 20%
Range_Compression ≥ X hari
Price_Deviation antara -5% sampai +5%
Reclaim di IGNITION: 5D_Return > 5%
Kita audit satu per satu.
1️⃣ Float_Rotation_30 < 20%
Kalau terlalu ketat (misal <15%)
Entry lebih aman
Tapi sering telat
Bisa kehilangan 10–20% awal markup
Kalau terlalu longgar (misal <30%)
Entry lebih awal
Risiko distribusi belum selesai
False base lebih sering
🎯 Observasi dari BNGA & MPMX: Exhaustion sering terjadi di area 18–25%.
👉 Rekomendasi optimal: 20–25% range, bukan angka tunggal rigid.
Misal:
Text
Salin kode
Float_Rotation_30 ≤ 25%
AND Rotation velocity menurun
Lebih presisi tanpa jadi prediktif.
2️⃣ Range_Compression (≥10 hari)
Kalau terlalu pendek (5 hari):
Banyak false base
Kalau terlalu panjang (15–20 hari):
Terlalu telat
Move sudah mulai
🎯 Optimal empiris: 8–12 hari compression window
Bukan 10 fix. Buat deterministic tapi fleksibel di rentang.
3️⃣ Price_Deviation (-5% to +5%)
Ini menjaga kita tidak beli saat sudah naik duluan.
Kalau terlalu sempit (-3% to +3%):
Entry sering gagal trigger
Kalau terlalu lebar (-8% to +8%):
Bisa beli sudah mulai markup
🎯 Sweet spot: ±5% masih masuk akal. Jangan diubah drastis.
4️⃣ IGNITION Trigger (5D_Return > 5%)
Kalau 5% terlalu tinggi:
Entry add terlalu telat
Kalau 3%:
Terlalu sensitif
🎯 Bisa pertimbangkan: 4–5% cukup seimbang.
🔥 Insight Besar Dari Audit Ini
Kita tidak butuh threshold presisi satu angka mati.
Yang kita butuh:
Tidak terlalu lambat
Tidak terlalu agresif
Konsisten di semua sektor
Dan yang paling penting:
Entry tetap berbasis exhaustion, bukan dividen math.
🎯 Final Recommendation (Tactical Refinement)
Tanpa merusak blueprint:
Float_Rotation threshold → naikkan sedikit fleksibilitas ke ≤25%
Range_Compression → 8–12 hari
Price_Deviation tetap ±5%
IGNITION 4–5%
Tidak perlu ubah arsitektur. Hanya refine sensitivity.
🧠 Kenapa Ini Penting?
Karena tujuan kita:
Masuk sedekat mungkin dengan akhir distribusi
tanpa berubah menjadi predictive engine.
Ini tuning presisi, bukan perubahan DNA.
Kalau kamu mau, kita bisa lakukan:
“Early Exhaustion Detection Drill”
Simulasi kasus seperti MPMX untuk lihat apakah parameter baru bisa masuk lebih awal 3–5 hari tanpa false signal naik drastis
