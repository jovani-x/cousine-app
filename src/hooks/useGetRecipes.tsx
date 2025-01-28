import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { RecipeType } from "../types/recipe";
import { createQueryOpts } from "../utils/constants";
import { getRecipeIds, getRecipesRemote } from "../utils/recipe";

type UseGetRecipesOpts = { ids?: string[] };

// return array of recipes, statuses (isPending, isFetching, isError), error and refetch function
// options:
// ids?: string[]; - recipe IDs
// - if no provided IDs - return all recipes from user's collection
const useGetRecipes = (opts?: UseGetRecipesOpts) => {
  const { ids } = opts || {};
  const [recipeIds, setRecipeIds] = useState(ids);
  const queryClient = useQueryClient();
  const queryOpts = {
    ...createQueryOpts<RecipeType[]>(),
    enabled: Boolean(recipeIds),
  };
  const queryKey = ["recipes", recipeIds];
  const {
    data: recipes,
    isPending,
    isFetching,
    isError,
    error,
    refetch,
  } = useQuery({
    ...queryOpts,
    queryKey,
    queryFn: () => getRecipesRemote({ ids: recipeIds }),
    initialData: () => queryClient.getQueryData(queryKey),
  });

  // fetch user's recipe IDs
  useEffect(() => {
    const fetchIds = async () => {
      setRecipeIds(await getRecipeIds());
    };
    if (!ids) {
      fetchIds();
    }
  }, [ids]);

  return {
    recipes,
    isPending,
    isFetching,
    isError,
    error,
    refetch,
  };
};

export { useGetRecipes };
