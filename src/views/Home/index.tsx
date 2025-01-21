import Grid from "@mui/material/Grid2";
import { DishStats } from "../../components/DishStats";
import { HomeWelcome } from "../../components/HomeWelcome";
import { Trivia } from "../../components/Trivia";
import { TryNewRecipe } from "../../components/TryNewRecipe";

const HomePage = () => {
  const size = { xs: 12, md: 6, lg: 4 };

  return (
    <>
      <Grid container spacing={3} sx={{ my: 4 }}>
        <Grid size={12}>
          <HomeWelcome />
        </Grid>
        <Grid size={size}>
          <DishStats />
        </Grid>
        <Grid size={size}>
          <TryNewRecipe />
        </Grid>
        <Grid size={size}>
          <Trivia />
        </Grid>
      </Grid>
    </>
  );
};

export default HomePage;
