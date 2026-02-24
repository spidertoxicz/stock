Definisikan data schema dulu.
Karena tanpa schema yang ketat:
State machine bisa salah input
Replay bisa pakai field salah
Future leakage bisa tidak sengaja terjadi
Float & compression bisa beda definisi antar module
Kita kunci kontrak data dulu.
🧱 STEP 1 — CORE ENUM DEFINITIONS
File: core/types/enums.ts
Ts
Salin kode
export enum State {
  INACTIVE = "INACTIVE",
  PRE_ACCUMULATION = "PRE_ACCUMULATION",
  ACCUMULATION_WINDOW = "ACCUMULATION_WINDOW",
  IGNITION = "IGNITION",
  MOMENTUM_EXPANSION = "MOMENTUM_EXPANSION",
  DISTRIBUTION_RISK = "DISTRIBUTION_RISK",
  TERMINAL = "TERMINAL",
  POST_EVENT = "POST_EVENT"
}

export enum Signal {
  ENTRY = "ENTRY",
  ADD_LIMITED = "ADD_LIMITED",
  HOLD = "HOLD",
  PARTIAL_EXIT = "PARTIAL_EXIT",
  FULL_EXIT = "FULL_EXIT",
  NO_ACTION = "NO_ACTION"
}
Tidak boleh ada enum tambahan.
🧱 STEP 2 — DAILY MARKET DATA SCHEMA
File: core/types/market.ts
Ts
Salin kode
export interface DailyBar {
  date: string; // YYYY-MM-DD
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  freeFloatShares: number;

  forwardYield: number; // decimal (0.09 = 9%)
  validationStatus: "CONFIRMED" | "REVOKED" | "PENDING";

  rupsDate?: string;
  exDate?: string;
}
⚠ Semua angka wajib numeric. ⚠ Tidak boleh nullable kecuali tanggal event.
🧱 STEP 3 — DERIVED STRUCTURE METRICS
State machine tidak boleh hitung sembarangan di luar kontrak.
File: core/types/derived.ts
Ts
Salin kode
export interface DerivedMetrics {
  floatRotation30: number;
  floatRotation60: number;
  rotationVelocity5D: number;

  priceDeviation: number;
  rangeCompression: number;

  avgVolume20D: number;

  falseBreakdownRecovery: boolean;
}
Semua dihitung hanya dari historical ≤ hari ini.
🧱 STEP 4 — TICKER STATE SNAPSHOT
File: core/types/state.ts
Ts
Salin kode
import { State } from "./enums";

export interface TickerStateSnapshot {
  ticker: string;
  date: string;
  state: State;
  derived: DerivedMetrics;
}
State machine harus return object ini. Bukan hanya string.
🧱 STEP 5 — SIGNAL PAYLOAD
File: core/types/signal.ts
Ts
Salin kode
import { Signal } from "./enums";

export interface SignalPayload {
  ticker: string;
  date: string;
  signal: Signal;
}
Dividend engine hanya boleh output ini.
Tidak boleh bawa float. Tidak boleh bawa yield. Tidak boleh bawa state.
🧱 STEP 6 — PORTFOLIO STATE
File: core/types/portfolio.ts
Ts
Salin kode
export interface Position {
  ticker: string;
  entryDate: string;
  entryPrice: number;
  sizePercent: number; // 0.05 = 5%
}

export interface PortfolioState {
  totalCapital: number;
  cashPercent: number;
  positions: Position[];
  cooldown: Record<string, string>; // ticker -> cooldown_end_date
}
Portfolio tidak tahu float. Tidak tahu state. Tidak tahu yield.
Hanya tahu: Signal + posisi.
🧱 STEP 7 — PERFORMANCE RECORD
File: metrics/types.ts
Ts
Salin kode
export interface EquityPoint {
  date: string;
  equity: number;
}

export interface TradeLog {
  ticker: string;
  entryDate: string;
  exitDate: string;
  entryPrice: number;
  exitPrice: number;
  returnPercent: number;
}
🔒 SEKARANG KITA SUDAH PUNYA:
✔ Enum terkunci
✔ Data schema jelas
✔ Derived metrics terpisah
✔ State snapshot immutable
✔ Signal contract bersih
✔ Portfolio isolated
✔ Metrics terstruktur
Sekarang tidak ada ambiguity.
Replay runner nanti hanya menghubungkan schema ini. Tidak bisa lompat layer lagi.
