import { useQuery, useQueryClient } from "@tanstack/react-query";
import { RecipeType, SearchOpts } from "../types/recipe";
import { createQueryOpts } from "../utils/constants";
import { searchRecipesRemote } from "../utils/recipe";

// return array of recipes by params, statuses (isPending, isFetching, isError), error and refetch function
// searchOpts: SearchOpts
const useSearchRecipes = ({ searchOpts }: { searchOpts?: SearchOpts }) => {
  const queryClient = useQueryClient();
  const queryOpts = {
    ...createQueryOpts<RecipeType[]>(),
    enabled: false,
  };
  const queryKey = ["search-recipes", searchOpts];
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
    queryFn: () => searchRecipesRemote({ opts: searchOpts }),
    initialData: () => queryClient.getQueryData(queryKey),
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

export { useSearchRecipes };
