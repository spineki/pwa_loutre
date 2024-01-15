import moment from "moment";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ActionFunction, useLoaderData } from "react-router-dom";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import EggIcon from '@mui/icons-material/Egg';
import MicrowaveIcon from '@mui/icons-material/Microwave';
import SaveIcon from "@mui/icons-material/Save";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { Recipe, getEmptyRecipe } from "../models/Recipe";
import { getRecipeById } from "../models/controllers";

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


interface EditRecipeFormInput {
    name: string,
    portion: number,
    picture?: Blob
    time: {
        preparation: moment.Duration,
        baking: moment.Duration,
        total: moment.Duration,
    }
}


export function EditRecipe() {
    // const { recipe } = props;
    const { t } = useTranslation();
    const recipe = useLoaderData() as Recipe;

    const { control, handleSubmit, setValue } = useForm<EditRecipeFormInput>({
        defaultValues: {
            ...recipe,
            time: {
                preparation: moment.utc(recipe.time.preparation, "minute"),
                baking: moment.utc(recipe.time.baking, "minute"),
                total: moment.utc(recipe.time.total, "minute"),
            },
            picture: undefined
        },
    });

    const onSubmit = (data: EditRecipeFormInput) => console.log(data);

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

                        <Controller
                            name={"name"}
                            control={control}
                            render={({
                                field: { onChange, value },
                                fieldState: { error },
                            }) => (
                                <TextField
                                    helperText={error ? error.message : null}
                                    error={!!error}
                                    onChange={onChange}
                                    value={value}
                                    fullWidth
                                    label={t("RecipeName")}
                                    variant="outlined"
                                />
                            )}
                        />

                        <Controller
                            name={"portion"}
                            control={control}
                            render={({
                                field: { onChange, value },
                                fieldState: { error },
                            }) => (
                                <TextField
                                    type="number"
                                    helperText={error ? error.message : null}
                                    error={!!error}
                                    onChange={onChange}
                                    value={value}
                                    fullWidth
                                    label={t("Portions")}
                                    variant="outlined"
                                />
                            )}
                        />

                        <Grid container spacing={1}>
                            <Grid item xs={4} >
                                <Controller
                                    name={"time.preparation"}
                                    control={control}
                                    render={({
                                        field: { onChange, value },
                                        fieldState: { error },
                                    }) => (
                                        <DesktopTimePicker
                                            onChange={onChange}
                                            label={t("Preparation")}
                                            value={value}
                                            views={["hours", "minutes"]}
                                            ampm={false}
                                            slotProps={{
                                                textField: {
                                                    error: !!error,
                                                    helperText: error ? error.message : null
                                                },
                                            }}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Controller
                                    name={"time.baking"}
                                    control={control}
                                    render={({
                                        field: { onChange, value },
                                        fieldState: { error },
                                    }) => (
                                        <DesktopTimePicker
                                            onChange={onChange}
                                            label={t("Baking")}
                                            value={value}
                                            views={["hours", "minutes"]}
                                            ampm={false}
                                            slotProps={{
                                                textField: {
                                                    error: !!error,
                                                    helperText: error ? error.message : null
                                                },
                                            }}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Controller
                                    name={"time.total"}
                                    control={control}
                                    render={({
                                        field: { onChange, value },
                                        fieldState: { error },
                                    }) => (
                                        <DesktopTimePicker
                                            onChange={onChange}
                                            label={t("Total")}
                                            value={value}
                                            views={["hours", "minutes"]}
                                            ampm={false}
                                            slotProps={{
                                                textField: {
                                                    error: !!error,
                                                    helperText: error ? error.message : null
                                                },
                                            }}
                                        />
                                    )}
                                />
                            </Grid>
                        </Grid>

                        <Controller
                            name={"picture"}
                            control={control}
                            render={(
                                {
                                    fieldState: { error },
                                }
                            ) => (
                                <Button
                                    component="label"
                                    variant="contained"
                                    color={error ? "error" : "secondary"}
                                    endIcon={<CloudUploadIcon />}
                                >
                                    <input
                                        type="file"
                                        accept="image/*"
                                        hidden
                                        onChange={async (event) => {
                                            const files = event.target.files;
                                            if (files == null || files.length == 0) {
                                                return;
                                            }

                                            // ignore other pictures for now
                                            const file = files[0];
                                            setValue("picture", file);
                                        }}
                                    />
                                    {t("PickImage")}
                                </Button>
                            )}
                        />

                        <Controller
                            name={"picture"}
                            control={control}
                            render={({
                                field: { value },
                            }) => (
                                value
                                    ?
                                    <Box
                                        component="img"
                                        src={URL.createObjectURL(value)} />
                                    : <></>
                            )}
                        />

                        <BottomNavigation
                            showLabels
                            value={0}
                            onChange={() => {
                                // event, newValue
                                // setValue(newValue);
                            }}
                        >
                            <BottomNavigationAction label={t("Miscellaneous")} icon={<DriveFileRenameOutlineIcon />} />
                            <BottomNavigationAction label={t("Ingredients")} icon={<EggIcon />} />
                            <BottomNavigationAction label={t("Steps")} icon={<MicrowaveIcon />} />
                        </BottomNavigation>
                    </Box>
                </Grid>
                <Grid item xs={0} md={4} />
            </Grid>

            <Fab
                onClick={handleSubmit(onSubmit)}
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