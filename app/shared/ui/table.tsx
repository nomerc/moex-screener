"use client";
import React, { useState } from "react";
import { BondFieldTitles, EndPoints } from "@/app/shared/lib/definitions";
import DetailsComponent from "@/app/bonds/ui/details";
import { useBonds, useBondNames, PAGE_SIZE } from "../lib/data";
import {
  convertToNamesObject,
  getShortTitles,
  selectElementsFromPositions,
  shrinkToPageSize,
  sortData,
} from "../lib/utils";

export default function TableComponent({
  currentPage,
}: {
  currentPage: number;
}) {
  const { bonds, bondsError, bondsLoading } = useBonds(EndPoints.Bonds);
  const { bondNames, bondNamesError, bondNamesLoading } = useBondNames(
    EndPoints.BondNames
  );

  const displayedIndices = [2, 13, 31];
  let totalPages = 0;
  let columns: string[] = [];
  let currentPageArray: (string | number)[][] = [];
  let rows: (string | number)[][] = [];
  let rootKey: string;
  let fieldNames: BondFieldTitles = {};

  if (!bondNamesLoading && !bondsLoading) {
    fieldNames = convertToNamesObject(
      bondNames[Object.keys(bondNames)[2]].data
    );
    rootKey = Object.keys(bonds)[0];
    totalPages = Math.floor(bonds[rootKey].data.length / PAGE_SIZE);
    columns = getShortTitles(
      bonds[rootKey].columns,
      fieldNames,
      displayedIndices
    );

    currentPageArray = shrinkToPageSize(
      bonds[rootKey].data,
      currentPage,
      PAGE_SIZE
    );

    rows = currentPageArray.map((el) =>
      selectElementsFromPositions(el, displayedIndices)
    );
  }

  const [isDetailsOpen, setDetailsOpen] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [sortAsc, setSortAsc] = useState<boolean>(true);

  if (!bondNamesLoading && !bondsLoading) {
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
          <table className="min-w-full table-auto bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                {columns.map((title, i) => (
                  <th
                    className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    key={i}
                    onClick={() => {
                      setSortAsc(!sortAsc);
                      sortData(
                        displayedIndices[i],
                        bonds[rootKey].data,
                        sortAsc
                      );

                      currentPageArray = shrinkToPageSize(
                        bonds[rootKey].data,
                        currentPage,
                        PAGE_SIZE
                      );
                      rows = currentPageArray.map((el) =>
                        selectElementsFromPositions(el, displayedIndices)
                      );
                    }}
                  >
                    {title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {rows.map((row, i) => (
                <tr
                  key={i}
                  className="hover:bg-blue-100"
                  onClick={() => {
                    setDetailsOpen(true);
                    setSelectedIndex(i);
                  }}
                >
                  {row.map((cell, j) => (
                    <td
                      className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 "
                      key={j}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <DetailsComponent
            isOpen={isDetailsOpen}
            detailsData={currentPageArray[selectedIndex]}
            fieldNames={fieldNames}
          />
        </div>
      </div>
    );
  } else {
    return <div> Loading...</div>;
  }
}
