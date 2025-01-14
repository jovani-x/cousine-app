import { Skeleton, useTheme } from "@mui/material";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { RecipeType } from "../../types/recipe";
import { getRecipeCalories } from "../../utils/recipe";
import { RecipeDetails } from "./RecipeDetails";
import { RecipeTime } from "./RecipeTime";

const RecipePreview = ({ data }: { data: RecipeType }) => {
  const [imageLoading, setImageLoading] = useState(true);
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
  const pathName = `recipe_${id}`;
  const theme = useTheme();
  const caloriesObj = getRecipeCalories(nutrition);

  const handleImageLoad = () => {
    setImageLoading(false);
  };

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

  const renderedImage = (
    <figure
      style={{
        position: "relative",
        flexGrow: 0,
        flexShrink: 0,
        width: "100%",
        aspectRatio: "300 / 180",
        margin: 0,
      }}
    >
      {imageLoading && (
        <Skeleton
          variant="rectangular"
          height="100%"
          sx={{ position: "absolute", inset: 0 }}
        />
      )}
      {image && (
        <CardMedia
          component="img"
          loading="lazy"
          image={image}
          height="100%"
          alt={`Recipe of ${title}`}
          sx={{
            position: "absolute",
            inset: 0,
            opacity: imageLoading ? 0 : 1,
          }}
          onLoad={handleImageLoad}
        />
      )}
    </figure>
  );

  return (
    <Card sx={{ minHeight: "100%", display: "flex" }}>
      <CardActionArea
        component={NavLink}
        to={`/collection/${pathName}`}
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {renderedImage}
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
