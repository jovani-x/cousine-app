import { QueryObserverOptions } from "@tanstack/react-query";
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
};

type RecipeDetailsType = Partial<
  Pick<RecipeInformation, "vegetarian" | "vegan" | "glutenFree" | "dairyFree">
> & {
  caloriesObj?: IngredientInformationNutritionPropertiesInner;
  servings?: number;
};

type OptionalQueryObserverOptions<T> = Omit<
  QueryObserverOptions<T | undefined, Error>,
  "queryFn" | "queryKey"
>;

export {
  type OptionalQueryObserverOptions,
  type RecipeDetailsType,
  type RecipeType,
  type SearchOpts,
};
