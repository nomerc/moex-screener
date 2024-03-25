"use client";
import React, { Suspense } from "react";
import { BondFieldTitles, EndPoints } from "@/app/shared/lib/definitions";
import {
  useBonds,
  useBondNames,
  PAGE_SIZE,
  DISPLAYED_INDICES,
} from "../lib/data";
import { convertToNamesObject, getShortTitles } from "../lib/utils";

import TableComponent from "./table";
import Pagination from "./pagination";
import Loading from "./loading";
import Search from "./search";

export default function Container({
  currentPage,
  query,
}: {
  currentPage: number;
  query: string;
}) {
  const { bonds, bondsError, bondsLoading } = useBonds(EndPoints.Bonds);
  const { bondNames, bondNamesError, bondNamesLoading } = useBondNames(
    EndPoints.BondNames
  );

  //можно сделать таблицу с настраиваемыми колонками, позволить выбрать колонки из списка чек боксами
  //выделить в utils функции с рассчетами из container и table

  let totalPages = 0;
  let rootKey: string;
  let columns: string[] = [];
  let shortNames = [];
  let fieldNames: BondFieldTitles = {};
  let allFieldValues: (string | number)[][] = [];
  let filteredFieldValues: (string | number)[][] = [];

  if (bondsError) throw new Error("Failed to load bonds information");
  if (bondNamesError) throw new Error("Failed to load bond names information");

  if (!bondNamesLoading && !bondsLoading) {
    fieldNames = convertToNamesObject(
      bondNames[Object.keys(bondNames)[2]].data
    );

    rootKey = Object.keys(bonds)[0];
    allFieldValues = bonds[rootKey].data;
    filteredFieldValues = allFieldValues.filter((row) =>
      row.some(
        (el) =>
          typeof el === "string" &&
          el.toUpperCase().includes(query.toUpperCase())
      )
    );
    //exclude same values
    //выделить функцию в utils
    let filtered = new Set<number | string>();
    filteredFieldValues = filteredFieldValues.filter((row) => {
      if (!filtered.has(row[0])) {
        filtered.add(row[0]);
        return true;
      }
      return false;
    });

    columns = getShortTitles(
      bonds[rootKey].columns,
      fieldNames,
      DISPLAYED_INDICES
    );

    totalPages = Math.ceil(filteredFieldValues.length / PAGE_SIZE);

    shortNames = bonds[rootKey].columns.map(
      (el: any) => fieldNames[el].shortTitle
    );
  }

  if (!bondNamesLoading && !bondsLoading) {
    return (
      <main className="dark:bg-gray-900 h-full">
        <Search placeholder="Search bonds..." />;
        <p className="text-sky-400"></p>
        <TableComponent
          currentPage={currentPage}
          filteredFieldValues={filteredFieldValues}
          columns={columns}
          shortNames={shortNames}
        ></TableComponent>
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </main>
    );
  }
  return <Loading />;
}
