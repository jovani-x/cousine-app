import { Link, Paper, Skeleton, Typography, useTheme } from "@mui/material";
import { NavLink } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import { RecipeTypeChart } from "../../components/RecipeTypesChart";
import { useGetRecipes } from "../../hooks/useGetRecipes";
import { RoutePath } from "../../router/routes";
import { getErrorMessage } from "../../utils/helpers";

export const DishStats = () => {
  const { recipes, isPending, isError, error } = useGetRecipes();
  const theme = useTheme();
  const color = theme.palette.primary[theme.palette.mode];
  const boxSx = {
    position: "relative",
    aspectRatio: 1,
    p: 2,
    textAlign: "center",
  };

  const renderedError = <ErrorMessage error={getErrorMessage(error)} />;

  const renderedGraph = isPending ? (
    <Skeleton sx={{ aspectRatio: "1 / 1" }} />
  ) : !recipes?.length ? (
    <>No data</>
  ) : (
    <RecipeTypeChart collection={recipes} />
  );

  const renderedContent = (
    <>
      <Typography sx={{ mb: 1 }}>
        {isPending ? <Skeleton /> : `${recipes?.length ?? 0} recipes`}
      </Typography>
      <Typography component="h3" variant="h6" sx={{ mb: 2, color }}>
        Dish Types
      </Typography>
      {renderedGraph}
    </>
  );

  return (
    <Paper sx={{ ...boxSx }}>
      <Typography component="h2" variant="h5" sx={{ mb: 1, color }}>
        <Link component={NavLink} to={RoutePath.Collection}>
          My Recipe Collection
        </Link>
      </Typography>
      {isError ? renderedError : renderedContent}
    </Paper>
  );
};
