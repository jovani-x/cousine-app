import { SearchOpts } from "../types/recipe";

// return array of recipes by params
// searchOpts:
// - ...
// isRemote:
// - true: from recipe API
// - false: from indexedDB
const useSearchRecipes = ({
  isRemote = false,
  searchOpts,
}: {
  isRemote?: boolean;
  searchOpts?: SearchOpts;
}) => {
  const searchRecipes = isRemote ? searchRecipesRemote : searchRecipesLocal;

  // ...
};

// return recipes from recipe API
const searchRecipesRemote = async () => {
  // ...
};

// return recipes from indexedDB
const searchRecipesLocal = async () => {
  // ...
};

export { searchRecipesLocal, searchRecipesRemote, useSearchRecipes };
