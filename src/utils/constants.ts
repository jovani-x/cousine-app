import { OptionalQueryObserverOptions } from "../types/recipe";

const AppName = "Cousine App";

type QueryData<T> = T;

const createQueryOpts = <T>(): OptionalQueryObserverOptions<QueryData<T>> => ({
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  refetchInterval: false as const,
  gcTime: 1000 * 60 * 60 * 24 * 30, // 30 days
  staleTime: 1000 * 60 * 60 * 24 * 30,
  retry: 1,
});

export { AppName, createQueryOpts };
