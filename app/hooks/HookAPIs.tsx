import { useQuery } from "@tanstack/react-query";
import { useGlobalStore } from "@/store/common-state";
import { useEffect } from "react";
import {
  getCryptoInfo,
  getCryptoTicker,
  getListings,
} from "../services/crypto";
import { Ticker } from "@/interfaces/crypto";

export const useCryptoListings = (limit = 10) => {
  return useQuery({
    queryKey: ["listings", limit],
    queryFn: () => getListings(limit),
  });
};

export const useCryptoInfo = (ids?: number) => {
  return useQuery({
    queryKey: ["info", ids],
    queryFn: () => getCryptoInfo(ids || 0),
    enabled: !!ids,
  });
};

export const useCryptoTicker = () => {
  return useQuery<Ticker[]>({
    queryKey: ["tickers"],
    queryFn: () => getCryptoTicker(),
  });
};

export const useLoadingState = (
  queries: { isLoading: boolean; isFetching: boolean }[]
) => {
  if (!queries || queries.length === 0) return;
  const { setLoading } = useGlobalStore();

  useEffect(() => {
    const isAnyLoading = queries.some(
      (query) => query.isLoading || query.isFetching
    );
    setLoading(isAnyLoading);
  }, [
    ...queries.map((q) => q.isLoading),
    ...queries.map((q) => q.isFetching),
    setLoading,
  ]);
};
