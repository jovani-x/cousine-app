import { useTheme } from "@mui/material";
import { Chart, registerables } from "chart.js";
import autocolors from "chartjs-plugin-autocolors";
import { Pie } from "react-chartjs-2";
import { MealTypes } from "../../constants/meal-types";
import { RecipeType } from "../../types/recipe";

Chart.register(...registerables);
Chart.register(autocolors);

// show number of dish types in collection
export const RecipeTypeChart = ({
  collection,
}: {
  collection: RecipeType[];
}) => {
  const dishTypes = collection.reduce((acc, cur) => {
    const { dishTypes } = cur;

    dishTypes.forEach((item) => {
      // get names from MealTypes only
      const ix = Object.values(MealTypes).indexOf(item as MealTypes);
      if (ix >= 0) {
        acc[item] = acc[item] ? acc[item] + 1 : 1;
      }
    });
    return acc;
  }, {} as { [key: string]: number });

  const theme = useTheme();
  const options = {
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          boxWidth: Chart.defaults.font.size,
          color: theme.palette.text.primary,
          font: {
            family: theme.typography.body1.fontFamily,
          },
        },
      },
      title: {
        display: false,
      },
      autocolors: {
        mode: "data" as const,
      },
    },
    borderWidth: 0,
    responsive: true,
    aspectRatio: 1,
    resizeDelay: 100,
  };

  const data = {
    labels: Object.keys(dishTypes),
    datasets: [
      {
        label: " ",
        data: Object.values(dishTypes),
      },
    ],
  };

  return (
    <Pie
      data={data}
      options={options}
      style={{ minWidth: "100%", height: "" }}
    />
  );
};
