import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { TriviaType } from "../types/trivia";
import { createQueryOpts } from "../utils/constants";
import { getNodeEnv, getTriviaApiUrl } from "../utils/helpers";
import { getRecipeApiKey } from "../utils/recipe";

// return trivia from recipe API
const useGetTrivia = () => {
  const queryOpts = createQueryOpts<TriviaType>();
  const {
    data: trivia,
    isPending,
    isFetching,
    error,
    isError,
  } = useQuery({
    ...queryOpts,
    queryKey: ["trivia"],
    queryFn: () => getTrivia(),
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
  const apiKey = getRecipeApiKey();
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
    `${apiUrl}?apiKey=${apiKey}`
  );

  if (response.status !== 200 && response.statusText.toLowerCase() !== "ok") {
    if (response.status !== 402) {
      throw new Error("Sorry, but the API daily quota is used up.");
    }

    throw new Error("Bad response.");
  }

  return response.data;
};

export { getTrivia, useGetTrivia };
