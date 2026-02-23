export interface DataStore {
  getDailyPrices(ticker: string, from: string, to: string): any[];
  getCorporateEvents(ticker: string): any[];
  getQuarterlyReports(ticker: string): any[];
  getFreeFloat(ticker: string, date: string): any | null;
  getSector(ticker: string, date: string): string | null;
}
