import useSWR from "swr";
import { EndPoints } from "./definitions";
import useSWRImmutable from "swr/immutable";

export const PAGE_SIZE = 7;
export const DISPLAYED_INDICES = [0, 2, 13, 25]; //Array.from(Array(32).keys());
export const BOND_INFO_INDICES = [
  0, 1, 2, 5, 6, 7, 10, 13, 14, 15, 16, 17, 18, 19, 24,
];
export const BOND_INFO_NAMES = [
  "SECID",
  "NAME",
  "SHORTNAME",
  "REGNUMBER",
  "ISIN",
  "ISSUEDATE",
  "MATDATE",
  "BUYBACKDATE",
  "EARLYREPAYMENT",
  "INITIALFACEVALUE",
  "FACEUNIT",
  "STARTDATEMOEX",
  "EARLYPAYMENT",
  "LISTLEVEL",
  "ISSUESIZE",
  "FACEVALUE",
  "ISQUALIFIEDINVESTORS",
  "COUPONFREQUENCY",
  "COUPONDATE",
  "TYPENAME",
];
export const EXTRA_INDICES = [7, 12];

export async function fetcher(endpoint: string) {
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
}
export function useBonds(id: string) {
  const { data, error, isLoading } = useSWR(
    `/api/user/${id}`,
    () => fetcher(EndPoints.Bonds),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      revalidateOnMount: true,
      // refreshInterval: 1000 * 60 * 60,
    }
  );

  return {
    bonds: data,
    bondsLoading: isLoading,
    bondsError: error,
  };
}
export function useBondNames(id: string) {
  const { data, error, isLoading } = useSWR(
    `/api/user/${id}`,
    () => fetcher(EndPoints.BondNames),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      revalidateOnMount: true,
    }
  );

  return {
    bondNames: data,
    bondNamesLoading: isLoading,
    bondNamesError: error,
  };
}
export async function fetchFromEndpoint(endpoint: string) {
  const res = await fetch(endpoint, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

// export function useSecurity(id: string, secid: string) {
//   const { data, error, isLoading } = useSWRImmutable<Security>(
//     `/api/user/${id}${secid}`,
//     () => fetcher(EndPoints.Security + secid + "/.json")
//   );

//   return {
//     security: data,
//     securityLoading: isLoading,
//     securityError: error,
//   };
// }
// export function useSecurityHistory(id: string, secid: string) {
//   const { data, error, isLoading } = useSWR(
//     `/api/user/${id}`,
//     () => fetcher(EndPoints.SecurityHistory + secid + ".json"),
//     {
//       revalidateIfStale: false,
//       revalidateOnFocus: false,
//       revalidateOnReconnect: true,
//       revalidateOnMount: true,
//     }
//   );

//   return {
//     securityHistory: data,
//     securityHistoryLoading: isLoading,
//     securityHistoryError: error,
//   };
// }
// export function useSecurityHistoryFromIndex(
//   id: string,
//   secid: string,
//   index: number
// ) {
//   const { data, error, isLoading } = useSWR(
//     `/api/user/${id}${index}`,
//     () => fetcher(`${EndPoints.SecurityHistory}${secid}.json?START=${index}`),
//     {
//       revalidateIfStale: false,
//       revalidateOnFocus: false,
//       revalidateOnReconnect: true,
//       revalidateOnMount: true,
//     }
//   );

//   console.log(`${EndPoints.SecurityHistory}${secid}.json?START=${index}`);

//   return {
//     sHFI: data,
//     sHFILoading: isLoading,
//     sHFIError: error,
//   };
// }
