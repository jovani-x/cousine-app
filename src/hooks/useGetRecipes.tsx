import { QueryOptions, useQuery } from "@tanstack/react-query";
import { db } from "../db/db";
import { RecipeType } from "../types/recipe";
import { getLocalRecipeIds } from "../utils/recipe";

// return array of recipes
// isRemote:
// - true: from recipe API
// - false: from indexedDB
// queryOpts: QueryOptions
const useGetRecipes = ({
  isRemote = false,
  queryOpts,
}: {
  isRemote?: boolean;
  queryOpts?: Partial<QueryOptions>;
}) => {
  const getRecipes: () => Promise<RecipeType[] | undefined> = isRemote
    ? getRecipesRemote
    : getRecipesLocal;
  const localIds = getLocalRecipeIds();
  const {
    data: recipes,
    isPending,
    isFetching,
    isError,
    error,
    refetch,
  } = useQuery({
    ...queryOpts,
    queryKey: ["recipes", localIds],
    queryFn: getRecipes,
  });

  return {
    recipes,
    isPending,
    isFetching,
    isError,
    error,
    refetch,
  };
};

// return recipes from indexedDB
const getRecipesLocal = async (): Promise<RecipeType[] | undefined> => {
  const recipes = await db.recipes.toArray();
  return recipes;
};

// it is not necessary now
// maybe for future:
// return a few random recipes from recipe API ???
const getRecipesRemote = async (): Promise<RecipeType[] | undefined> => {
  return new Promise((_resolve, reject) => {
    setTimeout(() => {
      reject(errorMessages.NoRemoteMode);
    }, 2000);
  });
};

const errorMessages = {
  NoRemoteMode: 'Use param "{ isRemote: false }"!',
};

export { errorMessages, getRecipesLocal, getRecipesRemote, useGetRecipes };
