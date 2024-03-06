import useSWR from "swr";
import { EndPoints } from "./definitions";

export const PAGE_SIZE = 12;

async function fetcher(endpoint: string) {
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
    }
  );

  return {
    bondNames: data,
    bondNamesLoading: isLoading,
    bondNamesError: error,
  };
}

// export async function fetchBonds() {
//   const res = await fetch(EndPoints.Bonds, { cache: "no-store" });

//   if (!res.ok) {
//     throw new Error("Failed to fetch data");
//   }
//   return res.json();
// }

// export async function fetchBondInformation() {
//   const res = await fetch(
//     "https://iss.moex.com/iss/engines/stock/markets/bonds.json"
//   );

//   if (!res.ok) {
//     throw new Error("Failed to fetch bond information");
//   }
//   return res.json();
// }

export async function fetchFromEndpoint(endpoint: string) {
  const res = await fetch(endpoint, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
