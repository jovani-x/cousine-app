import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import Recipe from "../../components/Recipe";
import { RecipeType } from "../../types/recipe";
import { getErrorMessage } from "../../utils/helpers";

// fake fetch
const getRecipe = async (id?: number): Promise<RecipeType | undefined> => {
  const data = { id: `recipe_${id}` };

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 2000);
  });
};

const RecipePage = () => {
  const params = useParams();
  const id = params?.id?.split("_")?.[1];

  const [recipe, setRecipe] = useState<RecipeType | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const recipeId = Number(id);
        if (isNaN(recipeId)) throw Error("Incorrect recipe id.");

        const data = await getRecipe(recipeId);
        setRecipe(data);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (error) return <ErrorMessage error={error} />;

  return <Recipe data={recipe} loading={loading} />;
};

export default RecipePage;
