import Dexie, { type EntityTable } from "dexie";
import { RecipeType } from "../types/recipe";

const db = new Dexie("recipesdb") as Dexie & {
  recipes: EntityTable<RecipeType, "id">;
};

db.version(1).stores({
  recipes:
    "id, title, image, servings, readyInMinutes, summary, instructions, analyzedInstructions, extendedIngredients, dishTypes, diets, occasions, winePairing, nutrition",
});

export { db };
