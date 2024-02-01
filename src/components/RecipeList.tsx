import { CircularProgress } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useLiveQuery } from "dexie-react-hooks";
import { useCallback } from "react";
import { AutoSizer, List, ListRowRenderer } from "react-virtualized";
import { getFilteredRecipes } from "../database/controllers/recipeController";
import { Recipe } from "../database/models/Recipe";
import { RecipeCardMemoized } from "./RecipeCard";

// A displayable card element
type CardRecipe = Omit<Recipe, "pictures"> & { picture?: string };

interface RecipeListProps {
  nbRow: number;
  nbColumn: number;
  filterFunction: (recipe: Recipe) => boolean;
}

export function RecipeList(props: RecipeListProps) {
  const { nbColumn, nbRow, filterFunction } = props;

  const recipes = useLiveQuery(async () => {
    const recipes: Recipe[] = await getFilteredRecipes(filterFunction);

    const cardRecipes: CardRecipe[] = recipes.map(({ pictures, ...rest }) => {
      const firstPictureBlob = pictures.at(0);

      let firstPicture: string;
      if (firstPictureBlob) {
        firstPicture = URL.createObjectURL(firstPictureBlob);
      } else {
        firstPicture = "/tutorial_picture.png";
      }

      return { ...rest, picture: firstPicture };
    });

    return cardRecipes;
  }, [filterFunction]);

  const rowRenderer: ListRowRenderer = useCallback(
    ({ key, index, style }) => {
      return (
        <div key={key} style={style}>
          <Grid
            key={index}
            container
            spacing={1.5}
            columns={{ xs: 2, sm: 4, md: 6 }}
          >
            {(recipes ?? [])
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
        </div>
      );
    },
    [nbColumn, recipes],
  );

  return (
    <AutoSizer>
      {({ height, width }) =>
        recipes ? (
          <div style={{ height, width }}>
            <List
              rowHeight={width / nbColumn + 6}
              height={height}
              width={width}
              rowCount={nbRow}
              rowRenderer={rowRenderer}
              nbColumn={nbColumn}
            />
          </div>
        ) : (
          <CircularProgress />
        )
      }
    </AutoSizer>
  );
}
