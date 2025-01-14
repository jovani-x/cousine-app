import { QueryOptions, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { db } from "../db/db";
import { RecipeType } from "../types/recipe";
import { getRecipeApiKey, getRecipeApiUrl } from "../utils/recipe";

// return recipe:
// id: recipe id
// isRemote:
// - true: from recipe API
// - false: from indexedDB
// queryOpts: QueryOptions
const useGetRecipe = ({
  id,
  isRemote = false,
  queryOpts,
}: {
  id?: string;
  isRemote?: boolean;
  queryOpts?: Partial<QueryOptions>;
}) => {
  const getRecipe = isRemote ? getRecipeRemote : getRecipeLocal;
  const {
    data: recipe,
    isPending,
    isFetching,
    isError,
    error,
    refetch,
  } = useQuery({
    ...queryOpts,
    queryKey: ["recipe", id ?? ""],
    queryFn: () => getRecipe({ recipeId: id }),
  });

  if (!id) throw new Error(errorMessages.IdRequired);

  return {
    recipe,
    isPending,
    isFetching,
    isError,
    error,
    refetch,
  };
};

// return recipe from recipe API
const getRecipeRemote = async ({
  recipeId,
}: {
  recipeId?: string;
}): Promise<RecipeType | undefined> => {
  const apiKey = getRecipeApiKey();
  const apiUrl = getRecipeApiUrl();
  const id = Number(recipeId);

  if (!id) throw new Error(errorMessages.IdRequired);
  if (isNaN(id)) throw new Error(errorMessages.IdType);

  const response = await axios.get<Promise<RecipeType | undefined>>(
    `${apiUrl}/${id}/information?apiKey=${apiKey}&includeNutrition=true`
  );

  if (response.status !== 200 && response.statusText.toLowerCase() !== "ok") {
    if (response.status !== 402) {
      throw new Error("Sorry, but the API daily quota is used up.");
    }

    throw new Error("Bad response.");
  }

  return response.data;
};

// return recipe from indexedDB
const getRecipeLocal = async ({
  recipeId,
}: {
  recipeId?: string;
}): Promise<RecipeType | undefined> => {
  const id = Number(recipeId);

  if (!id) throw new Error(errorMessages.IdRequired);
  if (isNaN(id)) throw new Error(errorMessages.IdType);

  return await db.recipes.get({ id });
};

const errorMessages = {
  IdRequired: "Recipe ID is required.",
  IdType: "ID should be number.",
};

export { errorMessages, getRecipeLocal, getRecipeRemote, useGetRecipe };
