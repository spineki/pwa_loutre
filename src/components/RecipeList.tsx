import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import { useLiveQuery } from "dexie-react-hooks";
import { useCallback, useRef } from "react";
import {
  AutoSizer,
  InfiniteLoader,
  InfiniteLoaderProps,
  List,
  ListRowRenderer,
} from "react-virtualized";
import {
  getFirstPaginatedRecipes,
  getPaginatedRecipes,
  getRecipeCount,
} from "../database/controllers/recipeController";
import { Recipe } from "../database/models/Recipe";
import { useCountRender } from "../hooks/useCountRenders";
import { RecipeCardMemoized } from "./RecipeCard";

// A displayable card element
type CardRecipe = Omit<Recipe, "pictures"> & { picture?: string };

enum LoadState {
  LOADING = 1,
  LOADED = 2,
}

interface RecipeListProps {
  nbColumn: number;
  filterFunction: (recipe: Recipe) => boolean;
}

export function RecipeList(props: RecipeListProps) {
  const { nbColumn, filterFunction } = props;

  const recipes = useRef<CardRecipe[]>([]);

  const recipeStatusMap = useRef<Record<number, LoadState>>({});

  const rowCount =
    useLiveQuery(async () => {
      return Math.ceil((await getRecipeCount()) / nbColumn);
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
    const pageSize = (stopIndex - startIndex + 1) * nbColumn;
    const lastRecipeIndex = startIndex * nbColumn - 1;
    let page: Recipe[];
    if (lastRecipeIndex < 0) {
      page = await getFirstPaginatedRecipes(pageSize, filterFunction);
    } else {
      const lastRecipe = recipes.current.at(lastRecipeIndex);
      if (lastRecipe === undefined) {
        page = await getFirstPaginatedRecipes(pageSize, filterFunction);
      } else {
        console.log(
          "using real pagination, start:",
          lastRecipeIndex,
          lastRecipe,
        );
        page = await getPaginatedRecipes(lastRecipe, pageSize, filterFunction);
        console.log(page);
      }
    }

    const cardRecipePage = page.map((recipe) => {
      const firstPictureBlob = recipe.pictures.at(0);

      let firstPicture: string;
      if (firstPictureBlob) {
        firstPicture = URL.createObjectURL(firstPictureBlob);
      } else {
        firstPicture = "/tutorial_picture.png";
      }

      return { ...recipe, picture: firstPicture };
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
              .slice(nbColumn * index, nbColumn * (index + 1))
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
    [nbColumn],
  );

  useCountRender("RecipeList");

  return (
    <AutoSizer>
      {({ height, width }) => (
        <div style={{ height, width }}>
          <InfiniteLoader
            isRowLoaded={isRowLoaded}
            loadMoreRows={loadMoreRows}
            rowCount={rowCount}
            minimumBatchSize={nbColumn * 2}
            threshold={nbColumn * 2}
          >
            {({ onRowsRendered, registerChild }) => (
              <List
                ref={registerChild}
                onRowsRendered={onRowsRendered}
                rowHeight={width / nbColumn + 6}
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
  );
}
