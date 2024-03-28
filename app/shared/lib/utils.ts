import { DISPLAYED_INDICES, PAGE_SIZE } from "./data";
import {
  BondFieldNamesForID,
  BondFieldTitles,
  BondsSecurities,
} from "./definitions";

export const getSecurityDetails = (
  fieldInfo?: (string | number)[][],
  namesSrc?: BondsSecurities[],
  dataSrc?: (string | number)[],
  positions: number[] = []
): { [key: string]: string | number } => {
  //creates an object with of a form {short title : value} from desired positions of data entry
  const fieldNames = convertToNamesObject(fieldInfo);
  const shortNames: string[] | undefined = namesSrc?.map(
    (el: any) => fieldNames[el.toUpperCase()].shortTitle
  );

  return createObjectFromArrays(
    selectElementsFromPositions(positions, shortNames),
    selectElementsFromPositions(positions, dataSrc)
  );
};

export const getShortTitles = (
  names: BondFieldTitles,
  indices: number[],
  source?: string[]
): string[] => {
  //takes array of field names, object that includes field names and short and full titles for them and returns short titles array
  //for field names with specified indices
  if (source)
    return source
      .filter((_, i) => indices.includes(i))
      .map((el) => names[el].shortTitle);
  return [];
};

export const selectElementsFromPositions = <T>(
  positions: number[],
  source?: T[]
): T[] => {
  // Create a new array by filtering the original array
  // The filter callback checks if the current index is included in the positions array
  if (source) return source?.filter((_, index) => positions.includes(index));
  return [];
};

export const selectElementsByName = <T>(
  array: T[][],
  names: string[]
): T[][] => {
  // Create a new array by filtering the original array
  // The filter callback checks if element name is included in names array
  return array?.filter(([name]) => names.includes(name as string));
};

export const createObjectFromArrays = (
  keys?: string[],
  values?: any[]
): { [key: string]: string | number } => {
  if (keys)
    return keys.reduce((obj, key, index) => {
      obj[key] = values?.[index];
      return obj;
    }, {} as { [key: string]: string | number });
  return {};
};

export const convertToNamesObject = (
  fieldInfo?: (string | number)[][]
): BondFieldTitles => {
  //takes an array of arrays [name, shortTitle, Title] and returns an object {name : {shortTitle : value, title : value} }
  const fieldNames: BondFieldTitles = {};

  if (fieldInfo) {
    for (let i = 0; i < fieldInfo.length; ++i) {
      const name = fieldInfo[i][1] as string;
      const names: BondFieldNamesForID = {
        shortTitle: fieldInfo[i][2] as string,
        Title: fieldInfo[i][3] as string,
      };
      fieldNames[name] = names;
    }
    return fieldNames;
  }

  return fieldNames;
};

export const shrinkSortedToPageSize = (
  source: (string | number)[][],
  currentPage: number,
  sortAsc: boolean,
  sortIndex?: number
): (string | number)[][] => {
  // return  part of source array that corresponds to current page, page size and sort order
  sortData(DISPLAYED_INDICES[sortIndex || 0], source, sortAsc);
  return shrinkToPageSize(source, currentPage, PAGE_SIZE);
};

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

export const getUniqueFilteredValues = (
  query: string,
  source?: (string | number)[][]
): (string | number)[][] => {
  //Filters source array according to query and returns only unique values
  if (source) {
    let filtered = new Set<number | string>();

    return source
      .filter((row) =>
        row.some(
          (el) =>
            typeof el === "string" &&
            el.toUpperCase().includes(query.toUpperCase())
        )
      )
      .filter((row) => {
        if (!filtered.has(row[0])) {
          filtered.add(row[0]);
          return true;
        }
        return false;
      });
  }
  return [];
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
