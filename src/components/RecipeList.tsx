import { useLiveQuery } from "dexie-react-hooks";
import { memo, useMemo } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeGrid, GridChildComponentProps, areEqual } from "react-window";

import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";

import {
  getFilteredRecipes,
  partialUpdateRecipe,
} from "../database/controllers/recipeController";
import { Recipe } from "../database/models/Recipe";
import { RecipeCard } from "./RecipeCard";

// A displayable card element
type CardRecipe = Omit<Recipe, "pictures"> & { picture?: string };

interface RecipeListProps {
  nbColumn: number;
  filterFunction: (recipe: Recipe) => boolean;
}

const MemoizedCell = memo(function Cell({
  columnIndex,
  rowIndex,
  style,
  data,
}: GridChildComponentProps<{ recipes: CardRecipe[]; nbColumn: number }>) {
  const { recipes, nbColumn } = data;
  const singleColumnIndex = columnIndex + rowIndex * nbColumn;
  const recipe = recipes.at(singleColumnIndex);

  return (
    <div style={style}>
      {recipe && (
        <Grid item xs={1} sx={{ aspectRatio: "1/1", padding: 1 }}>
          <RecipeCard
            id={recipe.id!}
            isFavorite={recipe.isFavorite}
            name={recipe.name}
            picture={recipe.picture}
            time={recipe.time}
            onLike={async () => {
              await partialUpdateRecipe(recipe.id!, { isFavorite: true });
            }}
            onUnLike={async () => {
              await partialUpdateRecipe(recipe.id!, { isFavorite: false });
            }}
          />
        </Grid>
      )}
    </div>
  );
}, areEqual);

export function RecipeList(props: RecipeListProps) {
  const { nbColumn, filterFunction } = props;

  const recipes = useLiveQuery(async () => {
    const recipes: Recipe[] = await getFilteredRecipes(filterFunction);

    const cardRecipes: CardRecipe[] = recipes.map(({ pictures, ...rest }) => {
      const firstPictureBlob = pictures.at(0);

      let firstPicture: string;
      if (firstPictureBlob !== undefined) {
        firstPicture = URL.createObjectURL(firstPictureBlob);
      } else {
        firstPicture = "/tutorial_picture.png";
      }

      return { ...rest, picture: firstPicture };
    });

    return cardRecipes;
  }, [filterFunction]);

  const nbRow = useMemo(
    () => Math.ceil((recipes?.length ?? 0) / nbColumn),
    [nbColumn, recipes?.length],
  );

  return (
    <AutoSizer>
      {({ height, width }) =>
        recipes ? (
          <div style={{ height, width }}>
            <FixedSizeGrid
              className="grid"
              width={width}
              height={height}
              columnCount={nbColumn}
              columnWidth={width / nbColumn}
              rowCount={nbRow}
              rowHeight={width / nbColumn}
              itemData={{ recipes, nbColumn }}
            >
              {MemoizedCell}
            </FixedSizeGrid>
          </div>
        ) : (
          <CircularProgress />
        )
      }
    </AutoSizer>
  );
}
