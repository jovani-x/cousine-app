import { useQuery } from "@tanstack/react-query";
import { RecipeType } from "../types/recipe";

// return recipe:
// id: recipe id
// isRemote:
// - true: from recipe API
// - false: from indexedDB
const useGetRecipe = ({
  id,
  isRemote = false,
}: {
  id?: string;
  isRemote?: boolean;
}) => {
  const getRecipe = isRemote ? getRecipeRemote : getRecipeLocal;

  const queryOpts = {};

  const {
    data: recipe,
    isPending,
    isFetching,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["recipe", id ?? ""],
    queryFn: getRecipe,
    ...queryOpts,
  });

  if (!id) {
    throw new Error(errorMessages.IdRequired);
  }

  return {
    recipe,
    isPending,
    isFetching,
    isError,
    error,
    refetch,
  };
};

// !!! fake fetch
// return recipe from recipe API
const getRecipeRemote = async ({
  queryKey,
}: {
  queryKey: string[];
}): Promise<RecipeType> => {
  const data: RecipeType = {
    id: queryKey[1],
    title: `remote getRecipeById #${queryKey[1]}`,
  };

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 2000);
  });
};

// !!! fake fetch
// return recipe from indexedDB
const getRecipeLocal = async ({
  queryKey,
}: {
  queryKey: string[];
}): Promise<RecipeType> => {
  const data: RecipeType = {
    id: queryKey[1],
    title: `local getRecipeById #${queryKey[1]}`,
  };

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 2000);
  });
};

const errorMessages = {
  IdRequired: "Recipe ID is required.",
};

export { errorMessages, getRecipeLocal, getRecipeRemote, useGetRecipe };
