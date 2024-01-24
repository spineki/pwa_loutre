import { useLiveQuery } from "dexie-react-hooks";
import { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroll-component";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import { RecipeCard } from "../components/RecipeCard";
import { TagChip } from "../components/TagChip";
import { DrawerContext } from "../contexts/DrawerContext";
import { database } from "../database/database";
import { RouteFavoriteRecipesName } from "../routes/routes";


export function FavoriteRecipes() {
    const { t } = useTranslation();
    const { setCurrentRoute } = useContext(DrawerContext);
    useEffect(() => {
        setCurrentRoute(RouteFavoriteRecipesName);
    }, [setCurrentRoute]);

    // todo: implement proper pagination to only load a subset into memory
    const recipes = useLiveQuery(
        async () => {
            const recipes = await database.recipes
                .orderBy("name")
                .filter(recipe => recipe.isFavorite)
                .toArray();
            return recipes;
        },
        []
    );
    const tags = useLiveQuery(
        async () => {
            const tags = await database.tags
                .orderBy("name")
                .filter(tag => tag.isFavorite)
                .toArray();
            return tags;
        },
        []
    );

    function fetchData() {
        console.log("called", "test");
    }

    return (
        <Paper sx={{
            flex: 1,
            p: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            gap: 2
        }}>
            <Typography variant={"h4"} fontFamily={"Cookie-Regular"} sx={{ alignSelf: "center" }} >
                {t("FavoriteTags")}
            </Typography>
            {
                tags ?
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                        {tags.map(tag => <TagChip key={tag.id!} tag={tag} />)}
                    </Box>
                    :
                    <CircularProgress />
            }
            <Typography variant={"h4"} fontFamily={"Cookie-Regular"} sx={{ alignSelf: "center" }} >
                {t("FavoriteRecipes")}
            </Typography>
            {
                recipes ?
                    <InfiniteScroll
                        dataLength={recipes.length}
                        next={fetchData}
                        hasMore={false} // todo: implement proper pagination
                        loader={<p>Loading...</p>}
                        endMessage={<p>No more data to load.</p>}
                    >
                        <Box sx={{ flexGrow: 1 }}>
                            <Grid container spacing={2} columns={{ xs: 2, sm: 4, md: 6 }}>
                                {recipes.map(recipe => (
                                    <Grid key={recipe.id!} item xs={1} sx={{ aspectRatio: "1/1" }}>
                                        <RecipeCard
                                            // A recipe has an id, asserting it for ts
                                            id={recipe.id!}
                                            isFavorite={recipe.isFavorite}
                                            name={recipe.name}
                                            picture={recipe.pictures.length > 0 ? URL.createObjectURL(recipe.pictures[0]) : undefined}
                                            time={recipe.time}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </InfiniteScroll>
                    :
                    <CircularProgress />
            }
        </Paper>
    );
}