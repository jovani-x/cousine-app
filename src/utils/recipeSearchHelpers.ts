import { SearchOpts } from "../types/recipe";

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

export { getDietsStr, getQueryStr };
