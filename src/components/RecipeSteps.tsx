import { useTranslation } from "react-i18next";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box"
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
// import { useTheme } from "@mui/material/styles";

interface RecipeStepsProps {
    steps: string[],
}

export function RecipeSteps(props: RecipeStepsProps) {
    const { steps } = props;
    const { t } = useTranslation();
    // const theme = useTheme();

    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Grid container>
                <Grid item xs={0} md={4} />
                <Grid item xs={12} md={4}>

                    <List>
                        <ListItem sx={{ display: "flex", justifyContent: "center", paddingLeft: 0 }}>
                            <ListItemAvatar>
                                <Avatar
                                    src="/cooking_book.png"
                                    variant="square" />
                            </ListItemAvatar>
                            <ListItemText sx={{ flexGrow: 0 }}>
                                <Typography
                                    variant="h4"
                                    component="h2"
                                    fontFamily={"Cookie-Regular"}
                                    alignSelf="center"
                                >
                                    {t("YourRecipe")}
                                </Typography>

                            </ListItemText>

                        </ListItem>

                        {
                            steps.map((step, index) =>
                                <ListItem key={index} alignItems="flex-start" sx={{ p: 0, alignItems: "stretch" }}>
                                    <ListItemIcon sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        minWidth: 0,
                                        m: 0
                                    }}>
                                        <Chip
                                            label={index + 1}
                                            color="primary"
                                            variant="filled"
                                            size="small"
                                        />
                                        {/* vertical bar */}
                                        <div
                                            style={{
                                                width: 2,
                                                background: "#cecfc9",
                                                height: "100%",
                                                marginTop: 4,
                                                marginBottom: 4,
                                            }}
                                        />
                                    </ListItemIcon>

                                    <ListItemText>
                                        <Paper
                                            elevation={2}
                                            sx={{
                                                marginLeft: 2,
                                                p: 1,
                                                marginBottom: 1
                                            }}
                                        >
                                            {step}
                                        </Paper>
                                    </ListItemText>
                                </ListItem>
                            )
                        }
                        <ListItem alignItems="flex-start" sx={{ p: 0, alignItems: "stretch" }}>
                            <ListItemIcon sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                minWidth: 0,
                                m: 0
                            }}>
                                <Chip
                                    label={0}
                                    color="primary"
                                    size="small"
                                    sx={{ color: "transparent" }}
                                />
                            </ListItemIcon>
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xs={0} md={4} />
            </Grid>
        </Box >
    );
}