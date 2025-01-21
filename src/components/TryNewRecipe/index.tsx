import {
  CardOwnProps,
  Paper,
  PaperOwnProps,
  Typography,
  useTheme,
} from "@mui/material";
import ErrorMessage from "../../components/ErrorMessage";
import { RecipePreview } from "../../components/Recipe";
import { useGetRandomRecipe } from "../../hooks/useGetRandomRecipe";
import { getErrorMessage, getNodeEnv } from "../../utils/helpers";

export const TryNewRecipe = ({
  paperProps,
  cardProps,
}: {
  paperProps?: PaperOwnProps;
  cardProps?: CardOwnProps;
}) => {
  const theme = useTheme();
  const color = theme.palette.primary[theme.palette.mode];
  const isRemoteRandomRecipe = getNodeEnv() === "production";
  const { recipe, isPending, isError, error } = useGetRandomRecipe({
    isRemote: isRemoteRandomRecipe,
  });
  const { sx, ...paperPropsRest } = paperProps || {};
  const { sx: cardSx, ...cardPropsRest } = cardProps || {};

  const renderedError = <ErrorMessage error={getErrorMessage(error)} />;

  const renderedContent =
    !isPending && !recipe ? (
      <ErrorMessage error="Sorry. Something went wrong" />
    ) : (
      <RecipePreview
        data={recipe}
        loading={isPending}
        cardProps={{
          square: true,
          sx: { mx: -2, mb: -2, ...cardSx },
          ...cardPropsRest,
        }}
      />
    );

  return (
    <Paper {...paperPropsRest} sx={{ p: 2, aspectRatio: 1, ...sx }}>
      <Typography
        component="h2"
        variant="h5"
        sx={{
          mb: 2,
          color,
          textAlign: "center",
        }}
      >
        Try something new
      </Typography>
      {isError ? renderedError : renderedContent}
    </Paper>
  );
};
