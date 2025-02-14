import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { TriviaType } from "../types/trivia";
import { createQueryOpts } from "../utils/constants";
import { getNodeEnv, getTriviaApiUrl } from "../utils/helpers";

// return trivia from recipe API, statuses (isPending, isFetching, isError) and error
const useGetTrivia = () => {
  const queryClient = useQueryClient();
  const queryOpts = createQueryOpts<TriviaType>();
  const queryKey = ["trivia"];
  const {
    data: trivia,
    isPending,
    isFetching,
    error,
    isError,
  } = useQuery({
    ...queryOpts,
    queryKey,
    queryFn: () => getTrivia(),
    initialData: () => queryClient.getQueryData(queryKey),
  });

  return {
    trivia,
    isPending,
    isFetching,
    error,
    isError,
  };
};

const getTrivia = async (): Promise<TriviaType | undefined> => {
  const apiUrl = getTriviaApiUrl();

  // if not 'production' return fake text
  // to limit requests to API
  if (getNodeEnv() !== "production") {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est voluptate assumenda nemo.",
        });
      }, 2000);
    });
  }

  const response = await axios.get<Promise<TriviaType | undefined>>(
    `${apiUrl}`,
    { withCredentials: true }
  );

  if (response.status !== 200 && response.statusText.toLowerCase() !== "ok") {
    if (response.status !== 402) {
      throw new Error(errorMessages.DailyQuota);
    }

    throw new Error(errorMessages.BadResponse);
  }

  return response.data;
};

const errorMessages = {
  BadResponse: "Bad response.",
  DailyQuota: "Sorry, the daily API quota has been reached.",
};

export { getTrivia, useGetTrivia };
