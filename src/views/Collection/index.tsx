import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import CollectionGrid from "../../components/CollectionGrid";
import ErrorMessage from "../../components/ErrorMessage";
import { RecipeType } from "../../types/recipe";
import { getErrorMessage } from "../../utils/helpers";

// fake fetch
const getRecipes = async (): Promise<RecipeType[] | undefined> => {
  const data: RecipeType[] = Array(8)
    .fill({})
    .map((_value, index) => ({
      id: `recipe_${index}`,
    }));

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 2000);
  });
};

const CollectionPage = () => {
  const params = useParams();
  const isParent = !params?.id;

  const [collection, setCollection] = useState<RecipeType[] | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getRecipes();
        setCollection(data);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) return <ErrorMessage error={error} />;

  return (
    <>
      <Outlet />
      <Typography component={isParent ? "h1" : "h2"} variant="h3">
        My Recipe Collection
      </Typography>
      <CollectionGrid loading={loading} collection={collection} />
    </>
  );
};

export default CollectionPage;
