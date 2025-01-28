import { useQuery, useQueryClient } from "@tanstack/react-query";
import { RecipeType } from "../types/recipe";
import { createQueryOpts } from "../utils/constants";
import { getRecipeRemote } from "../utils/recipe";

type UseGetRecipeOpts = { id?: string };

// return recipe, statuses (isPending, isFetching, isError), error and refetch function
// options:
// id: recipe id
const useGetRecipe = (opts?: UseGetRecipeOpts) => {
  const { id } = opts || {};
  const queryClient = useQueryClient();
  const queryOpts = createQueryOpts<RecipeType>();
  const queryKey = ["recipe", id ?? ""];
  const {
    data: recipe,
    isPending,
    isFetching,
    isError,
    error,
    refetch,
  } = useQuery({
    ...queryOpts,
    queryKey,
    queryFn: () => getRecipeRemote({ recipeId: id }),
    initialData: () => queryClient.getQueryData(queryKey),
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

const errorMessages = {
  IdRequired: "Recipe ID is required.",
  IdType: "ID should be number.",
};

export { errorMessages, useGetRecipe };
