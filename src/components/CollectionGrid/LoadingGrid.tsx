import Grid, { GridSize } from "@mui/material/Grid2";
import Skeleton from "@mui/material/Skeleton";
import { ResponsiveStyleValue } from "../../types/styleValue";

const LoadingGrid = ({
  gridSize,
}: {
  gridSize: ResponsiveStyleValue<GridSize>;
}) => {
  return Array(4)
    .fill(0)
    .map((_value, index) => {
      return (
        <Grid key={index} size={gridSize}>
          <Skeleton variant="rounded" width="100%" height={120} />
        </Grid>
      );
    });
};

export default LoadingGrid;
