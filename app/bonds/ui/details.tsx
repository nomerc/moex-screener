import React from "react";
import DetailsContentComponent from "./detailsContent";

export default function DetailsComponent({
  isOpen,
  detailsData,
  shortNames,
}: {
  isOpen: boolean;
  detailsData: (string | number)[];
  shortNames: string[];
}) {
  return (
    <div
      className="overflow-auto relative"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Sliding window */}
      <div
        className={`overflow-auto fixed top-0 -right-0 w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Window content*/}
        <DetailsContentComponent
          detailsData={detailsData}
          shortNames={shortNames}
        />
      </div>
    </div>
  );
}
