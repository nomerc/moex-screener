// Loading animation

import { PAGE_SIZE } from "../lib/data";

// const shimmer =
//   "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export function TableRowSkeleton() {
  return (
    <tr>
      {/* Some text */}
      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 ">
        <div className="h-6 w-24 rounded bg-gray-100 animate-pulse"></div>
      </td>
      {/* Some text */}
      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 ">
        <div className="h-6 w-24 rounded bg-gray-100 animate-pulse"></div>
      </td>
      {/* Some text */}
      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 ">
        <div className="h-6 w-32 rounded bg-gray-100 animate-pulse"></div>
      </td>
      {/* Some text */}
      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 ">
        <div className="h-6 w-32 rounded bg-gray-100 animate-pulse"></div>
      </td>
    </tr>
  );
}

export function BondsMobileSkeleton() {
  return (
    <div className="mb-2 w-full rounded-md bg-white p-4">
      <div className="flex items-center justify-between border-b border-gray-100 pb-8">
        <div className="flex items-center">
          <div className="mr-2 h-8 w-8 rounded-full bg-gray-100"></div>
          <div className="h-6 w-16 rounded bg-gray-100"></div>
        </div>
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </div>
      <div className="flex w-full items-center justify-between pt-4">
        <div>
          <div className="h-6 w-16 rounded bg-gray-100"></div>
          <div className="mt-2 h-6 w-24 rounded bg-gray-100"></div>
        </div>
        <div className="flex justify-end gap-2">
          <div className="h-10 w-10 rounded bg-gray-100"></div>
          <div className="h-10 w-10 rounded bg-gray-100"></div>
        </div>
      </div>
    </div>
  );
}

export function BondsTableSkeleton() {
  return (
    <div className="overflow-x-auto">
      <div className="md:hidden">
        <BondsMobileSkeleton />
        <BondsMobileSkeleton />
        <BondsMobileSkeleton />
        <BondsMobileSkeleton />
      </div>
      <table className="min-w-full table-auto bg-white shadow-md rounded-lg overflow-hidden animate-pulse">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ">
              <div className="h-6 w-24 rounded bg-gray-100"></div>
              {/* Some text */}
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="h-6 w-24 rounded bg-gray-100"></div>
              {/* Some text */}
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="h-6 w-32 rounded bg-gray-100"></div>
              {/* Some text */}
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="h-6 w-32 rounded bg-gray-100"></div>
              {/* Some text */}
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {Array.from({ length: PAGE_SIZE }, (_, i) => (
            <TableRowSkeleton key={i} />
          ))}
        </tbody>
      </table>
    </div>

    // button-like spinner
    //   <div className="relative rounded-xl overflow-auto p-8">
    //   <div className="flex items-center justify-center">
    //     <div className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-150 cursor-not-allowed">
    //       <svg
    //         className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
    //         xmlns="http://www.w3.org/2000/svg"
    //         fill="none"
    //         viewBox="0 0 24 24"
    //       >
    //         <circle
    //           className="opacity-25"
    //           cx="12"
    //           cy="12"
    //           r="10"
    //           stroke="currentColor"
    //           stroke-width="4"
    //         ></circle>
    //         <path
    //           className="opacity-75"
    //           fill="currentColor"
    //           d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    //         ></path>
    //       </svg>
    //       Processing...
    //     </div>
    //   </div>
    // </div>
  );
}
