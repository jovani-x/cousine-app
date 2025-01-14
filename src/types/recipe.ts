import { IngredientInformationNutrition } from "../models/IngredientInformationNutrition";
import { IngredientInformationNutritionPropertiesInner } from "../models/IngredientInformationNutritionPropertiesInner";
import { RecipeInformation } from "../models/RecipeInformation";

// TS models for Spoonacular API
// https://github.com/ddsky/spoonacular-api-clients/tree/master/typescript/models

type RecipeType = RecipeInformation & {
  nutrition?: IngredientInformationNutrition;
};

type SearchOpts = {
  resultNumber?: number;
  query?: string;
  diets?: Record<string, boolean>;
  addRecipeInformation?: boolean;
  minCalories?: number;
  maxCalories?: number;
  isMyCollection: boolean;
};

type RecipeDetailsType = Pick<
  RecipeInformation,
  "vegetarian" | "vegan" | "glutenFree" | "dairyFree"
> & {
  caloriesObj?: IngredientInformationNutritionPropertiesInner;
};

export { type RecipeDetailsType, type RecipeType, type SearchOpts };
