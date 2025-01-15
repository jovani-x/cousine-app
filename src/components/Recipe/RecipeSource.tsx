import LaunchIcon from "@mui/icons-material/Launch";
import { Button, Link, Typography } from "@mui/material";
import { RecipeType } from "../../types/recipe";

export const RecipeSource = ({
  textBefore,
  sourceName,
  sourceUrl,
}: Partial<Pick<RecipeType, "sourceName" | "sourceUrl">> & {
  textBefore?: string;
}) => {
  if (!sourceName || !sourceUrl) return null;

  return (
    <Typography>
      {textBefore}
      <Button
        component={Link}
        href={sourceUrl}
        target="_blank"
        size="large"
        color="primary"
        endIcon={<LaunchIcon />}
        sx={{ textTransform: "none" }}
      >
        {sourceName}
      </Button>
    </Typography>
  );
};
