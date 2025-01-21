import {
  Paper,
  PaperOwnProps,
  Skeleton,
  Typography,
  useTheme,
} from "@mui/material";
import { useGetTrivia } from "../../hooks/useGetTrivia";
import { getErrorMessage } from "../../utils/helpers";
import ErrorMessage from "../ErrorMessage";

export const Trivia = ({ paperProps }: { paperProps?: PaperOwnProps }) => {
  const theme = useTheme();
  const color = theme.palette.primary[theme.palette.mode];
  const { trivia, isError, error, isPending } = useGetTrivia();
  const { sx, ...paperPropsRest } = paperProps || {};

  const renderedError = <ErrorMessage error={getErrorMessage(error)} />;

  const renderedContent =
    !isPending && !trivia?.text ? (
      <ErrorMessage error="Sorry. Something went wrong." />
    ) : (
      <Typography>
        {isPending ? (
          <>
            <Skeleton />
            <Skeleton />
          </>
        ) : (
          trivia!.text
        )}
      </Typography>
    );

  return (
    <Paper {...paperPropsRest} sx={{ p: 2, aspectRatio: "unset", ...sx }}>
      <Typography component="h2" variant="h5" sx={{ mb: 1, color }}>
        Cuisine Trivia
      </Typography>
      {isError ? renderedError : renderedContent}
    </Paper>
  );
};
