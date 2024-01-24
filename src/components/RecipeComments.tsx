import { useTranslation } from "react-i18next";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

interface RecipeCommentsProps {
    comments: string,
}

export function RecipeComments(props: RecipeCommentsProps) {
    const { comments } = props;
    const { t } = useTranslation();

    return (
        <Box sx={{ display: "flex", flexDirection: "column", p: 2 }}>
            <Grid container>
                <Grid item xs={0} md={4} />
                <Grid item xs={12} md={4}>

                    <List>
                        <ListItem sx={{ display: "flex", justifyContent: "center" }}>
                            <ListItemAvatar>
                                <Avatar
                                    src="/comments.png"
                                    variant="square" />
                            </ListItemAvatar>
                            <ListItemText sx={{ flexGrow: 0 }}>
                                <Typography
                                    variant="h4"
                                    component="h2"
                                    fontFamily={"Cookie-Regular"}
                                    alignSelf="center"
                                >
                                    {t("YourComments")}
                                </Typography>

                            </ListItemText>

                        </ListItem>
                        <Typography sx={{ p: 2 }} variant="body1" align="justify">
                            {comments}
                        </Typography>
                    </List>
                </Grid>
                <Grid item xs={0} md={4} />
            </Grid>
        </Box>
    );
}