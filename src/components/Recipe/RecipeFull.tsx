import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {
  Button,
  CardActions,
  CardContent,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { RecipeType } from "../../types/recipe";
import { getErrorMessage } from "../../utils/helpers";
import {
  addRecipeId,
  addUserRecipeId,
  getRecipeCalories,
  isIncluded,
} from "../../utils/recipe";
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
  const theme = useTheme();
  const fromMd = useMediaQuery(theme.breakpoints.up("md"));
  const fromSm = useMediaQuery(theme.breakpoints.up("sm"));
  const [isAdded, setIdAdded] = useState(true);

  // check if user collection includes provided recipe
  useEffect(() => {
    const fetchData = async () => {
      if (data) {
        try {
          if (!(await isIncluded({ recipeId: String(data.id) }))) {
            setIdAdded(false);
          }
        } catch (err) {
          console.log(getErrorMessage(err));
        }
      }
    };
    fetchData();
  }, [data]);

  if (!data && !loading) return <RecipeNotFound />;

  const {
    id,
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

  const cardStyles = {
    mb: 3,
    display: fromMd ? "grid" : "",
    gridTemplateColumns: fromMd ? "repeat(2, 50%)" : "",
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

  // add recipe to user collection
  const handleAddRecipe = async () => {
    setIdAdded(true);
    try {
      await addUserRecipeId({ recipeId: String(id) });
      await addRecipeId({ recipeId: String(id) });
    } catch (err) {
      setIdAdded(false);
      console.log(getErrorMessage(err));
    }
  };

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

  const renderedActionButtons = (
    <Stack
      direction="row"
      spacing={2}
      style={{ marginLeft: fromSm ? "auto" : "unset" }}
    >
      {!isAdded && (
        <Button
          variant="outlined"
          endIcon={<FavoriteBorderIcon />}
          onClick={handleAddRecipe}
        >
          Add to Collection
        </Button>
      )}
      {!!isAdded && <FavoriteIcon color="primary" />}
    </Stack>
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
      {!!sourceName && !!sourceUrl && (
        <CardActions
          sx={{
            px: 2,
            pb: 2,
            gridColumn: fromMd ? "1 / 3" : "",
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          <RecipeSource
            textBefore={`Original: `}
            sourceName={sourceName}
            sourceUrl={sourceUrl}
          />
          {renderedActionButtons}
        </CardActions>
      )}
    </Card>
  );
};

export default RecipeFull;
