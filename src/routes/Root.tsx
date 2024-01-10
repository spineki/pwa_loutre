import { useContext, useEffect } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import InfiniteScroll from "react-infinite-scroll-component";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { DrawerContext } from "../contexts/drawer_context";
import { RecipeCard } from "../components/RecipeCard";
import { database } from "../models/database"
import CircularProgress from "@mui/material/CircularProgress";

export const RouteRootName = "Root";

export function Root() {
    const { setCurrentRoute } = useContext(DrawerContext);
    useEffect(() => {
        setCurrentRoute(RouteRootName);
    }, [setCurrentRoute])

    // todo: implement proper pagination to only load a subset into memory
    const recipes = useLiveQuery(
        async () => {
            const recipes = await database.recipes
                // .where('age')
                // .between(minAge, maxAge)
                .toArray();

            // Return result
            return recipes;
        },
        // specify vars that affect query:
        [] // dependencies
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
                        hasMore={true} // Replace with a condition based on your data source
                        loader={<p>Loading...</p>}
                        endMessage={<p>No more data to load.</p>}
                    >
                        <Box sx={{ flexGrow: 1 }}>
                            <Grid container spacing={2} columns={{ xs: 2, sm: 4, md: 6 }}>
                                {recipes.map((item, index) => (
                                    <Grid item xs={1} sx={{ aspectRatio: "1/1" }}>
                                        {/* @ts-ignore */}
                                        <RecipeCard key={index} isFavorite={item.isFavorite} name={item.name} picture={item.pictures[0]} time={item.time} />
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