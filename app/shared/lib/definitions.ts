export enum EndPoints {
  //Справочники
  //-----------------------------------------------------------------------------------
  SecurityTypes = "https://iss.moex.com/iss/securitytypes.json", //типы ценных бумаг
  SecurityGroups = "https://iss.moex.com/iss/securitygroups.json", //группы ценных бумаг
  Engines = "https://iss.moex.com/iss/engines.json", //торговые системы
  //-----------------------------------------------------------------------------------

  // Разные запросы
  //-----------------------------------------------------------------------------------
  Securities = "https://iss.moex.com/iss/securities.json",
  StockMarkets = "https://iss.moex.com/iss/engines/stock/markets.json",

  // https://iss.moex.com/iss/engines/stock/markets/bonds.json securities.data - можно посмотреть расшифровку названий столбцов,
  Bonds = "https://iss.moex.com/iss/engines/stock/markets/bonds/securities.json", // облигации
  //по этому запросу в объекте есть не только поле securities но и другие marketdata, dataversion  и пр.
  BondNames = "https://iss.moex.com/iss/engines/stock/markets/bonds.json", //

  Indices = "https://iss.moex.com/iss/engines/stock/markets/index/boards/SNDX/securities.json", //индексы
  Futures = "https://iss.moex.com/iss/statistics/engines/futures/markets/forts/series.json",
}

export interface Response {
  [key: string]: {
    metadata: Array<Object>;
    columns: Array<string>;
    data: (number | string)[][];
  };
}

export interface BondFieldNamesForID {
  //name: string;
  shortTitle: string;
  Title: string;
}

export interface BondFieldTitles {
  [key: string]: BondFieldNamesForID;
}
