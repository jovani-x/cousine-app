import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { db } from "../db/db";
import { GetRandomRecipes200Response } from "../models/GetRandomRecipes200Response";
import { RecipeType } from "../types/recipe";
import { createQueryOpts } from "../utils/constants";
import {
  getLocalRecipeIds,
  getRecipeApiKey,
  getRecipeApiUrl,
} from "../utils/recipe";

const useGetRandomRecipe = ({ isRemote = false }: { isRemote?: boolean }) => {
  const getRandomRecipe = isRemote
    ? getRandomRecipeRemote
    : getRandomRecipeLocal;
  const queryOpts = createQueryOpts<RecipeType>();
  const {
    data: recipe,
    isPending,
    isFetching,
    isError,
    error,
  } = useQuery({
    ...queryOpts,
    queryKey: ["random-recipe"],
    queryFn: () => getRandomRecipe(),
  });

  return { recipe, isPending, isFetching, isError, error };
};

const getRandomRecipeRemote = async (): Promise<RecipeType | undefined> => {
  const apiKey = getRecipeApiKey();
  const apiUrl = getRecipeApiUrl();

  const response = await axios.get<GetRandomRecipes200Response>(
    `${apiUrl}/random/?apiKey=${apiKey}&includeNutrition=true`
  );

  if (response.status !== 200 && response.statusText.toLowerCase() !== "ok") {
    if (response.status !== 402) {
      throw new Error("Sorry, but the API daily quota is used up.");
    }

    throw new Error("Bad response.");
  }

  return response.data.recipes?.[0];
};

const getRandomRecipeLocal = async (): Promise<RecipeType | undefined> => {
  const ids = getLocalRecipeIds();
  if (!ids?.length) throw new Error("No saved recipes.");

  const ix = Math.floor(Math.random() * ids.length);
  const id = Number(ids[ix]);
  return await db.recipes.get({ id });
};

export { useGetRandomRecipe };
