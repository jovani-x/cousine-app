// utils to manipulate with user recipes('My Collection') IDs in localStorage
// permanently IDs are kept in db
// localStorage provides quick access to recipes IDs

import { getUserRecipeIds } from "./recipeStoreLocal";

// localStorage name for user's recipes IDs
const localRecipeIdsName = "local-recipes";

// return user's recipes IDs
const getRecipeIds = async (): Promise<string[]> => {
  // check localStorage
  const localRecipeIds = localStorage.getItem(localRecipeIdsName);

  if (!localRecipeIds) {
    // no data in localStorage
    // so get it from db, save to localStorage
    // and return it
    const res = (await getUserRecipeIds({})) ?? [];
    await setRecipeIds({ ids: res });
    return res;
  }

  // parse and return array of IDs
  const ids: string[] = JSON.parse(localRecipeIds);
  return ids;
};

// add new recipe ID to localStorage
const addRecipeId = async ({ recipeId }: { recipeId?: string }) => {
  // error if no ID
  if (!recipeId) throw new Error("A recipe ID is required.");

  // if no such a recipe ID in collection
  // then add it
  if (!(await isIncluded({ recipeId }))) {
    const ids = await getRecipeIds();
    localStorage.setItem(
      localRecipeIdsName,
      JSON.stringify([...ids, recipeId])
    );
  }
};

// set recipe IDs to localStorage
const setRecipeIds = async ({ ids }: { ids?: string[] }) => {
  // error if no IDs
  if (!ids) throw new Error("Recipe IDs are required.");

  // stringify IDs and save them
  localStorage.setItem(localRecipeIdsName, JSON.stringify(ids));
};

// return true if user's collection includes provided ID
const isIncluded = async ({
  recipeId,
}: {
  recipeId?: string;
}): Promise<boolean> => {
  // error if no ID
  if (!recipeId) throw new Error("A recipe ID is required.");

  // get collection IDs and check
  const ids = await getRecipeIds();
  return Boolean(ids.find((id) => id === recipeId));
};

// clean localStorage
const removeRecipeIds = async () => {
  localStorage.removeItem(localRecipeIdsName);
};

export { addRecipeId, getRecipeIds, isIncluded, removeRecipeIds, setRecipeIds };
