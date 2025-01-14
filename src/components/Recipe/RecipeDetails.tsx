import { useTheme } from "@mui/material";
import Stack from "@mui/material/Stack";
import { type RecipeDetailsType } from "../../types/recipe";
import { getCaloriesStr } from "../../utils/recipe";
import { Check } from "../Check";

const RecipeDetails = ({ data }: { data: RecipeDetailsType }) => {
  const { vegetarian, vegan, glutenFree, dairyFree, caloriesObj } = data;
  const caloriesStr = getCaloriesStr(caloriesObj);

  return (
    <Stack
      direction="row"
      spacing={1}
      useFlexGap
      divider={<>⋅</>}
      sx={{ flexWrap: "wrap" }}
    >
      <RecipeDetailsItem name={"Vegetarian"} value={vegetarian} />
      <RecipeDetailsItem name={"Vegan"} value={vegan} />
      <RecipeDetailsItem name={"Gluten free"} value={glutenFree} />
      <RecipeDetailsItem name={"Dairy free"} value={dairyFree} />
      <RecipeDetailsItem name={"Calories"} value={caloriesStr} />
    </Stack>
  );
};

const RecipeDetailsItem = ({
  name,
  value,
}: {
  name: string;
  value: boolean | string;
}) => {
  const theme = useTheme();

  return (
    <div>
      {name}:{" "}
      {typeof value === "boolean" ? (
        <Check value={value} />
      ) : (
        <span style={{ color: theme.palette.text.primary }}>{value}</span>
      )}
    </div>
  );
};

export { RecipeDetails, RecipeDetailsItem };
