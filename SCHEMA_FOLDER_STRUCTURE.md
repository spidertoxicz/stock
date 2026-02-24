🧱 OVERALL ARCHITECTURE
Kita pisahkan jadi 6 folder utama:
Text
Salin kode
/dividend_engine
│
├── data/
│   ├── raw/
│   ├── normalized/
│   └── corporate_actions/
│
├── core/
│   ├── state_machine/
│   ├── dividend_engine/
│   └── portfolio_controller/
│
├── replay/
│   ├── replay_runner.ts
│   ├── signal_bus.ts
│   └── event_clock.ts
│
├── metrics/
│   ├── performance_tracker.ts
│   └── cycle_analyzer.ts
│
├── config/
│   └── parameters.ts
│
└── index.ts
Semua deterministic. Tidak ada global mutable chaos.
🧠 DESIGN PRINCIPLE
Replay system harus:
Chronological strict
No lookahead
Single source of truth
Immutable daily state
🧱 1️⃣ DATA LAYER
/data/normalized/
Per ticker:
Json
Salin kode
{
  "date": "2025-03-17",
  "open": 950,
  "high": 980,
  "low": 930,
  "close": 960,
  "volume": 12000000,
  "free_float": 1000000000,
  "forward_yield": 0.09,
  "validation_status": "CONFIRMED",
  "rups_date": "2025-05-27",
  "ex_date": "2025-06-01"
}
Format harus final. Replay tidak boleh mengubah data.
🧱 2️⃣ EVENT CLOCK (Deterministic Time Driver)
File: /replay/event_clock.ts
Pseudo:
Ts
Salin kode
for (date of chronological_dates) {
    emit(DAY_START, date)
}
Tidak boleh lompat hari. Tidak boleh random.
🧱 3️⃣ STATE MACHINE MODULE
Folder: /core/state_machine/
Export function:
Ts
Salin kode
evaluateState(tickerState, dailyData) => State
Pure function. No side effect. No global mutation.
Input:
Historical buffer ≤ today
Current data
Output:
Single state enum
🧱 4️⃣ DIVIDEND ENGINE (Signal Mapper)
Folder: /core/dividend_engine/
Function:
Ts
Salin kode
mapStateToSignal(state) => Signal
Mapping final v2.2 logic.
No capital awareness. No ranking. No filtering ulang.
🧱 5️⃣ PORTFOLIO CONTROLLER
Folder: /core/portfolio_controller/
Function:
Ts
Salin kode
executeSignal(portfolioState, signalsToday) => updatedPortfolio
Urutan:
FULL_EXIT
PARTIAL_EXIT
ADD_LIMITED
ENTRY
Capital strictly % based. Cash buffer preserved.
🧱 6️⃣ REPLAY RUNNER
File: /replay/replay_runner.ts
Core loop:
Ts
Salin kode
for (date of timeline) {

    const dailySignals = []

    for (ticker of universe) {

        const state = evaluateState(history[ticker], todayData[ticker])
        const signal = mapStateToSignal(state)

        dailySignals.push({ ticker, signal })
    }

    portfolio = executeSignal(portfolio, dailySignals)

    performanceTracker.record(date, portfolio)
}
⚠ Important:
Universe static per run.
No dynamic add/remove mid-run.
No future data injection.
🧱 7️⃣ PERFORMANCE TRACKER
Folder: /metrics/
Track:
Ts
Salin kode
equityCurve[]
drawdown[]
tradeLog[]
cycleStats[]
CycleStats penting untuk engine ini:
EntryDate
ExitDate
EntryPrice
ExitPrice
CycleReturn
StatePath
Karena ini cycle engine.
🧱 8️⃣ CONFIG FILE
/config/parameters.ts
All thresholds centralized:
Ts
Salin kode
FLOAT_ROTATION_THRESHOLD = 0.25
COMPRESSION_MIN = 8
COMPRESSION_EARLY = 7
PRICE_DEVIATION_RANGE = 0.05
COOLDOWN_DAYS = 30
MAX_POSITIONS = 8
MAX_POSITION_SIZE = 0.10
No magic number in code.
🔒 DETERMINISM GUARANTEE
Replay dianggap deterministic jika:
Running 2x hasilnya identical
No random seed
No async race
No floating precision drift (round to fixed decimal)
🧨 TEST MODE (WAJIB)
Tambahkan:
Ts
Salin kode
assertNoFutureDataAccess()
assertSingleStatePerDay()
assertCapitalNeverNegative()
assertPositionNeverExceedsMax()
Jika salah satu fail → stop replay.
🎯 OUTPUT
Akhir run menghasilkan:
Equity curve
CAGR
Max DD
Avg cycle gain
Avg false base loss
Win rate
Time in market %
Itu cukup.
🔥 FINAL ARCHITECTURE FLOW
Text
Salin kode
DATA → EVENT CLOCK → STATE MACHINE v2.2
     → DIVIDEND ENGINE → PORTFOLIO CONTROLLER
     → PERFORMANCE TRACKER → METRICS
Tidak ada shortcut. Tidak ada hack.
