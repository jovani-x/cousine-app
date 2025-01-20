import { useTheme } from "@mui/material";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";
import { RoutePath } from "../../router";
import { RecipeType } from "../../types/recipe";
import { getRecipeCalories } from "../../utils/recipe";
import { RecipeDetails } from "./RecipeDetails";
import { RecipeImage } from "./RecipeImage";
import { RecipeTime } from "./RecipeTime";

const RecipePreview = ({ data }: { data: RecipeType }) => {
  const {
    id,
    title,
    image,
    readyInMinutes,
    vegetarian,
    vegan,
    glutenFree,
    dairyFree,
    nutrition,
  } = data;
  const pathName = `recipe_${id}_${title}`;
  const theme = useTheme();
  const caloriesObj = getRecipeCalories(nutrition);

  const renderedTitle = (
    <Typography
      variant="h6"
      component="h3"
      sx={{
        mb: 1,
        color: `primary.${theme.palette.mode}`,
        flexGrow: 1,
      }}
    >
      {title}
    </Typography>
  );

  const renderedSubheader = (
    <>
      <RecipeDetails
        data={{ vegetarian, vegan, glutenFree, dairyFree, caloriesObj }}
      />
      <RecipeTime data={{ readyInMinutes }} />
    </>
  );

  return (
    <Card sx={{ display: "flex" }}>
      <CardActionArea
        component={NavLink}
        to={`${RoutePath.Collection}/${pathName}`}
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <RecipeImage
          imageUrl={image ?? undefined}
          title={`Recipe of ${title}`}
        />
        <CardHeader
          title={renderedTitle}
          subheader={renderedSubheader}
          sx={{
            flexGrow: 1,
            flexShrink: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            "& .MuiCardHeader-content": {
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
            },
          }}
        />
      </CardActionArea>
    </Card>
  );
};

export default RecipePreview;
