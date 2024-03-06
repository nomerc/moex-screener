import { PAGE_SIZE } from "../shared/lib/data";
import { Response } from "../shared/lib/definitions";
import { EndPoints } from "../shared/lib/definitions";
import Pagination from "../shared/ui/pagination";
import TableComponent from "../shared/ui/table";

// SHORTNAME(2), SETTLEDATE(37), CURRENCYID(31), MATDATE(13), BUYBACKDATE(27)

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <main>
      <p className="text-sky-400"></p>
      <TableComponent currentPage={currentPage}></TableComponent>

      <div className="mt-5 flex w-full justify-center">
        {/* <Pagination totalPages={totalPages} /> */}
        <Pagination totalPages={100} />
      </div>
    </main>
  );
}
