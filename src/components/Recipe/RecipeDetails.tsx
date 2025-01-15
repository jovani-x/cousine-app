import { useTheme } from "@mui/material";
import Stack from "@mui/material/Stack";
import { type RecipeDetailsType } from "../../types/recipe";
import { getCaloriesStr } from "../../utils/recipe";
import { Check } from "../Check";

const RecipeDetails = ({ data }: { data: RecipeDetailsType }) => {
  const { vegetarian, vegan, glutenFree, dairyFree, caloriesObj, servings } =
    data;
  const caloriesStr = getCaloriesStr(caloriesObj);
  const strNA = "N/A";

  return (
    <Stack
      direction="row"
      spacing={1}
      useFlexGap
      divider={<>⋅</>}
      sx={{ flexWrap: "wrap" }}
    >
      <RecipeDetailsItem name={"Vegetarian"} value={vegetarian ?? strNA} />
      <RecipeDetailsItem name={"Vegan"} value={vegan ?? strNA} />
      <RecipeDetailsItem name={"Gluten free"} value={glutenFree ?? strNA} />
      <RecipeDetailsItem name={"Dairy free"} value={dairyFree ?? strNA} />
      <RecipeDetailsItem name={"Calories"} value={caloriesStr ?? strNA} />
      {servings && <RecipeDetailsItem name={"Portion(s)"} value={servings} />}
    </Stack>
  );
};

const RecipeDetailsItem = ({
  name,
  value,
}: {
  name: string;
  value: boolean | string | number;
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
