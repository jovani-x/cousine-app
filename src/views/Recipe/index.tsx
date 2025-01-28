import { useParams } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import Recipe from "../../components/Recipe";
import { useGetRecipe } from "../../hooks/useGetRecipe";
import { getErrorMessage } from "../../utils/helpers";

const RecipePage = () => {
  const params = useParams();
  const id = params?.id?.split("_")?.[1];

  const { recipe, isPending, isError, error } = useGetRecipe({ id });

  if (isError) return <ErrorMessage error={getErrorMessage(error)} />;

  return <Recipe data={recipe} loading={isPending} />;
};

export default RecipePage;
