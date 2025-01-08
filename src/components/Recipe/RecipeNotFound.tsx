import { Alert } from "@mui/material";

const RecipeNotFound = ({ text = "Recipe not found" }: { text?: string }) => {
  return (
    <Alert
      severity="warning"
      variant="outlined"
      sx={{ justifyContent: "center", my: 3 }}
    >
      {text}
    </Alert>
  );
};

export default RecipeNotFound;
