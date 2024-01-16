import { DragDropContext, Droppable, OnDragEndResponder } from "@hello-pangea/dnd";
import moment from "moment";
import { useState } from "react";

import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ActionFunction, useLoaderData, useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import Typography from "@mui/material/Typography";

import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import EggIcon from '@mui/icons-material/Egg';
import MicrowaveIcon from '@mui/icons-material/Microwave';
import SaveIcon from "@mui/icons-material/Save";
import ShortTextIcon from '@mui/icons-material/ShortText';
import TuneIcon from '@mui/icons-material/Tune';

import IconButton from "@mui/material/IconButton";
import { FormImageInputField } from "../components/FormImageInputField";
import { FormStepField } from "../components/FormStepField";
import { FormTextField } from "../components/FormTextField";
import { FormTimePicker } from "../components/FormTimePicker";
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
    steps: Array<{ text: string }>
}


export function EditRecipe() {
    const { t } = useTranslation();
    const recipe = useLoaderData() as Recipe;
    const navigate = useNavigate();

    const [currentTabIndex, setCurrentTabIndex] = useState(2);

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
            picture: undefined,
            steps: recipe.steps.map((step) => ({ text: step }))
        },
    });

    //  prepend, , swap, insert 
    const { fields, append, remove, move } = useFieldArray({
        control,
        name: "steps",
    });

    const handleDrag: OnDragEndResponder = ({ source, destination }) => {
        if (destination) {
            move(source.index, destination.index);
        }
    };


    const onSubmit = async (data: EditRecipeFormInput) => {
        const recipeToSave: Recipe = {
            comments: data.comments,
            ingredientSections: [],
            isFavorite: data.isFavorite,
            name: data.name,
            pictures: data.picture ? [data.picture] : [],
            portion: data.portion,
            steps: data.steps.map((step) => step.text),
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
                                    <FormTextField
                                        control={control}
                                        name="name"
                                        label={t("RecipeName")}
                                    />

                                    <FormTextField
                                        control={control}
                                        name="portion"
                                        label={t("Portions")}
                                        type="number"
                                    />

                                    <Grid container spacing={1}>
                                        <Grid item xs={4} >
                                            <FormTimePicker
                                                control={control}
                                                name="time.preparation"
                                                label={t("Preparation")}
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <FormTimePicker
                                                control={control}
                                                name="time.baking"
                                                label={t("Baking")}
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <FormTimePicker
                                                control={control}
                                                name="time.total"
                                                label={t("Total")}
                                            />
                                        </Grid>
                                    </Grid>

                                    <FormImageInputField
                                        control={control}
                                        name="picture"
                                        label={t("PickImage")}
                                        setValue={setValue}
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
                                            <DragDropContext onDragEnd={handleDrag}>
                                                <Droppable droppableId="steps-items">
                                                    {(provided) => (
                                                        <Box
                                                            ref={provided.innerRef}
                                                            {...provided.droppableProps}
                                                            sx={{ display: "flex", flexDirection: "column", gap: 8 }}
                                                        >
                                                            {fields.map((step, index) => (
                                                                <FormStepField
                                                                    key={`test[${index}]`}
                                                                    id={step.id}
                                                                    index={index}
                                                                    control={control}
                                                                    remove={remove}
                                                                    label={`${t("Step")} ${index + 1}`}
                                                                    name={`steps.${index}.text`}
                                                                    minRows={2}
                                                                    multiline
                                                                />

                                                            ))}

                                                            {provided.placeholder}
                                                        </Box>
                                                    )}
                                                </Droppable>

                                            </DragDropContext>
                                            <IconButton
                                                sx={{ alignSelf: "center" }}
                                                color="primary"
                                                onClick={() => append({ text: "" })}
                                            >
                                                <AddIcon />
                                            </IconButton>
                                        </>
                                        :
                                        <>
                                            <FormTextField
                                                control={control}
                                                name="comments"
                                                label={t("Comments")}
                                                multiline
                                                minRows={10}
                                            />
                                        </>
                        }

                    </Box>
                </Grid>
                <Grid item xs={0} md={4} />
            </Grid>



            <SpeedDial
                ariaLabel="SpeedDial tooltip example"
                sx={{ position: "fixed", bottom: 16, right: 16 }}
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