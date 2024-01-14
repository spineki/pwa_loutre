import { useContext, useEffect } from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

import { DrawerContext } from "../contexts/DrawerContext";
import Grid from "@mui/material/Grid";
import { useTranslation } from "react-i18next";
import Typography from "@mui/material/Typography";
import { Paper } from "@mui/material";

export const RouteChangelogsName = "changelogs";

export function Changelogs() {
    const { setCurrentRoute } = useContext(DrawerContext);

    const { t } = useTranslation();

    useEffect(() => {
        setCurrentRoute(RouteChangelogsName);
    }, [setCurrentRoute])

    return (
        <Paper sx={{ p: 2, flex: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                        {t("Changelogs")}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <List>
                        <ListItem disablePadding>
                            <ListItemText primary="A single recipe can now be shared" />
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemText primary="Steps and ingredients are now shown when clicking on a recipe card." />
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemText primary="Conversion button now works in top bar." />
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemText primary="Recipes can be added to favorites." />
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemText primary="Recipes can now be exported, saved and imported." />
                        </ListItem>
                    </List>
                </Grid>
            </Grid>
        </Paper>
    );
}