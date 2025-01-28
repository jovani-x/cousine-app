import { OptionalQueryObserverOptions } from "../types/recipe";

const AppName = "Cuisine App";

type QueryData<T> = T;

const cacheTime = 1000 * 60 * 60 * 1; // 1 hour

const createQueryOpts = <T>(): OptionalQueryObserverOptions<QueryData<T>> => ({
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  refetchInterval: false as const,
  gcTime: cacheTime,
  staleTime: cacheTime,
  retry: 1,
});

export { AppName, cacheTime, createQueryOpts };
