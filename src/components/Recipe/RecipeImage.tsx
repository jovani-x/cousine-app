import { CardMedia, Skeleton } from "@mui/material";
import { useState } from "react";

const RecipeImage = ({
  imageUrl,
  title = "",
  wrapStyles,
}: {
  imageUrl?: string;
  title?: string;
  wrapStyles?: React.CSSProperties;
}) => {
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const wrapperStyles: React.CSSProperties = {
    position: "relative",
    flexGrow: 0,
    flexShrink: 0,
    width: "100%",
    aspectRatio: "300 / 180",
    margin: 0,
    ...wrapStyles,
  };

  return (
    <figure style={wrapperStyles}>
      {(imageLoading || !imageUrl) && (
        <Skeleton
          variant="rectangular"
          height="100%"
          sx={{ position: "absolute", inset: 0 }}
        />
      )}
      {imageUrl && (
        <CardMedia
          component="img"
          loading="lazy"
          image={imageUrl}
          width="100%"
          height="100%"
          alt={title}
          sx={{
            opacity: imageLoading ? 0 : 1,
          }}
          onLoad={handleImageLoad}
        />
      )}
    </figure>
  );
};

export { RecipeImage };
