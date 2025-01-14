import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Stack, Typography, useTheme } from "@mui/material";
import { getTimeStrFromMinutes } from "../../utils/helpers";

export const RecipeTime = ({ data }: { data: { readyInMinutes?: number } }) => {
  const theme = useTheme();
  const { readyInMinutes } = data;

  if (!readyInMinutes) return null;

  const timeStr = getTimeStrFromMinutes(readyInMinutes);

  return (
    <>
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
        <AccessTimeIcon />
        <Typography>
          It takes{" "}
          <span style={{ color: theme.palette.text.primary }}>{timeStr}</span>
        </Typography>
      </Stack>
    </>
  );
};
