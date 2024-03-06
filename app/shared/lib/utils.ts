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
    (_, i) => i >= currentPage * pageSize && i < (currentPage + 1) * pageSize
  );
};

export const getShortTitles = (
  source: string[],
  names: BondFieldTitles,
  indices: number[]
): string[] => {
  //takes array of field names, object that includes field names and short and full titles for them and return short titles array
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
  return array.filter((_, index) => positions.includes(index));
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

// const createObjectFromArrays = (
//   keys: string[],
//   values: any[]
// ): { [key: string]: any } => {
//   return keys.reduce((obj, key, index) => {
//     obj[key] = values[index];
//     return obj;
//   }, {} as { [key: string]: any });
// };

// export default function ConvertData(data: Response) {
//   //convert data from object  "metadata": {"key1": {"type": "sometype"},{"key2": {"type": "sometype"},..}"
//   //and  array "data": [ [v1, "v2", ..], ..]
//   // into array of objects result : [{"key1" : v1}, {"key2" : v2}..]

//   const key = Object.keys(data)[0];
//   const entriesNumber = data[key].data.length;
//   const fieldNames = Object.keys(data[key].metadata);
//   const result: Object[] = [];

//   for (let i = 0; i < entriesNumber; i++) {
//     result.push(createObjectFromArrays(fieldNames, data[key].data[i]));
//   }

//   return result;
// }

// const fieldNames: BondFieldTitles = {};
// for (let i = 0; i < fieldInfo.length; ++i) {
//   const name = fieldInfo[i][1] as string;
//   const names: BondFieldNamesForID = {
//     shortTitle: fieldInfo[i][2] as string,
//     Title: fieldInfo[i][3] as string,
//   };
//   fieldNames[name] = names;
// }

// let fieldNames: string[] = [];

// for (let i = 0; i < fieldInfo.length; ++i) {
//   const index = fieldInfo[i][0] as number;
//   fieldNames[
//     index
//   ] = `${fieldInfo[i][1]}, ${fieldInfo[i][2]}, ${fieldInfo[i][3]}`;
// }
