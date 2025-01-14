const AppName = "Cousine App";

const queryOpts = {
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  refetchInterval: false as const,
  gcTime: 1000 * 60 * 60 * 24 * 30, // 30 days
  staleTime: 1000 * 60 * 60 * 24 * 30,
  retry: 1,
  enabled: false,
};

export { AppName, queryOpts };
