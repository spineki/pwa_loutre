import { useLiveQuery } from "dexie-react-hooks";
import { useContext } from "react";

import { ThemeProvider } from "@mui/material";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import { ColorModeContext } from "../contexts/ColormodeContext";
import { getTagsByIds } from "../database/controllers/tagController";
import { Time } from "../database/models/Recipe";
import { Tag } from "../database/models/Tag";
import { TimeRow } from "./TimeRow";

interface Props {
    name: string,
    time: Time,
    picture?: string,
    tagIds: number[],
}

export function RecipePreview(props: Props) {

    const { name, time, picture, tagIds } = props;

    const { getTheme } = useContext(ColorModeContext);

    const tags = useLiveQuery(async () => {
        const tags =
            (await getTagsByIds(tagIds))
                .filter((tag): tag is Tag => tag !== undefined);
        return tags;
    });


    // using dark mode in any case to make sure the text is always visible on the linear gradient
    return (
        <ThemeProvider theme={getTheme("dark")}>
            <Paper sx={{ flex: 1 }}>
                <Grid container sx={{ height: "100%" }}>
                    <Grid item xs={0} md={4} />

                    <Grid item xs={12} md={4}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "start",
                            justifyContent: "end",
                            p: 2,
                            paddingBottom: 1,
                            height: "100%",
                            width: "100%",

                            backgroundImage: `
                        linear-gradient(0deg, rgba(42,42,42,0.65) 0%, rgba(42,42,42,0.65) 35%, rgba(255,255,255,0) 55%),
                        url(${picture ?? "/tutorial_picture.png"})
                    `,
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                        }}
                    >
                        <Typography
                            variant="h3"
                            component="div"
                            sx={{
                                fontFamily: "Cookie-Regular",
                                paddingTop: 0,
                                paddingBottom: 0,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                textShadow: "0 2px 3px rgba(0, 0, 0, 0.3)",
                                p: 0,
                            }}>
                            {name}
                        </Typography>

                        {
                            tags &&
                            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                                {
                                    tags.map(tag =>
                                        <Chip key={tag.name} label={tag.name} />
                                    )
                                }
                            </Box>
                        }

                        <Box>
                            <TimeRow time={time} />
                        </Box>
                    </Grid>
                    <Grid item xs={0} md={4} />
                </Grid>
            </Paper>
        </ThemeProvider >
    );

}