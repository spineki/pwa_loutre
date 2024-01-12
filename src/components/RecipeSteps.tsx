import { useTranslation } from "react-i18next";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box"
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";

interface RecipeStepsProps {
    steps: string[],
}

export function RecipeSteps(props: RecipeStepsProps) {
    const { steps } = props;
    const { t } = useTranslation();
    const theme = useTheme();

    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Grid container>
                <Grid item xs={0} md={4} />
                <Grid item xs={12} md={4}>

                    <List>
                        <ListItem sx={{ display: "flex", justifyContent: "center" }}>
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
                                <ListItem key={index} alignItems="flex-start">
                                    <ListItemIcon sx={{ minWidth: 32 }}>
                                        <Avatar sx={{
                                            width: 8,
                                            height: 8,
                                            p: 1,
                                            fontSize: 12,
                                            color: theme.palette.secondary.light,
                                            bgcolor: theme.palette.secondary.dark
                                        }}  >
                                            {index}
                                        </Avatar>

                                    </ListItemIcon>

                                    <ListItemText>
                                        {step}
                                    </ListItemText>
                                </ListItem>
                            )
                        }
                    </List>
                </Grid>
                <Grid item xs={0} md={4} />
            </Grid>
        </Box>
    );
}