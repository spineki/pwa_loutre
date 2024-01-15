import { useTranslation } from "react-i18next";
import { ActionFunction, Link, useLoaderData } from "react-router-dom";

import SaveIcon from "@mui/icons-material/Save";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import Grid from "@mui/material/Grid";
import { Recipe, getEmptyRecipe } from "../models/Recipe";
import { getRecipeById } from "../models/controllers";
import { RouteWorkInProgressName } from "./routes";


/**
 * While using the create route, giving an empty recipe as a placeholder for future filling
 * @param param0 
 * @returns 
 */
export const createRecipeLoader: ActionFunction = () => {
    return getEmptyRecipe();
}

/**
 * A loader used by react router to load recipe before page loads.
 * If no matching recipe is found, will return undefined and trigger the 404 error route
 */
export const editRecipeLoader: ActionFunction = async ({ params }) => {
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


export function EditRecipe() {
    // const { recipe } = props;
    const { t } = useTranslation();
    const recipe = useLoaderData() as Recipe;

    return (
        <Paper sx={{ p: 2, flex: 1, display: "flex", flexDirection: "column" }}>
            <Grid container>
                <Grid item xs={0} md={4} />
                <Grid item xs={12} md={4}>
                    <Box
                        component="form"
                        noValidate
                        autoComplete="off"
                        style={{ display: "flex", flexDirection: "column", gap: 16 }}
                    >
                        <Typography variant="h5">
                            {recipe.id == null ? t("NewRecipe") : t("Edit")}
                        </Typography>
                        <TextField
                            fullWidth
                            id="name"
                            defaultValue={recipe.name}
                            label={t("RecipeName")}
                            variant="outlined"
                        />

                        <TextField
                            fullWidth
                            type="number"
                            inputMode="numeric"
                            defaultValue={recipe.portion}
                            id="portion"
                            label={t("Portions")}
                            variant="outlined"
                        />
                    </Box>

                </Grid>
                <Grid item xs={0} md={4} />
            </Grid>

            <Fab
                component={Link}
                to={RouteWorkInProgressName}
                size="medium"
                color="primary"
                sx={{
                    position: "fixed",
                    bottom: 16,
                    right: 16,
                }}>
                <SaveIcon />
            </Fab>
        </Paper>
    )

}