import { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import { DrawerContext } from "../contexts/DrawerContext";
import { RouteWorkInProgressName } from "../routes/routes";

export function WorkInProgress() {
    const { setCurrentRoute } = useContext(DrawerContext);
    const { t } = useTranslation();
    useEffect(() => {
        setCurrentRoute(RouteWorkInProgressName);
    }, [setCurrentRoute]);

    return (
        <Paper style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-evenly", backgroundColor: "#5bd3e0" }}>
            <Typography variant="h1" component="h2" sx={{ fontFamily: "Cookie-Regular", fontSize: "3rem", textAlign: "center" }}>
                {t("WIP")}
            </Typography>

            <Grid container>
                <Grid item xs={0} md={4} />
                <Grid item xs={12} md={4}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <img src="/wip_placeholder.jpeg" alt="wip" style={{ width: "100%" }} />
                    </div>
                </Grid>
                <Grid item xs={0} md={4} />
            </Grid>
        </Paper>
    );
}