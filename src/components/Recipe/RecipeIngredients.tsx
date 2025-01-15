import { Typography, useTheme } from "@mui/material";
import { RecipeInformationExtendedIngredientsInner } from "../../models/RecipeInformationExtendedIngredientsInner";
import { List } from "../List";

export const RecipeIngredients = ({
  data,
}: {
  data: RecipeInformationExtendedIngredientsInner[];
}) => {
  const theme = useTheme();
  const items = data.map((el) => {
    const { id, original } = el;
    return { id: String(id), content: original };
  });

  return (
    <>
      <Typography
        variant="h5"
        component="h2"
        sx={{ color: theme.palette.primary[theme.palette.mode], mb: 1 }}
      >
        You need:
      </Typography>
      <List items={items} />
    </>
  );
};
