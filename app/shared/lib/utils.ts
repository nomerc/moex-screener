import { BondFieldNamesForID, BondFieldTitles } from "./definitions";

export const sortData = (
  i: number,
  arr: (string | number)[][],
  ascending: boolean
) => {
  //sorts array of arrays [ [],[],[] ] in ascending order according to i-element in each array
  arr.sort((a, b) => {
    if (a[i] < b[i]) {
      return ascending ? -1 : 1;
    }
    if (a[i] > b[i]) {
      return ascending ? 1 : -1;
    }
    return 0;
  });
};

export const convertToNamesObject = (
  fieldInfo: (string | number)[][]
): BondFieldTitles => {
  //takes an array of arrays [name, shortTitle, Title] and returns an object {name : {shortTitle : value, title : value} }
  const fieldNames: BondFieldTitles = {};
  for (let i = 0; i < fieldInfo.length; ++i) {
    const name = fieldInfo[i][1] as string;
    const names: BondFieldNamesForID = {
      shortTitle: fieldInfo[i][2] as string,
      Title: fieldInfo[i][3] as string,
    };
    fieldNames[name] = names;
  }
  return fieldNames;
};

export const shrinkToPageSize = (
  source: (string | number)[][],
  currentPage: number,
  pageSize: number
): (string | number)[][] => {
  // return part of source array that corresponds to current page and page size

  return source.filter(
    (_, i) => i >= (currentPage - 1) * pageSize && i < currentPage * pageSize
  );
};

export const getShortTitles = (
  source: string[],
  names: BondFieldTitles,
  indices: number[]
): string[] => {
  //takes array of field names, object that includes field names and short and full titles for them and returns short titles array
  //for field names with specified indices
  return source
    .filter((_, i) => indices.includes(i))
    .map((el) => names[el].shortTitle);
};

export const selectElementsFromPositions = <T>(
  array: T[],
  positions: number[]
): T[] => {
  // Create a new array by filtering the original array
  // The filter callback checks if the current index is included in the positions array
  return array?.filter((_, index) => positions.includes(index));
};

export const selectElementsByNames = <T>(
  array: T[][],
  names: string[]
): T[][] => {
  // Create a new array by filtering the original array
  // The filter callback checks if element name is included in names array
  return array?.filter(([name, index]) => names.includes(name as string));
};

// можно переделать и передавать только родительский узел и имена дочерних
export const createObjectFromArrays = (
  keys: string[],
  values?: any[]
): { [key: string]: string | number } => {
  return keys.reduce((obj, key, index) => {
    obj[key] = values?.[index];
    return obj;
  }, {} as { [key: string]: string | number });
};

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};

// const columns = data[rootKey].columns
//   .filter((_, i) => i == 2 || i == 13 || i == 31)
//   .map((el) => fieldNames[el].shortTitle);

// const currentPageArray = data[rootKey].data.filter(
//   (_, i) => i >= currentPage * pageSize && i < (currentPage + 1) * pageSize
// );

// def flatten(self, j:dict, blockname:str):
// """
// Собираю двумерный массив (словарь)
// :param j:
// :param blockname:
// :return:
// """
// return [{str.lower(k) : r[i] for i, k in enumerate(j[blockname]['columns'])} for r in j[blockname]['data']]

// def rows_to_dict(self, j:dict, blockname:str, field_key='name', field_value='value'):
// """
// Для преобразования запросов типа /securities/:secid.json (спецификация бумаги)
// в словарь значений
// :param j:
// :param blockname:
// :param field_key:
// :param field_value:
// :return:
// """
// return {str.lower(r[field_key]) : r[field_value] for r in self.flatten(j, blockname)}

// def get_bonds(self, page=1, limit=10):
// """
// Получаю облигации торгуемые на Мосбирже (stock_bonds)
// без данных по облигации, только исин, эмитент и т.п.
// :param page:
// :param limit:
// :return:
// """
// j = self.query("securities", group_by="group", group_by_filter="stock_bonds", limit=limit, start=(page-1)*limit)
// f = self.flatten(j, 'securities')
// return f
