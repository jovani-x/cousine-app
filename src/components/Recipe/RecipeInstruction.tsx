import { Typography, useTheme } from "@mui/material";
import { AnalyzeRecipeInstructions200ResponseParsedInstructionsInnerStepsInner } from "../../models/AnalyzeRecipeInstructions200ResponseParsedInstructionsInnerStepsInner";
import { List } from "../List";
import RecipeNotFound from "./RecipeNotFound";

export const RecipeInstruction = ({
  steps,
}: {
  steps: Set<AnalyzeRecipeInstructions200ResponseParsedInstructionsInnerStepsInner>;
}) => {
  const stepsArr = Array.from(steps);
  // if no data - show warning
  if (!stepsArr?.length) return <RecipeNotFound text="No data" />;

  const theme = useTheme();
  const items = stepsArr.map(({ number, step }) => ({
    id: String(number),
    content: step,
  }));

  // if recipe has all steps in one record
  // show it as a paragraph
  // otherwise show it as a list
  const renderedInstructions =
    stepsArr.length > 1 ? (
      <List items={items} isOL={true} />
    ) : (
      <Typography component="p">{stepsArr[0].step}</Typography>
    );

  return (
    <>
      <Typography
        variant="h5"
        component="h2"
        sx={{ color: theme.palette.primary[theme.palette.mode], mb: 1 }}
      >
        Instructions:
      </Typography>
      {renderedInstructions}
    </>
  );
};
