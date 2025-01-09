const getRecipeApiKey = () => {
  return import.meta.env.VITE_RECIPE_API_KEY as string;
};

const getRecipeApiUrl = () => {
  return import.meta.env.VITE_RECIPE_API_URL as string;
};

export { getRecipeApiKey, getRecipeApiUrl };
