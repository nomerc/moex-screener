export enum EndPoints {
  //Справочники

  //-----------------------------------------------------------------------------------
  //типы ценных бумаг
  SecurityTypes = "https://iss.moex.com/iss/securitytypes.json",
  //группы ценных бумаг
  SecurityGroups = "https://iss.moex.com/iss/securitygroups.json",
  //торговые системы
  Engines = "https://iss.moex.com/iss/engines.json",
  //-----------------------------------------------------------------------------------
  //Облигации
  // список облигаций
  BondsSecurities = "https://iss.moex.com/iss/engines/stock/markets/bonds/securities.json",
  // список имен полей облигации
  Bonds = "https://iss.moex.com/iss/engines/stock/markets/bonds.json",
  //Ценная бумага (при формировании запроса необходимо добавить (secid/.json)
  Security = "https://iss.moex.com/iss/securities/", //
  //история торгов цб (при формировании запроса необходимо добавить (secid/.json) 3 - итоговая сессия торгов
  SecurityHistory = "https://iss.moex.com/iss/history/engines/stock/markets/bonds/sessions/3/securities/",
  //-----------------------------------------------------------------------------------
  // Разные запросы
  //-----------------------------------------------------------------------------------
  Securities = "https://iss.moex.com/iss/securities.json",
  StockMarkets = "https://iss.moex.com/iss/engines/stock/markets.json",
  Indices = "https://iss.moex.com/iss/engines/stock/markets/index/boards/SNDX/securities.json",
  Futures = "https://iss.moex.com/iss/statistics/engines/futures/markets/forts/series.json",
  //-----------------------------------------------------------------------------------
}
export interface BondFieldNamesForID {
  shortTitle: string;
  Title: string;
}

export interface BondFieldTitles {
  [key: string]: BondFieldNamesForID;
}

export interface Bonds {
  boards: Block;
  boardgroups: Block;
  securities: Block;
  marketdata: Block;
  trades: Block;
  orderbook: Block;
  history: Block;
  trades_hist: Block;
  marketdata_yields: Block;
  history_yields: Block;
  secstats: Block;
}

export interface BondsSecurities {
  securities: Block;
  marketdata: Block;
  dataversion: Block;
  marketdata_yields: Block;
}

export interface SecurityHistory {
  history: Block;
  "history.cursor": Block;
}

export interface Block {
  metadata: {};
  columns: [];
  data: (string | number)[][];
}
