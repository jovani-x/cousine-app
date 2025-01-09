import { useQuery } from "@tanstack/react-query";
import { RecipeType } from "../types/recipe";

// return array of recipes
// isRemote:
// - true: from recipe API
// - false: from indexedDB
const useGetRecipes = ({ isRemote = false }: { isRemote?: boolean }) => {
  const getRecipes = isRemote ? getRecipesRemote : getRecipesLocal;

  const queryOpts = {};

  const {
    data: recipes,
    isPending,
    isFetching,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["recipes"],
    queryFn: getRecipes,
    ...queryOpts,
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

// it is not necessary now
// maybe for future:
// return a few random recipes from recipe API ???
const getRecipesRemote = async (): Promise<RecipeType[]> => {
  return new Promise((_resolve, reject) => {
    setTimeout(() => {
      reject(errorMessages.NoRemoteMode);
    }, 2000);
  });
};

// !!! fake fetch
// return recipes from indexedDB
const getRecipesLocal = async (): Promise<RecipeType[]> => {
  const data: RecipeType[] = Array(8)
    .fill({})
    .map((_value, index) => ({
      id: `${index}`,
      title: `Recipe #${index}`,
    }));

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 2000);
  });
};

const errorMessages = {
  NoRemoteMode: 'Use param "{ isRemote: false }"!',
};

export { errorMessages, getRecipesLocal, getRecipesRemote, useGetRecipes };
