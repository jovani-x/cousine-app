import { useQuery, useQueryClient } from "@tanstack/react-query";
import { RecipeType } from "../types/recipe";
import { createQueryOpts } from "../utils/constants";
import { getRandomRecipeRemote } from "../utils/recipe";

// return random recipe, statuses (isPending, isFetching, isError) and error
const useGetRandomRecipe = () => {
  const queryClient = useQueryClient();
  const queryOpts = createQueryOpts<RecipeType>();
  const queryKey = ["random-recipe"];
  const {
    data: recipe,
    isPending,
    isFetching,
    isError,
    error,
  } = useQuery({
    ...queryOpts,
    queryKey,
    queryFn: () => getRandomRecipeRemote(),
    initialData: () => queryClient.getQueryData(queryKey),
  });

  return { recipe, isPending, isFetching, isError, error };
};

export { useGetRandomRecipe };
