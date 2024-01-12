import { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { useTranslation } from "react-i18next";
import { ActionFunction, useLoaderData } from "react-router-dom";

import Paper from "@mui/material/Paper";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";

import { RouteAllRecipesName } from "./AllRecipes";
import { getRecipeById } from "../models/controllers";
import { Recipe } from "../models/Recipe";
import { RecipeRequirements } from "../components/RecipeRequirements";

export const RouteDetailsRecipesName = RouteAllRecipesName + "/:id";

/**
 * A loader used by react router to load recipe before page loads.
 * Allows the app to automatically switch to error 404 in case of recipe not found.
 */
export const detailsRecipeLoader: ActionFunction = async ({ params }) => {
    const { id } = params;
    if (id === undefined) {
        return undefined
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
}

export function DetailsRecipe() {

    const recipe = useLoaderData() as Recipe;

    const { t } = useTranslation();
    const theme = useTheme();

    const [currentTabIndex, setCurrentTabIndex] = useState<number>(0);

    const handleTabsChange = (event: React.SyntheticEvent, newValue: number) => {
        setCurrentTabIndex(newValue);
    };

    const handleTabsChangeIndex = (index: number) => {
        setCurrentTabIndex(index);
    };


    return (
        <Paper sx={{ p: 1, width: "100%", height: "100%" }} >
            <Box sx={{ borderBottom: 1, borderColor: "divider", width: "100%" }}>
                <Tabs
                    style={{ position: "fixed", width: "100%" }}
                    value={currentTabIndex}
                    onChange={handleTabsChange}
                    textColor="secondary"
                    indicatorColor="secondary"
                    centered
                >
                    <Tab label={t("Ingredients")} />
                    <Tab label={t("Recipe")} />
                    <Tab label={t("Comments")} />
                </Tabs>
            </Box>
            {/* Dirty hack to add enough space... not so great */}
            <Box sx={{ borderBottom: 1, borderColor: "divider", visibility: "hidden" }}>
                <Tabs
                    value={currentTabIndex}
                    textColor="secondary"
                    indicatorColor="secondary"
                    centered
                >
                    <Tab label={t("Ingredients")} />
                    <Tab label={t("Recipe")} />
                    <Tab label={t("Comments")} />
                </Tabs>
            </Box>
            <SwipeableViews
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                style={{ padding: 8 }}
                index={currentTabIndex}
                onChangeIndex={handleTabsChangeIndex}
            >
                {currentTabIndex == 0 ? <RecipeRequirements ingredients={recipe.ingredients} time={recipe.time} /> : <></>}
                {currentTabIndex == 1 ? <span> page 1</span> : <></>}
                {currentTabIndex == 2 ? <span> page 2</span> : <></>}
            </SwipeableViews>
            <span>{recipe.isFavorite} </span>
        </ Paper>
    )
}