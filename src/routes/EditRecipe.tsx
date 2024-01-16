import moment from "moment";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ActionFunction, useLoaderData, useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import EggIcon from '@mui/icons-material/Egg';
import MicrowaveIcon from '@mui/icons-material/Microwave';
import SaveIcon from "@mui/icons-material/Save";
import ShortTextIcon from '@mui/icons-material/ShortText';
import TuneIcon from '@mui/icons-material/Tune';
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";

import { Recipe, getEmptyRecipe } from "../models/Recipe";
import { getRecipeById, insertRecipe, upsertRecipe } from "../models/controllers";
import { getDetailsRecipeRoute } from "./routes";

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
    isFavorite: boolean,
    comments: string,
    name: string,
    portion: number,
    picture?: Blob
    time: {
        preparation: moment.Moment,
        baking: moment.Moment,
        total: moment.Moment,
    },
    steps: string[]
}


export function EditRecipe() {
    // const { recipe } = props;
    const { t } = useTranslation();
    const recipe = useLoaderData() as Recipe;
    const navigate = useNavigate();

    const [currentTabIndex, setCurrentTabIndex] = useState(0);

    const actions = [
        { icon: <DriveFileRenameOutlineIcon />, name: t("Miscellaneous") },
        { icon: <EggIcon />, name: t("Ingredients") },
        { icon: <MicrowaveIcon />, name: t("Steps") },
        { icon: <ShortTextIcon />, name: t("Comments") },
    ];

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

    const onSubmit = async (data: EditRecipeFormInput) => {
        const recipeToSave: Recipe = {
            comments: data.comments,
            ingredientSections: [],
            isFavorite: data.isFavorite,
            name: data.name,
            pictures: data.picture ? [data.picture] : [],
            portion: data.portion,
            steps: data.steps,
            time: {
                preparation: moment.duration(data.time.preparation.format("HH:mm")).asMinutes(),
                baking: moment.duration(data.time.baking.format("HH:mm")).asMinutes(),
                total: moment.duration(data.time.total.format("HH:mm")).asMinutes(),
            },
        };

        let id = recipe.id;
        // if creating a new recipe
        if (id == null) {
            id = await insertRecipe(recipeToSave);
        } else {
            recipeToSave.id = id;
            await upsertRecipe(recipeToSave);
        }
        navigate(getDetailsRecipeRoute(id));
    };

    return (
        <Paper sx={{ p: 2, flex: 1, display: "flex", flexDirection: "column" }}>
            <Grid container sx={{ display: "flex", flex: 1 }}>
                <Grid item xs={0} md={4} />
                <Grid item xs={12} md={4} sx={{ display: "flex", flex: 1 }}>
                    <Box
                        component="form"
                        noValidate
                        autoComplete="off"
                        style={{ display: "flex", flexDirection: "column", flex: 1, gap: 16 }}
                    >
                        <Typography variant="h5">
                            {recipe.id == null ? t("NewRecipe") : t("Edit")}
                        </Typography>
                        {
                            currentTabIndex == 0 ?
                                <>
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
                                                    sx={{ width: "100%" }}
                                                    component="img"
                                                    src={URL.createObjectURL(value)} />
                                                : <></>
                                        )}
                                    />

                                </>

                                : currentTabIndex == 1 ?
                                    <>
                                    </>

                                    : currentTabIndex == 2 ?
                                        <>
                                        </> :
                                        <>
                                            <Controller
                                                name={"comments"}
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
                                                        label={t("Comments")}
                                                        variant="outlined"
                                                        multiline
                                                        minRows={10}
                                                    />
                                                )}
                                            />
                                        </>
                        }

                    </Box>
                </Grid>
                <Grid item xs={0} md={4} />
            </Grid>



            <SpeedDial
                ariaLabel="SpeedDial tooltip example"
                sx={{ position: 'absolute', bottom: 16, right: 16 }}
                icon={<SpeedDialIcon openIcon={<CloseIcon />} icon={<TuneIcon />} />}
            // onClose={handleClose}
            // onOpen={handleOpen}
            // open={true}
            >
                {actions.map((action, index) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        tooltipOpen
                        color="success"
                        FabProps={{
                            sx: {
                                border: index == currentTabIndex ? "solid 1px" : "inherit",
                                borderColor: index == currentTabIndex ? "secondary.main" : "inherit",
                            }
                        }}
                        onClick={() => setCurrentTabIndex(index)}
                    />
                ))}
                <SpeedDialAction
                    key={t("Save")}
                    icon={<SaveIcon />}
                    tooltipTitle={t("Save")}
                    tooltipOpen
                    onClick={handleSubmit(onSubmit)}
                />
            </SpeedDial>

        </Paper>
    )

}