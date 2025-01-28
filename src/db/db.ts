import Dexie, { type EntityTable } from "dexie";

type UserRecipe = {
  userId: string;
  recipesIds?: string[];
};

// db with user's recipe collection (recipe IDs)
const db = new Dexie("recipesdb") as Dexie & {
  userRecipes: EntityTable<UserRecipe, "userId">;
};

db.version(1).stores({
  userRecipes: "userId, recipesIds",
});

export { db, type UserRecipe };
