✅ Modular Lightweight Architecture (Bukan rigid DDD, bukan monolith campur aduk)
Kita buat modular, tapi pragmatic.
🧱 Struktur Ideal untuk Project Ini
Plain text
Salin kode
/src
  /config
  /database
  /data
    /scraper
    /validator
  /engine
    /projection
    /state-machine
    /float-model
    /execution
  /backtest
  /types
  index.ts
Kenapa ini enak?
✔ Clear separation
✔ Bisa tambah module tanpa refactor besar
✔ Bisa cabut module tanpa rusak core
✔ Bisa scale 170 → 500 emiten
✔ Bisa migrasi DB nanti
Tapi tetap ringan.
🔥 Kenapa Jangan Monolith Flat?
Kalau semua logic di:
Plain text
Salin kode
engine.ts
Nanti saat tambah:
Earnings overlay
Earnings surprise module
Macro regime filter
Multi-strategy
Refactor jadi mimpi buruk.
🔥 Kenapa Jangan Over-Architected?
Kalau terlalu ketat:
Interface berlapis 5
Repository pattern kompleks
DI container
Event bus formal
Itu terlalu dini.
Kita belum production scale.
🧠 Filosofi yang Benar
Build for:
Clean separation, not enterprise ceremony.
🧱 Database Layer Design (Flexible)
Buat satu abstraction ringan:
TypeScript
Salin kode
interface DataStore {
  getDailyPrices(ticker: string)
  getCorporateEvents(ticker: string)
  getEarnings(ticker: string)
  getFloatHistory(ticker: string)
}
Kalau nanti pindah SQLite → Postgres, cukup ganti implementasi DataStore.
Engine tidak berubah.
Itu kuncinya.
🔥 Jadi Jawaban Final
Gunakan:
Node + TS + SQLite
Modular lightweight architecture
Simple DB abstraction
Itu balance antara:
Tidak terlalu ketat
Tidak chaos
Mudah scale
Mudah migrate
