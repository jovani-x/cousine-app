import {
  CardActions,
  CardContent,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import { RecipeType } from "../../types/recipe";
import { getRecipeCalories } from "../../utils/recipe";
import { RecipeDetails } from "./RecipeDetails";
import { RecipeImage } from "./RecipeImage";
import { RecipeIngredients } from "./RecipeIngredients";
import { RecipeInstruction } from "./RecipeInstruction";
import RecipeNotFound from "./RecipeNotFound";
import { RecipeSource } from "./RecipeSource";
import { RecipeTime } from "./RecipeTime";

const RecipeFull = ({
  data,
  loading,
}: {
  data?: RecipeType;
  loading?: boolean;
}) => {
  if (!data && !loading) return <RecipeNotFound />;

  const {
    title,
    image,
    readyInMinutes,
    servings,
    extendedIngredients,
    analyzedInstructions,
    vegetarian,
    vegan,
    glutenFree,
    dairyFree,
    nutrition,
    sourceName,
    sourceUrl,
  } = data || {};
  const caloriesObj = getRecipeCalories(nutrition);
  const theme = useTheme();
  const fromMd = useMediaQuery(theme.breakpoints.up("md"));

  const cardStyles = {
    mb: 3,
    display: fromMd ? "grid" : "",
    gridTemplateColumns: fromMd ? "repeat(2, 1fr)" : "",
  };

  const imgStyles = {
    placeSelf: fromMd ? "stretch" : "",
  };

  const headerStyles = {
    color: theme.palette.primary[theme.palette.mode],
    gridColumn: fromMd ? "1 / 3" : "",
  };

  const sideStyles = {
    alignItems: fromMd ? "stretch" : "",
    pl: fromMd ? 3 : "",
    pb: fromMd ? "" : 0,
  };

  const contentStyles = {
    gridColumn: fromMd ? "1 / 3" : "",
  };

  const ingredientsArr = extendedIngredients
    ? Array.from(extendedIngredients)
    : undefined;

  const renderedTitle = (
    <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
      {!data || loading ? <Skeleton /> : data.title}
    </Typography>
  );

  const renderedSubheader = (
    <>
      <RecipeDetails
        data={{
          vegetarian,
          vegan,
          glutenFree,
          dairyFree,
          caloriesObj,
          servings,
        }}
      />
      <RecipeTime data={{ readyInMinutes }} />
    </>
  );

  return (
    <Card sx={cardStyles}>
      <CardHeader
        sx={headerStyles}
        title={renderedTitle}
        subheader={renderedSubheader}
      />
      <RecipeImage
        wrapStyles={imgStyles}
        imageUrl={image ?? undefined}
        title={`Recipe of ${title}`}
      />
      <CardContent sx={sideStyles}>
        {!!ingredientsArr?.length && (
          <RecipeIngredients data={ingredientsArr} />
        )}
      </CardContent>
      <CardContent sx={contentStyles}>
        {!!analyzedInstructions?.[0]?.steps && (
          <RecipeInstruction steps={analyzedInstructions?.[0]?.steps} />
        )}
      </CardContent>
      {sourceName && sourceUrl && (
        <CardActions sx={{ px: 2 }}>
          <RecipeSource
            textBefore={`Original: `}
            sourceName={sourceName}
            sourceUrl={sourceUrl}
          />
        </CardActions>
      )}
    </Card>
  );
};

export default RecipeFull;
