import { BondFieldTitles } from "@/app/shared/lib/definitions";
import React from "react";

// в таблицу выводятся только SHORTNAME(2), SETTLEDATE(37), CURRENCYID(31), MATDATE(13), BUYBACKDATE(27)

export default function DetailsComponent({
  isOpen,
  detailsData,
  fieldNames,
}: {
  isOpen: boolean;
  detailsData: (string | number)[];
  fieldNames: BondFieldTitles;
}) {
  return (
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      {/* Sliding window */}
      <div
        className={`fixed top-0 -right-10 w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Window content goes here */}
        <div className="p-4">
          <h2 className="text-lg font-semibold">Sliding Window</h2>
          <p>This is the content of the sliding window.</p>
          <p>
            {detailsData[2] + " "} {detailsData[13] + " "} {detailsData[27]}
          </p>
        </div>
      </div>
    </div>
  );
}
