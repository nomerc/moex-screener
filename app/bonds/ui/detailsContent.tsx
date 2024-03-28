import {
  BOND_INFO_NAMES,
  EXTRA_INDICES,
  HISTORY_INDICES,
  fetcher,
  useBonds,
  useBondsSecurities,
} from "@/app/shared/lib/data";
import { EndPoints, SecurityHistory } from "@/app/shared/lib/definitions";
import {
  getSecurityDetails,
  selectElementsByName,
} from "@/app/shared/lib/utils";
import Spinner from "@/app/shared/ui/spinner";
import React from "react";
import useSWR from "swr";

export default function DetailsContentComponent({
  detailsData,
}: {
  detailsData: (string | number)[];
}) {
  const { bondsSecurities } = useBondsSecurities(EndPoints.BondsSecurities);
  const { bonds } = useBonds(EndPoints.Bonds);

  const secKey: string = EndPoints.Security + detailsData?.[0];
  const histKey: string = EndPoints.SecurityHistory + detailsData?.[0];

  const {
    data: security,
    error: securityError,
    isLoading: securityLoading,
  } = useSWR(`${secKey}.json`, fetcher);
  if (securityError) throw new Error("Failed to load security information");

  const { data: cursor, error: cursorError } = useSWR(
    `${histKey}.json`,
    fetcher
  );
  if (cursorError) throw new Error("Failed to load cursor information");

  //getting last entry from trades history
  const { data: history, error: historyError } = useSWR<SecurityHistory>(
    () =>
      `${histKey}.json?START=${
        cursor["history.cursor"].data[0][1] - 1
      }&LIMIT=1`,
    fetcher
  );
  if (historyError) throw new Error("Failed to load history information");

  //creating first object using corresponding data for final security data object
  const detailsExtra = getSecurityDetails(
    bonds?.securities.data,
    bondsSecurities?.securities.columns,
    detailsData,
    EXTRA_INDICES
  );

  //creating second object using corresponding data for final security data object
  const detailsExtra_ = getSecurityDetails(
    bonds?.history.data,
    history?.history.columns,
    history?.history.data[0],
    HISTORY_INDICES
  );

  let securityData: (string | number)[][] = [];
  let details: { [key: string]: string | number } = {};

  //creating third object using corresponding data for final security data object
  if (!securityLoading) {
    securityData = selectElementsByName(
      security?.description.data,
      BOND_INFO_NAMES
    );
    securityData?.forEach((a) => {
      details[a[1]] = a[2];
    });
  }

  //merge our object into final one
  details = { ...details, ...detailsExtra, ...detailsExtra_ };

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

  return <Spinner />;
}
