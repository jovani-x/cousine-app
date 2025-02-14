import axios from "axios";
import type { GetRandomRecipes200Response } from "../models/GetRandomRecipes200Response";
import type { SearchRecipes200Response } from "../models/SearchRecipes200Response";
import type { RecipeType, SearchOpts } from "../types/recipe";
import { getDietsStr, getQueryStr } from "./recipeSearchHelpers";

const getRecipeApiUrl = () => {
  return import.meta.env.VITE_RECIPE_API_URL as string;
};

// return recipe data by ID
const getRecipeRemote = async ({
  recipeId,
}: {
  recipeId?: string;
}): Promise<RecipeType | undefined> => {
  const apiUrl = getRecipeApiUrl();
  const id = Number(recipeId);

  // error if no ID
  if (!id) throw new Error(errorMessages.IdRequired);
  // error if ID isn't a number
  // recipe ID is a number in API db
  if (isNaN(id)) throw new Error(errorMessages.IdType);

  // request to remote API
  const response = await axios.get<Promise<RecipeType | undefined>>(
    `${apiUrl}/${id}/information?includeNutrition=true`,
    { withCredentials: true }
  );

  if (response.status !== 200 && response.statusText.toLowerCase() !== "ok") {
    if (response.status !== 402) {
      throw new Error(errorMessages.DailyQuota);
    }

    throw new Error(errorMessages.BadResponse);
  }

  return response.data;
};

// return a few recipes data by IDs
const getRecipesRemote = async ({
  ids,
}: {
  ids?: string[];
}): Promise<RecipeType[]> => {
  // error if no IDs
  if (!ids) {
    return new Promise((_resolve, reject) => {
      setTimeout(() => {
        reject(errorMessages.IdsRequired);
      }, 2000);
    });
  }

  // request to remote API
  const apiUrl = getRecipeApiUrl();
  const idsStr = ids.join(",");

  const response = await axios.get<Promise<RecipeType[]>>(
    `${apiUrl}/informationBulk?ids=${idsStr}&includeNutrition=true`,
    { withCredentials: true }
  );

  if (response.status !== 200 && response.statusText.toLowerCase() !== "ok") {
    if (response.status !== 402) {
      throw new Error(errorMessages.DailyQuota);
    }

    throw new Error(errorMessages.BadResponse);
  }

  return response.data;
};

// return random recipe data
const getRandomRecipeRemote = async (): Promise<RecipeType | undefined> => {
  const apiUrl = getRecipeApiUrl();

  const response = await axios.get<GetRandomRecipes200Response>(
    `${apiUrl}/random/?includeNutrition=true`,
    { withCredentials: true }
  );

  if (response.status !== 200 && response.statusText.toLowerCase() !== "ok") {
    if (response.status !== 402) {
      throw new Error(errorMessages.DailyQuota);
    }

    throw new Error(errorMessages.BadResponse);
  }

  return response.data.recipes?.[0];
};

// return found recipes data by params SearchOpts
const searchRecipesRemote = async ({ opts }: { opts?: SearchOpts }) => {
  const apiUrl = getRecipeApiUrl();

  const {
    resultNumber,
    addRecipeInformation,
    diets,
    query,
    minCalories,
    maxCalories,
  } = opts || {};

  // create query
  const queryStr = getQueryStr(query);
  const dietStr = getDietsStr(diets);
  const minCaloriesStr = !minCalories ? "" : `&minCalories=${minCalories}`;
  const maxCaloriesStr = !maxCalories ? "" : `&maxCalories=${maxCalories}`;
  const fullQueryStr = `${apiUrl}/complexSearch?number=${resultNumber}&addRecipeInformation=${addRecipeInformation}&addRecipeNutrition=true${queryStr}${dietStr}${minCaloriesStr}${maxCaloriesStr}`;

  // request to remote API
  const response = await axios.get<SearchRecipes200Response>(fullQueryStr, {
    withCredentials: true,
  });

  if (response.status !== 200 && response.statusText.toLowerCase() !== "ok") {
    if (response.status !== 402) {
      throw new Error(errorMessages.DailyQuota);
    }

    throw new Error(errorMessages.BadResponse);
  }

  return response.data.results as unknown as RecipeType[];
};

const errorMessages = {
  IdRequired: "Recipe ID is required.",
  IdsRequired: "Recipe IDs are required.",
  IdType: "ID should be number.",
  BadResponse: "Bad response.",
  DailyQuota: "Sorry, the daily API quota has been reached.",
};

export {
  errorMessages,
  getRandomRecipeRemote,
  getRecipeApiUrl,
  getRecipeRemote,
  getRecipesRemote,
  searchRecipesRemote,
};
