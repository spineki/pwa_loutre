import { useContext, useEffect } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import InfiniteScroll from "react-infinite-scroll-component";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { DrawerContext } from "../contexts/DrawerContext";
import { RecipeCard } from "../components/RecipeCard";
import CircularProgress from "@mui/material/CircularProgress";
import { database } from "../models/database";

export const RouteFavoriteRecipesName = "favorites";

export function FavoriteRecipes() {
    const { setCurrentRoute } = useContext(DrawerContext);
    useEffect(() => {
        setCurrentRoute(RouteFavoriteRecipesName);
    }, [setCurrentRoute])

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

    function fetchData() {
        console.log("called", "test");
    }

    return (
        <Paper sx={{
            height: "100%",
            p: 2
        }}>
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
                                            picture={recipe.pictures[0]}
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