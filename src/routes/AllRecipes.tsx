import { useLiveQuery } from "dexie-react-hooks";
import { useContext, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Paper from "@mui/material/Paper";

import "react-virtualized/styles.css";
import { RecipeList } from "../components/RecipeList";
import { DrawerContext } from "../contexts/DrawerContext";
import { getTagByName } from "../database/controllers/tagController";
import { Recipe } from "../database/models/Recipe";
import { useCountRender } from "../hooks/useCountRenders";
import { RouteAllRecipesName, RouteCreateRecipeName } from "../routes/routes";

export function AllRecipes() {
  const { setCurrentRoute } = useContext(DrawerContext);

  useEffect(() => {
    setCurrentRoute(RouteAllRecipesName);
  }, [setCurrentRoute]);

  // using url as a source to know which filters to apply to grid
  const [searchParams] = useSearchParams();

  const filterFunction: (recipe: Recipe) => boolean =
    useLiveQuery(async () => {
      // if we are currently filtering recipes by name, only showing those containing a name that contains this string
      console.log(searchParams);

      if (searchParams.has("recipe-name")) {
        const searchedRecipeName = searchParams
          .get("recipe-name")!
          .trim()
          .toLowerCase();
        // if search is empty, returning all recipes
        if (searchedRecipeName == "") {
          return () => true;
        }

        return (recipe: Recipe) =>
          recipe.name.toLowerCase().includes(searchedRecipeName);
      }

      if (searchParams.has("tag-name")) {
        const searchedTagName = searchParams
          .get("tag-name")!
          .trim()
          .toLowerCase();
        // if search is empty, returning all recipes
        if (searchedTagName == "") {
          return () => true;
        }

        const searchedTagId = (await getTagByName(searchedTagName))?.id;

        if (searchedTagId == null) {
          return () => true;
        }

        return (recipe: Recipe) => {
          let matchFound = false;

          for (const recipeTagId of recipe.tagIds) {
            if (recipeTagId === searchedTagId) {
              matchFound = true;
              break;
            }
          }

          return matchFound;
        };
      }

      // if we are currently filtering recipes by tag, only showing those that contains exactly this tag

      // if no filter is given, defaulting to return all recipes
      return () => true;
    }, [searchParams]) ?? (() => true);

  const theme = useTheme();
  const isSmallerThanSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isSmallerThanMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [numberColumn] = useState(
    isSmallerThanSmallScreen ? 2 : isSmallerThanMediumScreen ? 4 : 6,
  );

  useCountRender("AllRecipe");

  return (
    <Paper
      sx={{
        flex: 1,
        p: 2,
      }}
    >
      <RecipeList
        key={searchParams.toString()}
        nbColumn={numberColumn}
        filterFunction={filterFunction}
      />

      <Fab
        component={Link}
        to={RouteCreateRecipeName}
        size="medium"
        color="secondary"
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
        }}
      >
        <AddIcon />
      </Fab>
    </Paper>
  );
}
