import useSWR from "swr";
import { Bonds, BondsSecurities, EndPoints } from "./definitions";
import useSWRImmutable from "swr/immutable";

export const PAGE_SIZE = 7;
export const TABLE_COLUMNS = 4;
export const DISPLAYED_INDICES = [0, 2, 13, 25];
export const BOND_INFO_INDICES = [
  0, 1, 2, 5, 6, 7, 10, 13, 14, 15, 16, 17, 18, 19, 24,
];
export const HISTORY_INDICES = [4, 6, 7, 12, 14, 36];
export const EXTRA_INDICES = [7, 12];

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

export async function fetcher(endpoint: string) {
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
}

export function useBondsSecurities(id: string) {
  const { data, error, isLoading } = useSWR<BondsSecurities>(
    `/api/user/${id}`,
    () => fetcher(EndPoints.BondsSecurities),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      revalidateOnMount: true,
      // refreshInterval: 1000 * 60 * 60,
    }
  );

  return {
    bondsSecurities: data,
    bondsSecuritiesLoading: isLoading,
    bondsSecuritiesError: error,
  };
}

export function useBonds(id: string) {
  const { data, error, isLoading } = useSWRImmutable<Bonds>(
    `/api/user/${id}`,
    () => fetcher(EndPoints.Bonds)
  );

  return {
    bonds: data,
    bondsLoading: isLoading,
    bondsError: error,
  };
}
