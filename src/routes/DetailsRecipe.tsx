import { useCallback, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ActionFunction, Link, useLoaderData } from "react-router-dom";
import SwipeableViews from "react-swipeable-views";

import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";

import AddIcon from "@mui/icons-material/Add";
import BreakfastDiningIcon from "@mui/icons-material/BreakfastDining";
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import RemoveIcon from "@mui/icons-material/Remove";
import ReplayIcon from "@mui/icons-material/Replay";
import ShareIcon from "@mui/icons-material/Share";

import { RecipeComments } from "../components/RecipeComments";
import { RecipePreview } from "../components/RecipePreview";
import { RecipeRequirements } from "../components/RecipeRequirements";
import { RecipeSteps } from "../components/RecipeSteps";
import { RecipeTabs } from "../components/RecipeTabs";
import { DrawerContext } from "../contexts/DrawerContext";
import { getRecipeById } from "../database/controllers/recipeController";
import { database_version } from "../database/database";
import {
  Recipe,
  ShareFile,
  getJsonCompatibleRecipeFromRecipe,
} from "../database/models/Recipe";
import { useSharing } from "../hooks/useSharing";
import { RouteDetailsRecipesName, getEditRecipeRoute } from "../routes/routes";

/**
 * A loader used by react router to load recipe before page loads.
 * Allows the app to automatically switch to error 404 in case of recipe not found.
 */
export const detailsRecipeLoader: ActionFunction = async ({ params }) => {
  const { id } = params;
  if (id === undefined) {
    return undefined;
  }

  const numberId = parseInt(id);
  if (isNaN(numberId)) {
    return undefined;
  }

  const recipe = await getRecipeById(numberId);
  if (recipe === undefined) {
    return undefined;
  }
  return recipe;
};

export function DetailsRecipe() {
  const { setCurrentRoute } = useContext(DrawerContext);
  useEffect(() => {
    setCurrentRoute(RouteDetailsRecipesName);
  }, [setCurrentRoute]);

  const recipe = useLoaderData() as Recipe;

  const { t } = useTranslation();
  const theme = useTheme();
  const { shareFile, downloadFile } = useSharing();

  const [currentTabIndex, setCurrentTabIndex] = useState<number>(0);
  const [portion, setPortion] = useState<number>(recipe.portion);
  const [showPortionSelection, setShowPortionSelection] =
    useState<boolean>(false);

  const handleClickPortionSelection = useCallback(() => {
    setShowPortionSelection(!showPortionSelection);
  }, [showPortionSelection]);

  const increasePortion = useCallback(() => {
    setPortion(portion + 1);
  }, [portion]);

  const decreasePortion = useCallback(() => {
    if (portion > 1) {
      setPortion(portion - 1);
    }
  }, [portion]);

  const resetPortion = useCallback(() => {
    setPortion(recipe.portion);
  }, [recipe.portion]);

  const handleTabsChangeIndex = (index: number) => {
    setCurrentTabIndex(index);
  };

  const shareRecipe = useCallback(async () => {
    const fileToShare: ShareFile = {
      version: database_version,
      recipes: [await getJsonCompatibleRecipeFromRecipe(recipe)],
    };

    await shareFile(fileToShare);
  }, [recipe, shareFile]);

  const downloadRecipe = async () => {
    const fileToDownload: ShareFile = {
      version: database_version,
      recipes: [await getJsonCompatibleRecipeFromRecipe(recipe)],
    };

    downloadFile(fileToDownload);
  };

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
      }}
    >
      <Box sx={{ width: "100%", position: "fixed", zIndex: 1 }}>
        <RecipeTabs
          currentTabIndex={currentTabIndex}
          handleTabsChange={handleTabsChangeIndex}
        />
      </Box>
      {/* Dirty hack to add enough space... not so great */}
      <Box sx={{ width: "100%", visibility: "hidden", position: "relative" }}>
        <RecipeTabs
          currentTabIndex={currentTabIndex}
          handleTabsChange={handleTabsChangeIndex}
        />
      </Box>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={currentTabIndex}
        style={{ display: "flex", flex: 1 }}
        slideStyle={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: "100%",
          overflowY: "hidden",
        }}
        containerStyle={{
          flex: 1,
          display: "flex",
        }}
        onChangeIndex={handleTabsChangeIndex}
      >
        {currentTabIndex == 0 ? (
          <RecipePreview
            name={recipe.name}
            picture={
              recipe.pictures.length > 0
                ? URL.createObjectURL(recipe.pictures[0])
                : undefined
            }
            tagIds={recipe.tagIds}
            time={recipe.time}
          />
        ) : (
          <></>
        )}

        {/* Replacing the tab content by an empty div to avoid all pages to have the maximal height
                even if the page as small elements
                this avoid short pages to still have a y-scroll enabled */}
        {currentTabIndex == 1 ? (
          <RecipeRequirements
            ingredientSections={recipe.ingredientSections}
            multiplicator={portion / recipe.portion}
          />
        ) : (
          <></>
        )}
        {currentTabIndex == 2 ? (
          <RecipeSteps stepSections={recipe.stepSections} />
        ) : (
          <></>
        )}
        {currentTabIndex == 3 ? (
          <RecipeComments comments={recipe.comments} source={recipe.source} />
        ) : (
          <></>
        )}
      </SwipeableViews>

      {currentTabIndex === 1 && showPortionSelection && (
        <Box
          sx={{
            position: "fixed",
            bottom: 80,
            right: 16,
            paddingRight: 0.5,
          }}
        >
          <Grid container gap={2}>
            <Grid
              container
              gap={2}
              sx={{
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
              }}
            >
              <Grid item>{t("Reset")}</Grid>
              <Grid item>
                <Fab size="small" onClick={() => resetPortion()}>
                  <ReplayIcon />
                </Fab>
              </Grid>
            </Grid>
            <Grid
              container
              gap={2}
              sx={{
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
              }}
            >
              <Grid item>{t("AddPortion")}</Grid>
              <Grid item>
                <Fab size="small" onClick={() => increasePortion()}>
                  <AddIcon />
                </Fab>
              </Grid>
            </Grid>
            <Grid
              container
              gap={2}
              sx={{
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
              }}
            >
              <Grid item>{t("RemovePortion")}</Grid>
              <Grid item>
                <Fab size="small" onClick={() => decreasePortion()}>
                  <RemoveIcon />
                </Fab>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      )}
      {currentTabIndex === 1 && (
        <Fab
          onClick={() => handleClickPortionSelection()}
          size="medium"
          color="primary"
          sx={{
            position: "fixed",
            bottom: 16,
            right: 16,
          }}
        >
          <Badge badgeContent={portion} color="secondary" sx={{ p: 0.5 }}>
            <BreakfastDiningIcon />
          </Badge>
        </Fab>
      )}

      {currentTabIndex === 0 && (
        <>
          <Fab
            onClick={() => downloadRecipe()}
            size="medium"
            color="secondary"
            sx={{
              position: "fixed",
              bottom: 144,
              right: 16,
            }}
          >
            <DownloadIcon />
          </Fab>

          <Fab
            onClick={() => shareRecipe()}
            size="medium"
            color="secondary"
            sx={{
              position: "fixed",
              bottom: 80,
              right: 16,
            }}
          >
            <ShareIcon />
          </Fab>

          <Fab
            component={Link}
            to={getEditRecipeRoute(recipe.id!)}
            size="medium"
            color="info"
            sx={{
              position: "fixed",
              bottom: 16,
              right: 16,
            }}
          >
            <EditIcon />
          </Fab>
        </>
      )}
    </Paper>
  );
}
