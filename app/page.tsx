import Link from "next/link";
import { fetchFromEndpoint } from "./shared/lib/data";
import { Response } from "./shared/lib/definitions";
import { EndPoints } from "./shared/lib/definitions";
import TableComponent from "./shared/ui/table";

export default async function Page() {
  // const data: Response = await fetchFromEndpoint(EndPoints.Bonds);
  // const rootKey = Object.keys(data)[0];
  // const columns = data[rootKey].columns;
  // const rows = data[rootKey].data;
  // const convertedRes = ConvertData(data);

  return <Link href="/bonds">BONDS</Link>;
}
