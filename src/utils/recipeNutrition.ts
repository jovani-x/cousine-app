import { IngredientInformationNutrition } from "../models/IngredientInformationNutrition";
import { IngredientInformationNutritionPropertiesInner } from "../models/IngredientInformationNutritionPropertiesInner";

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

export { getCaloriesStr, getRecipeCalories };
