import { useContext, useEffect } from "react";

import Paper from "@mui/material/Paper";

import { DrawerContext } from "../contexts/drawer_context";
import { RecipeCard } from "../components/RecipeCard";
import { fakeRecipes } from "../fixtures";
import InfiniteScroll from "react-infinite-scroll-component";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

export const RouteRootName = "Root";


export function Root() {
    const { setCurrentRoute } = useContext(DrawerContext);
    useEffect(() => {
        setCurrentRoute(RouteRootName);
    }, [setCurrentRoute])


    function fetchData() {
        console.log("called", "test");
    }

    return (
        <Paper sx={{
            height: "100%",
            p: 2
        }}>
            <InfiniteScroll
                dataLength={fakeRecipes.length}
                next={fetchData}
                hasMore={true} // Replace with a condition based on your data source
                loader={<p>Loading...</p>}
                endMessage={<p>No more data to load.</p>}
            >
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2} columns={{ xs: 2, sm: 4, md: 6 }}>
                        {fakeRecipes.map((item, index) => (
                            <Grid item xs={1} sx={{ aspectRatio: "1/1" }}>
                                <RecipeCard key={index} isFavorite={item.isFavorite} name={item.name} picture={item.pictures[0]} time={item.time} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </InfiniteScroll>
        </Paper>
    );
}