import { useLiveQuery } from "dexie-react-hooks";
import { useCallback, useContext, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import { TagChip } from "../components/TagChip";
import { DrawerContext } from "../contexts/DrawerContext";
import { database } from "../database/database";
import { RouteFavoriteRecipesName } from "../routes/routes";
import { RecipeList } from "../components/RecipeList";
import { Recipe } from "../database/models/Recipe";

export function FavoriteRecipes() {
  const { t } = useTranslation();

  const { setCurrentRoute } = useContext(DrawerContext);
  useEffect(() => {
    setCurrentRoute(RouteFavoriteRecipesName);
  }, [setCurrentRoute]);

  const theme = useTheme();
  const isSmallerThanSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isSmallerThanMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  const nbColumn = useMemo(() => {
    return isSmallerThanSmallScreen ? 2 : isSmallerThanMediumScreen ? 4 : 6;
  }, [isSmallerThanMediumScreen, isSmallerThanSmallScreen]);

  // todo: implement proper pagination to only load a subset into memory
  const filterFunction = useCallback((recipe: Recipe) => recipe.isFavorite, []);

  const tags = useLiveQuery(async () => {
    const tags = await database.tags
      .orderBy("name")
      .filter((tag) => tag.isFavorite)
      .toArray();
    return tags;
  }, []);

  return (
    <Paper
      sx={{
        flex: 1,
        p: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        gap: 2,
      }}
    >
      <Typography
        variant={"h4"}
        fontFamily={"Cookie-Regular"}
        sx={{ alignSelf: "center" }}
      >
        {t("FavoriteTags")}
      </Typography>
      {tags ? (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {tags.map((tag) => (
            <TagChip key={tag.id!} tag={tag} />
          ))}
        </Box>
      ) : (
        <CircularProgress />
      )}
      <Typography
        variant={"h4"}
        fontFamily={"Cookie-Regular"}
        sx={{ alignSelf: "center" }}
      >
        {t("FavoriteRecipes")}
      </Typography>

      <RecipeList nbColumn={nbColumn} filterFunction={filterFunction} />
    </Paper>
  );
}
