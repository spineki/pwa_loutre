import { useLiveQuery } from "dexie-react-hooks";
import { useContext, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link, useSearchParams } from "react-router-dom";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Fab from "@mui/material/Fab";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import AddIcon from '@mui/icons-material/Add';

import { RecipeCard } from "../components/RecipeCard";
import { DrawerContext } from "../contexts/DrawerContext";
import { getAllRecipes } from "../database/controllers/recipeController";
import { getTagByName } from "../database/controllers/tagController";
import { database } from "../database/database";
import { RouteAllRecipesName, RouteCreateRecipeName } from "../routes/routes";


export function AllRecipes() {
    const { setCurrentRoute } = useContext(DrawerContext);
    useEffect(() => {
        setCurrentRoute(RouteAllRecipesName);
    }, [setCurrentRoute]);

    // using url as a source to know which filters to apply to grid
    const [searchParams,] = useSearchParams();

    // todo: implement proper pagination to only load a subset into memory
    const recipes = useLiveQuery(
        async () => {

            // if we are currently filtering recipes by name, only showing those containing a name that contains this string
            if (searchParams.has("recipe-name")) {
                const searchedRecipeName = searchParams.get("recipe-name")!.trim().toLowerCase();
                // if search is empty, returning all recipes
                // todo! add pagination to this
                if (searchedRecipeName == "") {
                    return await getAllRecipes();
                }

                const recipes = await database.recipes
                    .orderBy("name")
                    .filter(recipe => recipe.name.toLowerCase().includes(searchedRecipeName))
                    .toArray();
                return recipes;
            }

            if (searchParams.has("tag-name")) {
                const searchedTagName = searchParams.get("tag-name")!.trim().toLowerCase();
                // if search is empty, returning all recipes
                // todo! add pagination to this
                if (searchedTagName == "") {
                    return await getAllRecipes();
                }

                const searchedTagId =
                    (await getTagByName(searchedTagName)
                    )?.id;

                if (searchedTagId == null) {
                    return await getAllRecipes();
                }

                const recipes = (
                    await database.recipes
                        .orderBy("name")
                        .filter(recipe => {
                            let matchFound = false;

                            for (const recipeTagId of recipe.tagIds) {
                                if (recipeTagId === searchedTagId) {
                                    matchFound = true;
                                    break;
                                }
                            }

                            return matchFound;
                        })
                        .toArray()
                );

                return recipes;
            }

            // if we are currently filtering recipes by tag, only showing those that contains exactly this tag

            // if no filter is given, defaulting to returning all recipes
            // todo! add pagination to this
            return await getAllRecipes();
        },
        // specify vars that affect query:
        [searchParams] // dependencies
    );

    function fetchData() {
        console.log("called", "test");
    }

    return (
        <Paper sx={{
            flex: 1,
            p: 2
        }}>
            {
                recipes ?
                    <InfiniteScroll
                        dataLength={recipes.length}
                        next={fetchData}
                        hasMore={true} // Replace with a condition based on your data source
                        loader={<p>Loading...(currently {recipes.length} recipes)</p>}
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
            <Fab
                component={Link}
                to={RouteCreateRecipeName}
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
