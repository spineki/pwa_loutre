import { useTranslation } from "react-i18next";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

export function NotFound() {
  const { t } = useTranslation();

  return (
    <Paper
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        backgroundColor: "#fef0c1",
      }}
    >
      <Typography
        variant="h1"
        component="h2"
        sx={{
          fontFamily: "Cookie-Regular",
          fontSize: "3rem",
          textAlign: "center",
          color: "black",
        }}
      >
        {t("PageNotFound")}
      </Typography>

      <Grid container>
        <Grid item xs={0} md={4} />
        <Grid item xs={12} md={4}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src="/not_found.jpg" alt="wip" style={{ width: "100%" }} />
          </div>
        </Grid>
        <Grid item xs={0} md={4} />
      </Grid>
    </Paper>
  );
}
