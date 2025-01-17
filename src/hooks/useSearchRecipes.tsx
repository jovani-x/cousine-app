import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Diets } from "../constants/diets";
import { db } from "../db/db";
import { SearchRecipes200Response } from "../models/SearchRecipes200Response";
import { RecipeType, SearchOpts } from "../types/recipe";
import { createQueryOpts } from "../utils/constants";
import { getRecipeApiKey, getRecipeApiUrl } from "../utils/recipe";

// return array of recipes by params
// searchOpts: SearchOpts
const useSearchRecipes = ({ searchOpts }: { searchOpts?: SearchOpts }) => {
  // isRemote:
  // - true: from recipe API
  // - false: from indexedDB
  const isRemote = !searchOpts ? false : !searchOpts.isMyCollection;
  const searchRecipes = isRemote ? searchRecipesRemote : searchRecipesLocal;
  const queryOpts = {
    ...createQueryOpts<RecipeType[]>(),
    enabled: false,
  };
  const {
    data: recipes,
    isPending,
    isFetching,
    isError,
    error,
    refetch,
  } = useQuery({
    ...queryOpts,
    queryKey: ["search-recipes", searchOpts],
    queryFn: () => searchRecipes({ opts: searchOpts }),
  });

  return {
    recipes,
    isPending,
    isFetching,
    isError,
    error,
    refetch,
  };
};

const getQueryStr = (query?: string) => {
  return !query ? "" : `&query=${query}`;
};

const getDietsStr = (diets?: Pick<SearchOpts, "diets">) => {
  const dietKeys = diets
    ? Object.keys(diets).filter((key) => diets[key as keyof typeof diets])
    : undefined;

  return !diets || !dietKeys || dietKeys.length === 0
    ? ""
    : `&diet=${dietKeys.join(",")}`;
};

// return recipes from recipe API
const searchRecipesRemote = async ({ opts }: { opts?: SearchOpts }) => {
  const apiKey = getRecipeApiKey();
  const apiUrl = getRecipeApiUrl();

  const {
    resultNumber,
    addRecipeInformation,
    diets,
    query,
    minCalories,
    maxCalories,
  } = opts || {};
  const queryStr = getQueryStr(query);
  const dietStr = getDietsStr(diets);
  const minCaloriesStr = !minCalories ? "" : `&minCalories=${minCalories}`;
  const maxCaloriesStr = !maxCalories ? "" : `&maxCalories=${maxCalories}`;
  const fullQueryStr = `${apiUrl}/complexSearch?apiKey=${apiKey}&number=${resultNumber}&addRecipeInformation=${addRecipeInformation}&addRecipeNutrition=true${queryStr}${dietStr}${minCaloriesStr}${maxCaloriesStr}`;

  const response = await axios.get<SearchRecipes200Response>(fullQueryStr, {});

  if (response.status !== 200 && response.statusText.toLowerCase() !== "ok") {
    if (response.status !== 402) {
      throw new Error("Sorry, but the API daily quota is used up.");
    }

    throw new Error("Bad response.");
  }

  return response.data.results as unknown as RecipeType[];
};

const matchDiets = ({
  dietsArr,
  recipe,
}: {
  dietsArr: string[];
  recipe: RecipeType;
}) => {
  if (!recipe?.diets || dietsArr.length > recipe.diets.length) return false;

  const suitableDiets = dietsArr.filter((dietName) =>
    recipe?.diets.includes(dietName)
  );
  return suitableDiets.length === dietsArr.length;
};

// return recipes from indexedDB
const searchRecipesLocal = async ({ opts }: { opts?: SearchOpts }) => {
  const { resultNumber, query, minCalories, maxCalories, diets } = opts || {};

  const dietsArr = Array.from(Object.entries(diets ?? {}))
    .filter(([, dietValue]) => dietValue)
    .map(([dietName]) => Diets[dietName as keyof typeof Diets].toLowerCase());

  const recipes = await db.recipes
    .filter((recipe) => {
      let isSuitable = true;

      // query
      isSuitable &&=
        !query ||
        JSON.stringify(recipe).toLowerCase().includes(query.toLowerCase());

      // minCalories and/or maxCalories
      if (minCalories || maxCalories) {
        const nutrients = recipe.nutrition?.nutrients;

        // no nutrients - skip
        if (!nutrients) return false;

        const calories = Array.from(nutrients).find(
          (item) => item.name.toLowerCase() === "calories"
        );

        // no calories - skip
        if (!calories) return false;

        // minCalories
        isSuitable &&= !minCalories ? true : calories.amount >= minCalories;

        // maxCalories
        isSuitable &&= !maxCalories ? true : calories.amount <= maxCalories;
      }

      // diets
      if (dietsArr?.length) {
        isSuitable &&= matchDiets({ dietsArr, recipe });
      }

      return isSuitable;
    })
    .toArray();

  // no resultNumber or number of recipes < resultNumber
  // return all recipes
  if (!resultNumber || (resultNumber && recipes.length < resultNumber))
    return recipes;

  return recipes.slice(0, resultNumber);
};

export { searchRecipesLocal, searchRecipesRemote, useSearchRecipes };
