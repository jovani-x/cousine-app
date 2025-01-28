import { Typography } from "@mui/material";
import { Outlet, useParams } from "react-router-dom";
import CollectionGrid from "../../components/CollectionGrid";
import ErrorMessage from "../../components/ErrorMessage";
import { useGetRecipes } from "../../hooks/useGetRecipes";
import { getErrorMessage } from "../../utils/helpers";

const CollectionPage = () => {
  const params = useParams();
  const isParent = !params?.id;

  const { recipes, isPending, isError, error } = useGetRecipes();

  if (isError) return <ErrorMessage error={getErrorMessage(error)} />;

  return (
    <>
      <Outlet />
      <Typography component={isParent ? "h1" : "h2"} variant="h3">
        My Recipe Collection
      </Typography>
      <CollectionGrid loading={isPending} collection={recipes} />
    </>
  );
};

export default CollectionPage;
