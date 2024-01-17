import { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";

import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import { DrawerContext } from "../contexts/DrawerContext";
import { RouteChangelogsName } from "../routes/routes";

export function Changelogs() {
    const { setCurrentRoute } = useContext(DrawerContext);

    const { t } = useTranslation();

    useEffect(() => {
        setCurrentRoute(RouteChangelogsName);
    }, [setCurrentRoute])

    return (
        <Paper sx={{ p: 2, flex: 1 }}>
            <Grid container>
                <Grid item xs={0} md={4} />
                <Grid item xs={12} md={4} >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                                {t("Changelogs")}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <List>
                                <ListItem disablePadding>
                                    <ListItemText primary="Quick access through search bar is now available." />
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemText primary="Ingredients and steps can now be edited." />
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemText primary="A single recipe can now be shared." />
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

                </Grid>
                <Grid item xs={0} md={4} />
            </Grid>
        </Paper>
    );
}