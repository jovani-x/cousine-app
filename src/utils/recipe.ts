import { db } from "../db/db";
import { IngredientInformationNutrition } from "../models/IngredientInformationNutrition";
import { IngredientInformationNutritionPropertiesInner } from "../models/IngredientInformationNutritionPropertiesInner";
import { RecipeType } from "../types/recipe";

const getRecipeApiKey = () => {
  return import.meta.env.VITE_RECIPE_API_KEY as string;
};

const getRecipeApiUrl = () => {
  return import.meta.env.VITE_RECIPE_API_URL as string;
};

const localRecipeIdsName = "local-recipes";

const getLocalRecipeIds = () => {
  const localRecipeIds = localStorage.getItem(localRecipeIdsName);
  if (!localRecipeIds) return [];

  const ids: string[] = JSON.parse(localRecipeIds);
  return ids;
};

const isRecipeLocal = ({ recipeId }: { recipeId?: string }) => {
  if (!recipeId) throw new Error("Should be ID.");

  const ids = getLocalRecipeIds();
  return Boolean(ids.find((id) => id === recipeId));
};

const saveRecipeToLocalIds = ({ recipeId }: { recipeId?: string }) => {
  if (!recipeId) throw new Error("Should be ID.");

  if (!isRecipeLocal({ recipeId })) {
    const ids = getLocalRecipeIds();
    ids.push(recipeId);
    localStorage.setItem(localRecipeIdsName, JSON.stringify(ids));
  }
};

const saveRecipeToLocalApi = async ({ recipe }: { recipe?: RecipeType }) => {
  if (!recipe) throw new Error("Should be recipe.");

  const recipeId = String(recipe.id);
  saveRecipeToLocalIds({ recipeId });
  db.recipes.add(recipe);
};

const getRecipeCalories = (nutrition?: IngredientInformationNutrition) => {
  if (!nutrition?.nutrients) return undefined;

  const caloriesObj = Array.from(nutrition.nutrients).find(
    (item) => item.name.toLowerCase() === "calories"
  );

  if (!caloriesObj) return undefined;

  return caloriesObj;
};

const getCaloriesStr = (
  caloriesObj?: IngredientInformationNutritionPropertiesInner
) => {
  return !caloriesObj?.amount || !caloriesObj?.unit
    ? "N/A"
    : `${caloriesObj.amount} ${caloriesObj.unit}`;
};

export {
  getCaloriesStr,
  getLocalRecipeIds,
  getRecipeApiKey,
  getRecipeApiUrl,
  getRecipeCalories,
  isRecipeLocal,
  saveRecipeToLocalApi,
};
