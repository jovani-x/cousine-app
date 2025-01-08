import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid2";

const NoData = ({ text = "No data" }: { text?: string }) => {
  return (
    <Grid size={12}>
      <Alert
        severity="warning"
        variant="outlined"
        sx={{ justifyContent: "center" }}
      >
        {text}
      </Alert>
    </Grid>
  );
};

export default NoData;
