import { Paper, Skeleton, Typography, useTheme } from "@mui/material";
import { useGetTrivia } from "../../hooks/useGetTrivia";
import { getErrorMessage } from "../../utils/helpers";
import ErrorMessage from "../ErrorMessage";

export const Trivia = () => {
  const theme = useTheme();
  const { trivia, isError, error, isPending } = useGetTrivia();

  return (
    <Paper sx={{ p: 2, aspectRatio: "unset" }}>
      <Typography
        component="h2"
        variant="h5"
        sx={{ mb: 1, color: theme.palette.primary[theme.palette.mode] }}
      >
        Cuisine Trivia
      </Typography>
      {isError ? (
        <ErrorMessage error={getErrorMessage(error)} />
      ) : !isPending && !trivia?.text ? (
        <ErrorMessage error="Sorry. Something went wrong." />
      ) : (
        <Typography component="p">
          {isPending ? (
            <>
              <Skeleton />
              <Skeleton />
            </>
          ) : (
            trivia!.text
          )}
        </Typography>
      )}
    </Paper>
  );
};
