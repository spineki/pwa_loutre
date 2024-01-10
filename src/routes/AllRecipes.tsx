import { useCallback, useContext, useEffect } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import InfiniteScroll from "react-infinite-scroll-component";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Fab from "@mui/material/Fab";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import AddIcon from '@mui/icons-material/Add';

import { DrawerContext } from "../contexts/drawer_context";
import { RecipeCard } from "../components/RecipeCard";
import { database } from "../models/database"

export const RouteAllRecipesName = "list";

export function AllRecipes() {
    const { setCurrentRoute } = useContext(DrawerContext);
    useEffect(() => {
        setCurrentRoute(RouteAllRecipesName);
    }, [setCurrentRoute])

    // todo: implement proper pagination to only load a subset into memory
    const recipes = useLiveQuery(
        async () => {
            const recipes = await database.recipes
                .orderBy("name")
                .toArray();
            return recipes;
        },
        // specify vars that affect query:
        [] // dependencies
    );

    function fetchData() {
        console.log("called", "test");
    }

    const handleFabClicked = useCallback(() => {
        alert("fab");
    }, [])

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
                        hasMore={true} // Replace with a condition based on your data source
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
            <Fab
                onClick={() => handleFabClicked()}
                size="medium"
                color="secondary"
                sx={{
                    position: "fixed",
                    bottom: 16,
                    right: 16,
                }}>
                <AddIcon />
            </Fab>
        </Paper>
    );
}