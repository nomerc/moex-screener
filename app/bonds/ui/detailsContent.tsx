import { BOND_INFO_NAMES, EXTRA_INDICES, fetcher } from "@/app/shared/lib/data";
import { EndPoints, SecurityHistory } from "@/app/shared/lib/definitions";
import {
  createObjectFromArrays,
  selectElementsByNames,
  selectElementsFromPositions,
} from "@/app/shared/lib/utils";
import Loading from "@/app/shared/ui/loading";
import Spinner from "@/app/shared/ui/spinner";
import React from "react";
import useSWR from "swr";

export default function DetailsContentComponent({
  detailsData,
  shortNames,
}: {
  detailsData: (string | number)[];
  shortNames: string[];
}) {
  let details: { [key: string]: string | number } = {};
  const detailsExtra = createObjectFromArrays(
    selectElementsFromPositions(shortNames, EXTRA_INDICES),
    selectElementsFromPositions(detailsData, EXTRA_INDICES)
  );

  const secKey: string = EndPoints.Security + detailsData?.[0];
  const histKey: string = EndPoints.SecurityHistory + detailsData?.[0];
  const {
    data: security,
    error: securityError,
    isLoading: securityLoading,
  } = useSWR(`${secKey}.json`, fetcher);

  const { data: cursor, error: cursorError } = useSWR(
    `${histKey}.json`,
    fetcher
  );

  const { data: history, error: historyError } = useSWR<SecurityHistory>(
    () =>
      `${histKey}.json?START=${
        cursor["history.cursor"].data[0][1] - 1
      }&LIMIT=1`,
    fetcher
  );

  let securityData: (string | number)[][] = [];

  // if (securityError) throw new Error("Failed to load security information");
  // if (cursorError) throw new Error("Failed to load cursor information");
  //TODO add notification security not found with search interface instead of current
  // if (historyError) throw new Error("Failed to load history information");

  if (!securityLoading) {
    securityData = selectElementsByNames(
      security?.description.data,
      BOND_INFO_NAMES
    );
    securityData?.forEach((a) => {
      details[a[1]] = a[2];
    });
  }

  if (history) {
    const securityHistory = history.history.data;

    const a = securityHistory[securityHistory.length - 1];
    details["Количество сделок"] = a[4];
    details["Минимальная цена % от номинала"] = a[6];
    details["Максимальная цена % от номинала"] = a[7];
    details["Доходность на момент закрытия"] = a[12];
    details["Объем торгов"] = a[14];
    details["Дата выкупа"] = a[28];
    details["Валюта номинала"] = a[36];
  }

  details = { ...details, ...detailsExtra };

  if (!securityLoading && history) {
    return (
      <div className="p-4 dark:bg-gray-900">
        <h2 className="text-lg font-semibold text-gray-500 dark:text-gray-400">
          Bond Details
        </h2>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3" key={0}>
                {"Name"}
              </th>
              <th scope="col" className="px-6 py-3" key={1}>
                {"Value"}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Object.values(details)?.map((item, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 hover:bg-blue-100"
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white ">
                  <div className="px-6 py-4 text-wrap">
                    {Object.keys(details)[index]}
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <div className="px-6 py-4 text-wrap text-wrap">{item}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // return <Loading />;
  return (
    // <div className="fixed top-0 right-0 bottom-0 left-0 bg-gray-700/75">
    <Spinner />
    // </div>
  );
}
