"use client";
import { EndPoints } from "@/app/shared/lib/definitions";
import { useBonds, PAGE_SIZE, useBondsSecurities } from "../lib/data";
import { getUniqueFilteredValues } from "../lib/utils";

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
  const { bondsSecurities, bondsSecuritiesError, bondsSecuritiesLoading } =
    useBondsSecurities(EndPoints.BondsSecurities);
  const { bonds, bondsError, bondsLoading } = useBonds(EndPoints.Bonds);

  if (bondsError) throw new Error("Failed to load bond names information");
  if (bondsSecuritiesError) throw new Error("Failed to load bonds information");

  let totalPages = 0;
  let filteredFieldValues: (string | number)[][] = [];

  if (!bondsSecuritiesLoading && !bondsLoading) {
    filteredFieldValues = getUniqueFilteredValues(
      query,
      bondsSecurities?.securities.data
    );

    filteredFieldValues
      ? (totalPages = Math.ceil(filteredFieldValues.length / PAGE_SIZE))
      : (totalPages = 0);
  }

  if (!bondsSecuritiesLoading && !bondsLoading) {
    return (
      <main className="dark:bg-gray-900 h-full">
        <Search placeholder="Search bonds..." />;
        <p className="text-sky-400"></p>
        <TableComponent
          currentPage={currentPage}
          filteredFieldValues={filteredFieldValues}
        ></TableComponent>
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </main>
    );
  }
  return (
    <main className="dark:bg-gray-900 h-full">
      <Search placeholder="Search bonds..." />;<p className="text-sky-400"></p>
      <Loading />
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={10} />
      </div>
    </main>
  );
}
