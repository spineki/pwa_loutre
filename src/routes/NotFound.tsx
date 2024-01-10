import { Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { useTranslation } from "react-i18next";

export function NotFound() {
    const { t } = useTranslation();

    return (
        <Paper style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-evenly", backgroundColor: "#fef0c1" }}>
            <Typography variant="h1" component="h2" sx={{ fontFamily: "Cookie-Regular", fontSize: "3rem", textAlign: "center", color: "black" }}>
                {t("PageNotFound")}
            </Typography>
            <div style={{ display: "flex", alignItems: "center" }}>
                <img src="/not_found.jpg" alt="wip" style={{ width: "100%" }} />
            </div>
        </Paper>
    );
}