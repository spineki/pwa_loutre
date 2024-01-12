import { useTranslation } from "react-i18next";

import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box"
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

import { TimeRow } from "./TimeRow";
import { Time } from "../models/Recipe";
import Grid from "@mui/material/Grid";

interface RecipeRequirementsProps {
    ingredients: string[],
    time: Time
}

export function RecipeRequirements(props: RecipeRequirementsProps) {
    const { ingredients, time } = props;
    const { t } = useTranslation();

    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Grid container >
                <Grid item xs={0} md={4} />

                <Grid item xs={12} md={4}>
                    <List>

                        <ListItem sx={{ display: "flex", justifyContent: "center" }}>
                            <ListItemAvatar>
                                <Avatar
                                    src="/ingredients.png"
                                    variant="square" />
                            </ListItemAvatar>
                            <ListItemText sx={{ flexGrow: 0 }}>
                                <Typography
                                    variant="h4"
                                    component="h2"
                                    fontFamily={"Cookie-Regular"}
                                    alignSelf="center"
                                >
                                    {t("YourIngredients")}
                                </Typography>

                            </ListItemText>

                        </ListItem>

                        <ListItem>
                            <TimeRow time={time} />
                        </ListItem>

                        {
                            ingredients.map((ingredient, index) =>
                                <ListItem key={index}>
                                    <ListItemIcon sx={{ minWidth: 16 }}>
                                        <Badge badgeContent="" color="primary" variant="dot" />
                                    </ListItemIcon>

                                    <ListItemText>
                                        {ingredient}
                                    </ListItemText>
                                </ListItem>
                            )
                        }
                    </List>
                </Grid>
            </Grid>
            <Grid item xs={0} md={4} />
        </Box>
    );
}