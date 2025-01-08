import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardHeader from "@mui/material/CardHeader";
import { NavLink } from "react-router-dom";
import { RecipeType } from "../../types/recipe";

const RecipePreview = ({ data }: { data: RecipeType }) => {
  return (
    <Card>
      <CardActionArea
        component={NavLink}
        to={`/collection/${data.id}`}
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardHeader title="RecipePreview Component" />
      </CardActionArea>
    </Card>
  );
};

export default RecipePreview;
