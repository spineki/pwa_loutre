import { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { DrawerContext } from "../contexts/DrawerContext";

export const RouteWorkInProgressName = "work-in-progress";

export function WorkInProgress() {
    const { setCurrentRoute } = useContext(DrawerContext);
    const { t } = useTranslation();
    useEffect(() => {
        setCurrentRoute(RouteWorkInProgressName);
    }, [setCurrentRoute])

    return (
        <Paper style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-evenly", backgroundColor: "#60d6e2" }}>
            <Typography variant="h1" component="h2" sx={{ fontFamily: "Cookie-Regular", fontSize: "3rem", textAlign: "center" }}>
                {t("WIP")}
            </Typography>
            <div style={{ display: "flex", alignItems: "center" }}>
                <img src="/wip_placeholder.jpeg" alt="wip" style={{ width: "100%" }} />
            </div>
        </Paper>
    );
}