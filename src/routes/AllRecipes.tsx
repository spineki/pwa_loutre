import { useLiveQuery } from "dexie-react-hooks";
import {
  CSSProperties,
  memo,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Link, useSearchParams } from "react-router-dom";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList, areEqual } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";

import { useTheme } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";

import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Paper from "@mui/material/Paper";

import { RecipeCard } from "../components/RecipeCard";
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

const RowWrapper = (recipes: Recipe[], numberColumn: number) =>
  // eslint-disable-next-line react/display-name
  memo(({ index, style }: { index: number; style: CSSProperties }) => {
    return (
      <Grid
        key={index}
        container
        spacing={1.5}
        columns={{ xs: 2, sm: 4, md: 6 }}
        style={style}
      >
        {recipes!
          .slice(numberColumn * index, numberColumn * (index + 1))
          .map((recipe) => (
            <Grid key={recipe.id!} item xs={1} sx={{ aspectRatio: "1/1" }}>
              <RecipeCard
                key={recipe.id!}
                id={recipe.id!}
                isFavorite={recipe.isFavorite}
                name={recipe.name}
                picture={
                  recipe.pictures.length > 0
                    ? URL.createObjectURL(recipe.pictures[0])
                    : undefined
                }
                time={recipe.time}
              />
            </Grid>
          ))}
      </Grid>
    );
  }, areEqual);

export function AllRecipes() {
  const { setCurrentRoute } = useContext(DrawerContext);

  const theme = useTheme();
  const isSmallerThanSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isSmallerThanMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [numberColumn] = useState(
    isSmallerThanSmallScreen ? 2 : isSmallerThanMediumScreen ? 4 : 6,
  );

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

  const [recipes, setRecipes] = useState<Array<Recipe>>([]);

  useEffect(() => {
    setRecipes(initialRecipes ?? []);
  }, [initialRecipes]);

  const loadMoreItems = useCallback(async () => {
    const lastRecipe = recipes.at(-1);
    if (lastRecipe === undefined) {
      return; // todo, check when this could happen
    }

    const newRecipes = (await getPaginatedRecipes(lastRecipe)) ?? [];

    setRecipes(recipes.concat(newRecipes));
  }, [recipes]);

  // todo change this
  const hasNextPage = true;

  const itemCount = recipes
    ? hasNextPage
      ? Math.ceil(recipes.length / numberColumn) + 1
      : Math.ceil(recipes.length / numberColumn)
    : 0;

  return (
    <Paper
      sx={{
        flex: 1,
        p: 2,
      }}
    >
      {recipes ? (
        <AutoSizer>
          {({ height, width }) => (
            <div style={{ height, width }}>
              <InfiniteLoader
                isItemLoaded={(index) => {
                  return index < itemCount - 1;
                }}
                itemCount={itemCount}
                loadMoreItems={loadMoreItems}
              >
                {({ onItemsRendered, ref }) => (
                  <FixedSizeList
                    ref={ref}
                    itemCount={itemCount}
                    onItemsRendered={onItemsRendered}
                    itemSize={width / numberColumn}
                    height={height}
                    width={width}
                    layout="vertical"
                  >
                    {RowWrapper(recipes, numberColumn)}
                  </FixedSizeList>
                )}
              </InfiniteLoader>
            </div>
          )}
        </AutoSizer>
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
