import { PAGE_SIZE, TABLE_COLUMNS } from "../lib/data";

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
      <table className="w-full text-sm text-left rtl:text-right bg-gray-500 dark:bg-gray-400 animate-pulse">
        <thead className="h-4 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {Array.from({ length: TABLE_COLUMNS }, (_, i) => (
              <TableHeadColumnSkeleton key={i} />
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {Array.from({ length: PAGE_SIZE }, (_, i) => (
            <TableRowsSkeleton key={i} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
export function TableHeadColumnSkeleton() {
  return (
    <th scope="col" className="px-6 py-3">
      <div className="flex items-center">
        <svg
          className="w-3 h-3 ms-1.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
        </svg>
        <span className="inline-block rounded bg-gray-500 dark:bg-gray-400 text-gray-500 dark:text-gray-400">
          Some span text
        </span>
      </div>
    </th>
  );
}
export function TableRowsSkeleton() {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 hover:bg-blue-100">
      {Array.from({ length: TABLE_COLUMNS }, (_, i) => (
        <TableRowSkeleton key={i} />
      ))}
    </tr>
  );
}
export function TableRowSkeleton() {
  return (
    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
      <div className="px-2 py-4">
        <span className="inline-block rounded bg-gray-900 text-gray-900 dark:bg-gray-200 dark:text-gray-200 animate-pulse">
          Some table row text
        </span>
      </div>
    </td>
  );
}
