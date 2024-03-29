import { useContext, useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import CircularProgress from "@mui/material/CircularProgress";
import Fab from "@mui/material/Fab";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import AddIcon from "@mui/icons-material/Add";

import { RecipeList } from "../components/RecipeList";
import { DrawerContext } from "../contexts/DrawerContext";
import { getTagByName } from "../database/controllers/tagController";
import { Recipe } from "../database/models/Recipe";
import { RouteAllRecipesName, RouteCreateRecipeName } from "../routes/routes";

export function AllRecipes() {
  const { setCurrentRoute } = useContext(DrawerContext);
  useEffect(() => {
    setCurrentRoute(RouteAllRecipesName);
  }, [setCurrentRoute]);

  const theme = useTheme();
  const isSmallerThanSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isSmallerThanMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  const nbColumn = useMemo(() => {
    return isSmallerThanSmallScreen ? 2 : isSmallerThanMediumScreen ? 4 : 6;
  }, [isSmallerThanMediumScreen, isSmallerThanSmallScreen]);

  // using url as a source to know which filters to apply to grid
  const [searchParams] = useSearchParams();

  const [filterFunction, setFilterFunction] = useState<
    null | ((recipe: Recipe) => boolean)
  >(null);

  useEffect(() => {
    const createNextFilterFunction = async (
      searchParams: URLSearchParams,
    ): Promise<(recipe: Recipe) => boolean> => {
      // if we are currently filtering recipes by name, only showing those containing a name that contains this string

      if (searchParams.has("recipe-name")) {
        const searchedRecipeName = searchParams
          .get("recipe-name")!
          .trim()
          .toLowerCase();
        // if search is empty, returning all recipes
        if (searchedRecipeName == "") {
          return () => true;
        }

        return (recipe: Recipe) => {
          return recipe.name.toLowerCase().includes(searchedRecipeName);
        };
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
    };

    const handleFiltering = async (searchParams: URLSearchParams) => {
      const nextFilterFunction: (recipe: Recipe) => boolean =
        await createNextFilterFunction(searchParams);
      setFilterFunction(() => nextFilterFunction);
    };

    handleFiltering(searchParams);
  }, [nbColumn, searchParams]);

  return (
    <Paper
      sx={{
        flex: 1,
        p: 2,
      }}
    >
      {filterFunction ? (
        <RecipeList nbColumn={nbColumn} filterFunction={filterFunction} />
      ) : (
        <CircularProgress />
      )}

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
