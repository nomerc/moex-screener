"use client";
import React, { useState } from "react";
import DetailsComponent from "@/app/bonds/ui/details";
import { DISPLAYED_INDICES, useBonds, useBondsSecurities } from "../lib/data";
import {
  convertToNamesObject,
  getShortTitles,
  selectElementsFromPositions,
  shrinkSortedToPageSize,
} from "../lib/utils";
import { BondFieldTitles, EndPoints } from "../lib/definitions";

export default function TableComponent({
  currentPage,
  filteredFieldValues,
}: {
  currentPage: number;
  filteredFieldValues: (string | number)[][];
}) {
  const { bondsSecurities } = useBondsSecurities(EndPoints.BondsSecurities);
  const { bonds } = useBonds(EndPoints.Bonds);

  const [isDetailsOpen, setDetailsOpen] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [sortIndex, setSortIndex] = useState<number>();
  const [sortAsc, setSortAsc] = useState<boolean>(true);

  const fieldNames: BondFieldTitles = convertToNamesObject(
    bonds?.securities.data
  );

  const columns: string[] = getShortTitles(
    fieldNames,
    DISPLAYED_INDICES,
    bondsSecurities?.securities.columns
  );

  let currentPageArray = shrinkSortedToPageSize(
    filteredFieldValues,
    currentPage,
    sortAsc,
    sortIndex
  );

  if (currentPageArray.length > 0)
    return (
      <div>
        <div className="overflow-x-auto">
          <div
            className={`fixed top-0 right-0 bottom-0 left-0 bg-gray-500/75 ${
              isDetailsOpen ? "visible" : "hidden"
            }`}
            onClick={() => {
              setDetailsOpen(!isDetailsOpen);
            }}
          ></div>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                {columns.map((title, i) => (
                  <th scope="col" className="px-6 py-3 h-3 w-1/4" key={i}>
                    <div className="flex items-center">
                      <a
                        href="#"
                        onClick={() => {
                          setSortAsc(!sortAsc);
                          setSortIndex(i);
                          currentPageArray = shrinkSortedToPageSize(
                            filteredFieldValues,
                            currentPage,
                            sortAsc,
                            sortIndex
                          );
                        }}
                      >
                        <svg
                          className="w-3 h-3 ms-1.5"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                        </svg>
                      </a>
                      {title}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentPageArray
                .map((el) => selectElementsFromPositions(DISPLAYED_INDICES, el)) //select specified data fields from entries
                .map((row, i) => (
                  <tr
                    key={i}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 hover:bg-blue-100"
                    onClick={() => {
                      setDetailsOpen(true);
                      setSelectedIndex(i);
                    }}
                  >
                    {row.map((cell, j) => (
                      <td
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white "
                        key={j}
                      >
                        <div className="px-2 py-4">{cell}</div>
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
          <DetailsComponent
            isOpen={isDetailsOpen}
            detailsData={currentPageArray[selectedIndex]}
          />
        </div>
      </div>
    );
  return (
    <div className="mt-5 flex w-full justify-center">
      <p className="text-gray-500 dark:text-gray-400"> No matches found</p>
    </div>
  );
}
