import { useLiveQuery } from "dexie-react-hooks";
import {
  CSSProperties,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Link, useSearchParams } from "react-router-dom";

import { useTheme } from "@mui/material";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";

import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Paper from "@mui/material/Paper";

import { InfiniteList } from "../components/InfiniteList";
import { RecipeCardMemoized } from "../components/RecipeCard";
import { DrawerContext } from "../contexts/DrawerContext";
import {
  getAllRecipes,
  getFirstPaginatedRecipes,
  getPaginatedRecipes,
} from "../database/controllers/recipeController";
import { getTagByName } from "../database/controllers/tagController";
import { database } from "../database/database";
import { Recipe } from "../database/models/Recipe";
import { RouteAllRecipesName, RouteCreateRecipeName } from "../routes/routes";

export function AllRecipes() {
  const { setCurrentRoute } = useContext(DrawerContext);

  useEffect(() => {
    setCurrentRoute(RouteAllRecipesName);
  }, [setCurrentRoute]);

  // using url as a source to know which filters to apply to grid
  const [searchParams] = useSearchParams();

  // todo: implement proper pagination to only load a subset into memory
  const initialRecipes = useLiveQuery(async () => {
    // if we are currently filtering recipes by name, only showing those containing a name that contains this string
    if (searchParams.has("recipe-name")) {
      const searchedRecipeName = searchParams
        .get("recipe-name")!
        .trim()
        .toLowerCase();
      // if search is empty, returning all recipes
      // todo! add pagination to this
      if (searchedRecipeName == "") {
        return await getAllRecipes();
      }

      const recipes = await database.recipes
        .orderBy("name")
        .filter((recipe: Recipe) =>
          recipe.name.toLowerCase().includes(searchedRecipeName),
        )
        .toArray();
      return recipes;
    }

    if (searchParams.has("tag-name")) {
      const searchedTagName = searchParams
        .get("tag-name")!
        .trim()
        .toLowerCase();
      // if search is empty, returning all recipes
      // todo! add pagination to this
      if (searchedTagName == "") {
        return await getAllRecipes();
      }

      const searchedTagId = (await getTagByName(searchedTagName))?.id;

      if (searchedTagId == null) {
        return await getAllRecipes();
      }

      const recipes = await database.recipes
        .orderBy("name")
        .filter((recipe: Recipe) => {
          let matchFound = false;

          for (const recipeTagId of recipe.tagIds) {
            if (recipeTagId === searchedTagId) {
              matchFound = true;
              break;
            }
          }

          return matchFound;
        })
        .toArray();

      return recipes;
    }

    // if we are currently filtering recipes by tag, only showing those that contains exactly this tag

    // if no filter is given, defaulting to return all recipes
    // todo! add pagination to this

    return await getFirstPaginatedRecipes();
  }, [searchParams]);

  if (initialRecipes?.length ?? 0 > 10000) {
    console.log("initialRecipes", initialRecipes?.length);
  }

  const theme = useTheme();
  const isSmallerThanSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isSmallerThanMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [numberColumn] = useState(
    isSmallerThanSmallScreen ? 2 : isSmallerThanMediumScreen ? 4 : 6,
  );

  const [hasNextPage, setHasNextPage] = useState(true);
  const [isNextPageLoading, setIsNextPageLoading] = useState(false);
  const [recipes, setItems] = useState<Recipe[]>([]);

  const loadNextPage = async () => {
    console.log("load next page");
    setIsNextPageLoading(true);
  };

  useEffect(() => {
    // only handling page load
    if (isNextPageLoading == false) {
      return;
    }

    const getNextPage = async () => {
      const lastRecipe = recipes.at(-1);
      let newRecipes;
      if (lastRecipe == undefined) {
        newRecipes = (await getFirstPaginatedRecipes()) ?? [];
      } else {
        newRecipes = (await getPaginatedRecipes(lastRecipe)) ?? [];
      }

      setHasNextPage(true);
      setIsNextPageLoading(false);
      setItems([...recipes].concat(newRecipes));
    };

    getNextPage();
  }, [isNextPageLoading, recipes]);

  const isItemLoaded = useCallback(
    (index: number) => {
      const condition = !hasNextPage || index < recipes.length / numberColumn;
      return condition;
    },
    [hasNextPage, recipes.length, numberColumn],
  );

  const RowRender = useCallback(
    ({ index, style }: { index: number; style: CSSProperties }) => (
      <Grid
        key={index}
        container
        spacing={1.5}
        columns={{ xs: 2, sm: 4, md: 6 }}
        style={style}
      >
        {recipes
          .slice(numberColumn * index, numberColumn * (index + 1))
          .map((recipe) => (
            <Grid key={recipe.id!} item xs={1} sx={{ aspectRatio: "1/1" }}>
              <RecipeCardMemoized
                key={recipe.id!}
                id={recipe.id!}
                isFavorite={recipe.isFavorite}
                name={recipe.name}
                picture={recipe.pictures.at(0) ?? undefined}
                time={recipe.time}
              />
            </Grid>
          ))}
      </Grid>
    ),
    [recipes, numberColumn],
  );

  return (
    <Paper
      sx={{
        flex: 1,
        p: 2,
      }}
    >
      <InfiniteList
        hasNextPage={hasNextPage}
        isNextPageLoading={isNextPageLoading}
        nbColumns={numberColumn}
        nbItems={recipes.length}
        loadNextPage={loadNextPage}
        isItemLoaded={isItemLoaded}
        RowRender={RowRender}
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
