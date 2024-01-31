import { useLiveQuery } from "dexie-react-hooks";
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  InfiniteLoader,
  InfiniteLoaderProps,
  List,
  ListRowRenderer,
} from "react-virtualized";
import AutoSizer from "react-virtualized-auto-sizer";

import { Skeleton, useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Paper from "@mui/material/Paper";

import "react-virtualized/styles.css";
import { RecipeCardMemoized } from "../components/RecipeCard";
import { DrawerContext } from "../contexts/DrawerContext";
import {
  getAllRecipes,
  getFirstPaginatedRecipes,
  getPaginatedRecipes,
  getRecipeCount,
} from "../database/controllers/recipeController";
import { getTagByName } from "../database/controllers/tagController";
import { database } from "../database/database";
import { Recipe } from "../database/models/Recipe";
import { RouteAllRecipesName, RouteCreateRecipeName } from "../routes/routes";

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

    return await getFirstPaginatedRecipes(30);
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

  const recipes = useRef<Recipe[]>([]);

  const recipeStatusMap = useRef<Record<number, 1 | 2>>({});
  const rowCount =
    useLiveQuery(async () => {
      return await getRecipeCount();
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
    const DEFAULT_PAGE_SIZE = 30;
    const lastRecipeIndex = startIndex - 1;
    let page: Recipe[];
    if (lastRecipeIndex < 0) {
      page = await getFirstPaginatedRecipes(DEFAULT_PAGE_SIZE);
    } else {
      const lastRecipe = recipes.current.at(lastRecipeIndex);
      if (lastRecipe === undefined) {
        page = await getFirstPaginatedRecipes(DEFAULT_PAGE_SIZE);
      } else {
        const pageSize = stopIndex - startIndex; // todo, check it stopIndex is included. if so, add 1
        page = await getPaginatedRecipes(lastRecipe, pageSize);
      }
    }

    // updating recipes
    for (const recipe of page) {
      recipes.current.push(recipe);
    }

    for (let index = startIndex; index <= stopIndex; index++) {
      recipeStatusMap.current[index] = LoadState.LOADED;
    }
  };

  const rowRenderer: ListRowRenderer = ({ key, index, style }) => {
    let row;
    if (
      recipeStatusMap.current[index] === undefined ||
      recipeStatusMap.current[index] === LoadState.LOADING
    ) {
      row = (
        <Skeleton
          variant="rectangular"
          style={{ height: "96%", marginTop: 1, marginBottom: 1 }}
        />
      );
    } else {
      const recipe = recipes.current[index];

      row = (
        <RecipeCardMemoized
          key={recipe.id!}
          id={recipe.id!}
          isFavorite={recipe.isFavorite}
          name={recipe.name}
          picture={recipe.pictures.at(0) ?? undefined}
          time={recipe.time}
        />
      );
    }

    return (
      <div key={key} style={style}>
        {row}
      </div>
    );
  };

  // const RowRender = useCallback(
  //   ({ index, style }: { index: number; style: CSSProperties }) => (
  //     <Grid
  //       key={index}
  //       container
  //       spacing={1.5}
  //       columns={{ xs: 2, sm: 4, md: 6 }}
  //       style={style}
  //     >
  //       {recipes
  //         .slice(numberColumn * index, numberColumn * (index + 1))
  //         .map((recipe) => (
  //           <Grid key={recipe.id!} item xs={1} sx={{ aspectRatio: "1/1" }}>
  //             <RecipeCardMemoized
  //               key={recipe.id!}
  //               id={recipe.id!}
  //               isFavorite={recipe.isFavorite}
  //               name={recipe.name}
  //               picture={recipe.pictures.at(0) ?? undefined}
  //               time={recipe.time}
  //             />
  //           </Grid>
  //         ))}
  //     </Grid>
  //   ),
  //   [recipes, numberColumn],
  // );

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
            >
              {({ onRowsRendered, registerChild }) => (
                <List
                  ref={registerChild}
                  onRowsRendered={onRowsRendered}
                  rowHeight={width / numberColumn}
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
