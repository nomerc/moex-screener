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

  //-----------------------------------------------------------------------------------
  // https://iss.moex.com/iss/engines/stock/markets/bonds.json содержит разделы
  //{boards, boardgroups, securities, marketdata, trades, orderbook, history, trades_hist, marketdata_yields, history_yields,secstats}
  //раздел data каждого из них содержит расшифровку названий столбцов,
  //а добавив к предыдущему пути название разделов (securities,trades(только эти)) в  одноименном подразделе разделе data находятся
  //соответствующие данные.
  //https://iss.moex.com/iss/engines/stock/markets/bonds/securities.json .securities.data
  //https://iss.moex.com/iss/engines/stock/markets/bonds/trades.json .trades.data

  // список облигации
  Bonds = "https://iss.moex.com/iss/engines/stock/markets/bonds/securities.json",
  // список имен полей облигации
  BondNames = "https://iss.moex.com/iss/engines/stock/markets/bonds.json",
  //Ценная бумага (при формировании запроса необходимо добавить (secid/.json)
  Security = "https://iss.moex.com/iss/securities/", //
  //история торгов цб (при формировании запроса необходимо добавить (secid/.json) 3 - итоговая сессия торгов
  SecurityHistory = "https://iss.moex.com/iss/history/engines/stock/markets/bonds/sessions/3/securities/",
  //-----------------------------------------------------------------------------------

  // Разные запросы
  //-----------------------------------------------------------------------------------
  Securities = "https://iss.moex.com/iss/securities.json",
  StockMarkets = "https://iss.moex.com/iss/engines/stock/markets.json",

  Indices = "https://iss.moex.com/iss/engines/stock/markets/index/boards/SNDX/securities.json", //индексы
  Futures = "https://iss.moex.com/iss/statistics/engines/futures/markets/forts/series.json",
  //-----------------------------------------------------------------------------------
}

export interface Response {
  [key: string]: {
    metadata: Array<Object>;
    columns: Array<string>;
    data: (number | string)[][];
  };
}

export interface BondFieldNamesForID {
  shortTitle: string;
  Title: string;
}

export interface BondFieldTitles {
  [key: string]: BondFieldNamesForID;
}

// export interface Security {
//   description: Block;
//   boards: Block;
// }

export interface SecurityHistory {
  history: Block;
  "history.cursor": Block;
}

export interface Block {
  metadata: {};
  columns: [];
  data: (string | number)[][];
}
