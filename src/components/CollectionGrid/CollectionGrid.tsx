import Grid from "@mui/material/Grid2";
import { RecipeType } from "../../types/recipe";
import { RecipePreview } from "../Recipe";
import LoadingGrid from "./LoadingGrid";
import NoData from "./NoData";

const CollectionGrid = ({
  collection,
  loading,
}: {
  collection?: RecipeType[];
  loading?: boolean;
}) => {
  const size = { xs: 12, sm: 6, md: 6, lg: 4, xl: 3 };
  const renderedGrid = loading ? (
    <LoadingGrid gridSize={size} />
  ) : !collection ? (
    <NoData />
  ) : (
    collection.map((data) => {
      return (
        <Grid size={size} key={data.id}>
          <RecipePreview data={data} />
        </Grid>
      );
    })
  );

  return (
    <Grid container spacing={3} sx={{ my: 3 }}>
      {renderedGrid}
    </Grid>
  );
};

export default CollectionGrid;
