import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Skeleton from "@mui/material/Skeleton";
import { RecipeType } from "../../types/recipe";
import RecipeNotFound from "./RecipeNotFound";

const RecipeFull = ({
  data,
  loading,
}: {
  data?: RecipeType;
  loading?: boolean;
}) => {
  if (!data && !loading) return <RecipeNotFound />;

  const title =
    !data || loading ? <Skeleton /> : `RecipeFull Component id=${data.id}`;

  return (
    <Card sx={{ mb: 3 }}>
      <CardHeader title={title} />
    </Card>
  );
};

export default RecipeFull;
