import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import Recipe from "../../components/Recipe";
import { useGetRecipe } from "../../hooks/useGetRecipe";
import { RecipeType } from "../../types/recipe";
import { getErrorMessage } from "../../utils/helpers";
import { isRecipeLocal, saveRecipeToLocalApi } from "../../utils/recipe";

const RecipePage = () => {
  const params = useParams();
  const id = params?.id?.split("_")?.[1];
  const isRemote = !isRecipeLocal({ recipeId: id });

  const { recipe, isPending, isError, error } = useGetRecipe({
    id,
    isRemote,
  });

  useEffect(() => {
    if (isRemote && recipe) {
      saveRecipeToLocalApi({ recipe: recipe as RecipeType });
    }
  }, [isRemote, recipe]);

  if (isError) return <ErrorMessage error={getErrorMessage(error)} />;

  return <Recipe data={recipe as RecipeType | undefined} loading={isPending} />;
};

export default RecipePage;
