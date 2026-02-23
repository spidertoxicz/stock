import { db } from "../config/db";
import { DataStore } from "./DataStore";

export class SQLiteDataStore implements DataStore {

  getDailyPrices(ticker: string, from: string, to: string) {
    return db.prepare(`
      SELECT * FROM daily_prices
      WHERE ticker = ?
      AND date BETWEEN ? AND ?
      ORDER BY date ASC
    `).all(ticker, from, to);
  }

  getCorporateEvents(ticker: string) {
    return db.prepare(`
      SELECT * FROM corporate_events_history
      WHERE ticker = ?
      ORDER BY announcement_date ASC
    `).all(ticker);
  }

  getQuarterlyReports(ticker: string) {
    return db.prepare(`
      SELECT * FROM quarterly_reports_history
      WHERE ticker = ?
      ORDER BY report_release_date ASC
    `).all(ticker);
  }

  getFreeFloat(ticker: string, date: string) {
    return db.prepare(`
      SELECT * FROM free_float_history
      WHERE ticker = ?
      AND effective_date <= ?
      ORDER BY effective_date DESC
      LIMIT 1
    `).get(ticker, date);
  }

  getSector(ticker: string, date: string) {
    const row = db.prepare(`
      SELECT sector FROM sector_history
      WHERE ticker = ?
      AND effective_date <= ?
      ORDER BY effective_date DESC
      LIMIT 1
    `).get(ticker, date);

    return row?.sector ?? null;
  }
}
