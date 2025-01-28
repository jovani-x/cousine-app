import { Button, Stack, TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState } from "react";
import { Diets } from "../../constants/diets";
import { InputChangeType } from "../../types/forms";
import { SearchOpts } from "../../types/recipe";
import {
  fdataToNumber,
  getInitialStateFromEnum,
  getValuesFromFData,
} from "../../utils/helpers";
import { Checkboxes } from "./Checkboxes";
import { FormAccordion } from "./FormAccordion";

export const SearchForm = ({
  action,
}: {
  action: (props: SearchOpts) => void;
}) => {
  // checkboxes(MUI Checkbox) are controlled components
  // due to https://github.com/mui/material-ui/issues/40244
  const [diets, setDiets] = useState(
    getInitialStateFromEnum({ enumObj: Diets, initValue: false })
  );
  const [dietsExpanded, setDietsExpanded] = useState(false);

  const inputAttrs = {
    fullWidth: true,
    margin: "dense" as const,
    variant: "outlined" as const,
  };
  const caloriesSize = { xs: 6, sm: 3 };
  const buttonSx = { flexGrow: { xs: 1, md: 0 } };

  const handleDietChange = (event: InputChangeType) => {
    setDiets({ ...diets, [event.target.name]: event.target.checked });
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fdata = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries([...fdata.entries()]);

    const { query, minCalories, maxCalories, ...restData } = data;

    action({
      query: String(query),
      minCalories: fdataToNumber(minCalories),
      maxCalories: fdataToNumber(maxCalories),
      diets: getValuesFromFData({
        formData: restData,
        enumType: Diets,
        extraFn: (value: string) => {
          return value === "on" || value === "true";
        },
      }),
    });
  };

  const handleReset = () => {
    setDiets(getInitialStateFromEnum({ enumObj: Diets, initValue: false }));
    setDietsExpanded(false);
  };

  const renderedQuery = (
    <TextField {...inputAttrs} label="Search" name="query" />
  );

  const renderedMinCalories = (
    <TextField {...inputAttrs} label="Min Calories" name="minCalories" />
  );

  const renderedMaxCalories = (
    <TextField {...inputAttrs} label="Max Calories" name="maxCalories" />
  );

  const renderedDietCheckboxes = (
    <FormAccordion
      id="panel-diets"
      title="Diets"
      isExpanded={dietsExpanded}
      onChange={() => setDietsExpanded((prev) => !prev)}
    >
      <Checkboxes enumObj={Diets} state={diets} onChange={handleDietChange} />
    </FormAccordion>
  );

  const renderedSubmit = (
    <Button variant="contained" color="primary" sx={buttonSx} type="submit">
      Search
    </Button>
  );

  const renderedReset = (
    <Button variant="outlined" color="primary" sx={buttonSx} type="reset">
      Reset
    </Button>
  );

  return (
    <form id="search-form" onSubmit={handleSearch} onReset={handleReset}>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid size={{ xs: 12, sm: 6 }}>{renderedQuery}</Grid>
        <Grid size={caloriesSize}>{renderedMinCalories}</Grid>
        <Grid size={caloriesSize}>{renderedMaxCalories}</Grid>
        <Grid size={12}>{renderedDietCheckboxes}</Grid>
        <Grid size={12}>
          <Stack direction="row" spacing={2} justifyContent="center">
            {renderedSubmit}
            {renderedReset}
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
};
