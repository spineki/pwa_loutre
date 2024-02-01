import { useLiveQuery } from "dexie-react-hooks";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  InfiniteLoader,
  InfiniteLoaderProps,
  List,
  ListRowRenderer,
} from "react-virtualized";
import AutoSizer from "react-virtualized-auto-sizer";

import { Grid, Skeleton, useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Paper from "@mui/material/Paper";

import "react-virtualized/styles.css";
import { RecipeCardMemoized } from "../components/RecipeCard";
import { DrawerContext } from "../contexts/DrawerContext";
import {
  getFirstPaginatedRecipes,
  getPaginatedRecipes,
  getRecipeCount,
} from "../database/controllers/recipeController";
import { getTagByName } from "../database/controllers/tagController";
import { Recipe } from "../database/models/Recipe";
import { RouteAllRecipesName, RouteCreateRecipeName } from "../routes/routes";

// A displayable card element
type CardRecipe = Omit<Recipe, "pictures"> & { picture?: string };

enum LoadState {
  LOADING = 1,
  LOADED = 2,
}

export function AllRecipes() {
  const { setCurrentRoute } = useContext(DrawerContext);

  useEffect(() => {
    setCurrentRoute(RouteAllRecipesName);
  }, [setCurrentRoute]);

  // using url as a source to know which filters to apply to grid
  const [searchParams] = useSearchParams();

  const filteringFunction: (recipe: Recipe) => boolean =
    useLiveQuery(async () => {
      // if we are currently filtering recipes by name, only showing those containing a name that contains this string
      if (searchParams.has("recipe-name")) {
        const searchedRecipeName = searchParams
          .get("recipe-name")!
          .trim()
          .toLowerCase();
        // if search is empty, returning all recipes
        // todo! add pagination to this
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
        // todo! add pagination to this
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

  const recipes = useRef<CardRecipe[]>([]);

  const recipeStatusMap = useRef<Record<number, LoadState>>({});
  const rowCount =
    useLiveQuery(async () => {
      return Math.ceil((await getRecipeCount()) / numberColumn);
    }, []) ?? 0;

  const isRowLoaded: InfiniteLoaderProps["isRowLoaded"] = ({
    index,
  }: {
    index: number;
  }) => !!recipeStatusMap.current[index];

  const loadMoreRows: InfiniteLoaderProps["loadMoreRows"] = async ({
    startIndex,
    stopIndex,
  }: {
    startIndex: number;
    stopIndex: number;
  }) => {
    for (let index = startIndex; index <= stopIndex; index++) {
      recipeStatusMap.current[index] = LoadState.LOADING;
    }

    // using the startIndex, we can get the last fetched recipe id
    const pageSize = (stopIndex - startIndex + 1) * numberColumn;
    const lastRecipeIndex = startIndex * numberColumn - 1;
    let page: Recipe[];
    if (lastRecipeIndex < 0) {
      page = await getFirstPaginatedRecipes(pageSize, filteringFunction);
    } else {
      const lastRecipe = recipes.current.at(lastRecipeIndex);
      if (lastRecipe === undefined) {
        page = await getFirstPaginatedRecipes(pageSize, filteringFunction);
      } else {
        page = await getPaginatedRecipes(
          lastRecipe,
          pageSize,
          filteringFunction,
        );
      }
    }

    const cardRecipePage: CardRecipe[] = page.map((recipe) => {
      const firstPicture = recipe.pictures.at(0);

      let firstPictureUrl;

      if (firstPicture) {
        firstPictureUrl = URL.createObjectURL(firstPicture);
      } else {
        firstPictureUrl = "/tutorial_picture.png";
      }

      return {
        ...recipe,
        picture: firstPictureUrl,
      };
    });

    // updating recipes
    for (const recipe of cardRecipePage) {
      recipes.current.push(recipe);
    }

    for (let index = startIndex; index <= stopIndex; index++) {
      recipeStatusMap.current[index] = LoadState.LOADED;
    }
  };

  const rowRenderer: ListRowRenderer = useCallback(
    ({ key, index, style }) => {
      let row;
      if (
        recipeStatusMap.current[index] === undefined ||
        recipeStatusMap.current[index] === LoadState.LOADING
      ) {
        row = <Skeleton variant="rectangular" />;
      } else {
        row = (
          <Grid
            key={index}
            container
            spacing={1.5}
            columns={{ xs: 2, sm: 4, md: 6 }}
          >
            {recipes.current
              .slice(numberColumn * index, numberColumn * (index + 1))
              .map((recipe) => (
                <Grid key={recipe.id!} item xs={1} sx={{ aspectRatio: "1/1" }}>
                  <RecipeCardMemoized
                    key={recipe.id!}
                    id={recipe.id!}
                    isFavorite={recipe.isFavorite}
                    name={recipe.name}
                    picture={recipe.picture}
                    time={recipe.time}
                  />
                </Grid>
              ))}
          </Grid>
        );
      }

      return (
        <div key={key} style={style}>
          {row}
        </div>
      );
    },
    [numberColumn],
  );

  return (
    <Paper
      sx={{
        flex: 1,
        p: 2,
      }}
    >
      <AutoSizer>
        {({ height, width }) => (
          <div style={{ height, width }}>
            <InfiniteLoader
              isRowLoaded={isRowLoaded}
              loadMoreRows={loadMoreRows}
              rowCount={rowCount}
              minimumBatchSize={numberColumn * 2}
              threshold={numberColumn * 2}
            >
              {({ onRowsRendered, registerChild }) => (
                <List
                  ref={registerChild}
                  onRowsRendered={onRowsRendered}
                  rowHeight={width / numberColumn + 6}
                  height={height}
                  width={width}
                  rowCount={rowCount}
                  rowRenderer={rowRenderer}
                />
              )}
            </InfiniteLoader>
          </div>
        )}
      </AutoSizer>

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
