// utils to manipulate with user's recipe collection (recipe IDs)
import { getUserId } from "../auth";
import { db } from "../db/db";

// return user's recipe IDs
const getUserRecipeIds = async (data?: { userID?: string }) => {
  const { userID } = data || {};
  const userId = userID ?? getUserId();
  if (!userId) return [];

  const userData = await db.userRecipes.get(userId);
  return userData?.recipesIds;
};

// add recipe ID to user's collection
const addUserRecipeId = async (data: {
  recipeId?: string;
  userID?: string;
}) => {
  const { recipeId, userID } = data || {};
  const userId = userID ?? getUserId();
  if (!userId) throw new Error(errorMessages.NoAccess);

  if (!recipeId) throw new Error(errorMessages.IdRequired);

  const ids = await getUserRecipeIds();
  // no IDs in collection (empty) - just add new record
  // otherwise - update record
  if (!ids) {
    db.userRecipes.add({ userId, recipesIds: [recipeId] });
  } else {
    db.userRecipes.update(userId, { recipesIds: [...(ids ?? []), recipeId] });
  }
};

const errorMessages = {
  IdRequired: "Recipe ID is required.",
  NoAccess: "You don't have access.",
};

export { addUserRecipeId, getUserRecipeIds };
