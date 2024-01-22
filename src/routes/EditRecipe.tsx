import { DragDropContext, Droppable, OnDragEndResponder } from "@hello-pangea/dnd";
import { useLiveQuery } from "dexie-react-hooks";
import moment from "moment";
import { useCallback, useContext, useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ActionFunction, useLoaderData, useNavigate } from "react-router-dom";

import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import EggIcon from '@mui/icons-material/Egg';
import MicrowaveIcon from '@mui/icons-material/Microwave';
import SaveIcon from "@mui/icons-material/Save";
import ShortTextIcon from '@mui/icons-material/ShortText';
import TuneIcon from '@mui/icons-material/Tune';

import { FormImageInputField } from "../components/FormImageInputField";
import { FormIngredientField } from "../components/FormIngredientField";
import { FormStepField } from "../components/FormStepField";
import { FormTextField } from "../components/FormTextField";
import { FormTimePicker } from "../components/FormTimePicker";
import { DrawerContext } from "../contexts/DrawerContext";
import { IngredientSection, Recipe, StepSection, getEmptyRecipe } from "../models/Recipe";
import { Tag, sanitizeTagName } from "../models/Tag";
import { getAllTags, getRecipeById, getTagByName, getTagsByIds, insertRecipe, upsertRecipe, upsertTag } from "../models/controllers";
import { RouteEditRecipeName, getDetailsRecipeRoute } from "./routes";

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


// convertion helpers
function convertStepsToStepSections(steps: Array<{ text: string, isSection: boolean }>): StepSection[] {
    const stepSections: StepSection[] = [];

    let currentSection: StepSection = { steps: [] };
    for (const step of steps) {
        if (step.isSection) {
            // saving previous section
            if (!(currentSection.title === undefined && currentSection.steps.length == 0)) {
                stepSections.push(currentSection);
            }
            currentSection = { steps: [], title: step.text };
        } else {
            currentSection.steps.push(step.text);
        }
    }
    // if ending by a section
    if (!(currentSection.title === undefined && currentSection.steps.length == 0)) {
        stepSections.push(currentSection);
    }
    return stepSections;
}

function convertIngredientsToIngredientSections(ingredients: Array<{ text: string, isSection: boolean }>): IngredientSection[] {
    const ingredientSections: IngredientSection[] = [];

    let currentSection: IngredientSection = { ingredients: [] };
    for (const ingredient of ingredients) {
        if (ingredient.isSection) {
            // saving previous section
            if (!(currentSection.title === undefined && currentSection.ingredients.length == 0)) {
                ingredientSections.push(currentSection);
            }
            currentSection = { ingredients: [], title: ingredient.text };
        } else {
            currentSection.ingredients.push(ingredient.text);
        }
    }
    // if ending by a section
    if (!(currentSection.title === undefined && currentSection.ingredients.length == 0)) {
        ingredientSections.push(currentSection);
    }
    return ingredientSections;
}


interface EditRecipeFormInput {
    comments: string,
    isFavorite: boolean,
    ingredients: Array<{ text: string, isSection: boolean }>
    name: string,
    portion: number,
    picture?: Blob,
    source: string,
    steps: Array<{ text: string, isSection: boolean }>
    tags: Array<{ name: string }>,
    time: {
        preparation: moment.Moment,
        baking: moment.Moment,
        total: moment.Moment,
    },
}


export function EditRecipe() {
    const { setCurrentRoute } = useContext(DrawerContext);
    useEffect(() => {
        setCurrentRoute(RouteEditRecipeName);
    }, [setCurrentRoute])

    const { t } = useTranslation();
    const recipe = useLoaderData() as Recipe;
    const navigate = useNavigate();

    const tags = useLiveQuery(async () => {
        return await getAllTags();
    }, []);

    const [currentTabIndex, setCurrentTabIndex] = useState(0);

    const actions = [
        { icon: <DriveFileRenameOutlineIcon />, name: t("Miscellaneous") },
        { icon: <EggIcon />, name: t("Ingredients") },
        { icon: <MicrowaveIcon />, name: t("Steps") },
        { icon: <ShortTextIcon />, name: t("Comments") },
    ];

    const { formState, control, handleSubmit, getValues, setValue, watch } = useForm<EditRecipeFormInput>({
        defaultValues: async () => ({
            comments: recipe.comments,
            ingredients: recipe.ingredientSections
                .map((section) => [
                    ...(section.title ? [{ text: section.title, isSection: true }] : []),
                    ...section.ingredients.map((text) => ({ text, isSection: false }))])
                .flat(),
            isFavorite: recipe.isFavorite,
            name: recipe.name,
            picture: recipe.pictures.at(0),
            portion: recipe.portion,
            source: recipe.source,
            steps: recipe.stepSections
                .map((section) => [
                    ...(section.title ? [{ text: section.title, isSection: true }] : []),
                    ...section.steps.map((text) => ({ text, isSection: false }))])
                .flat(),
            tags: (await getTagsByIds(recipe.tagIds))
                .filter((tag): tag is Tag => tag !== undefined)
                .map(tag => ({ name: tag.name })),
            time: {
                preparation: moment.utc(`${(Math.floor(recipe.time.preparation / 60))}:${(recipe.time.preparation % 60)}`, "HH:mm"),
                baking: moment.utc(`${(Math.floor(recipe.time.baking / 60))}:${(recipe.time.baking % 60)}`, "HH:mm"),
                total: moment.utc(`${(Math.floor(recipe.time.total / 60))}:${(recipe.time.total % 60)}`, "HH:mm"),
            },
        })
    });

    const {
        fields: stepsFields,
        append: stepsAppend,
        insert: stepsInsert,
        move: stepsMove,
        remove: stepsRemove,
    } = useFieldArray({
        control,
        name: "steps",
    });

    // split a step field into multiple fields based on linebreaks
    const splitSteps = useCallback((index: number) => {
        const field = getValues(`steps.${index}`);
        const isSection = field.isSection;
        const fieldText = field.text;
        const chunks = fieldText.split("\n\n").map(chunk => chunk.trim()).filter(chunk => chunk.length > 0);
        if (chunks.length <= 1) {
            return; // no extra work if there is no such double splits
        }

        stepsRemove(index);
        chunks.reverse().forEach((chunk, chunkIndex) => {
            // not changing section state of first split element
            if (chunkIndex == 0) {
                stepsInsert(index, { text: chunk, isSection })
            } else {
                // but created splits should be promoted by the user if necessary
                stepsInsert(index, { text: chunk, isSection: false })
            }
        })
    }, [getValues, stepsInsert, stepsRemove]);

    const {
        fields: ingredientsFields,
        append: ingredientsAppend,
        insert: ingredientsInsert,
        move: ingredientsMove,
        remove: ingredientsRemove,
    } = useFieldArray({
        control,
        name: "ingredients",
    });

    // split a step field into multiple fields based on linebreaks
    const splitIngredients = useCallback((index: number) => {
        const field = getValues(`ingredients.${index}`);
        const isSection = field.isSection;
        const fieldText = field.text;
        const chunks = fieldText.split("\n\n").map(chunk => chunk.trim()).filter(chunk => chunk.length > 0);
        if (chunks.length <= 1) {
            return; // no extra work if there is no such double splits
        }

        ingredientsRemove(index);
        chunks.reverse().forEach((chunk, chunkIndex) => {
            // not changing section state of first split element
            if (chunkIndex == 0) {
                ingredientsInsert(index, { text: chunk, isSection })
            } else {
                // but created splits should be promoted by the user if necessary
                ingredientsInsert(index, { text: chunk, isSection: false })
            }
        })
    }, [getValues, ingredientsInsert, ingredientsRemove]);



    const { fields: tagsFields, replace: tagsReplace } = useFieldArray({
        control,
        name: "tags",
    });

    const handleStepsDrag: OnDragEndResponder = ({ source, destination }) => {
        if (destination) {
            stepsMove(source.index, destination.index);
        }
    };

    const handleIngredientsDrag: OnDragEndResponder = ({ source, destination }) => {
        if (destination) {
            ingredientsMove(source.index, destination.index);
        }
    };


    const onSubmit = async (data: EditRecipeFormInput) => {

        const stepSections = convertStepsToStepSections(data.steps);
        const ingredientSections = convertIngredientsToIngredientSections(data.ingredients);

        // in order to save a recipe, we need to create the associated tags beforehand
        const tagIds = await Promise.all(
            data.tags.map(async (tag) => {
                const existingTag = await getTagByName(tag.name);

                let tagId: number;
                if (existingTag == undefined) {
                    const newTag: Tag = { name: tag.name, isFavorite: false };
                    tagId = await upsertTag(newTag)
                } else {
                    tagId = existingTag.id!;
                }

                return tagId;
            })
        );

        const recipeToSave: Recipe = {
            comments: data.comments,
            ingredientSections: ingredientSections,
            isFavorite: data.isFavorite,
            name: data.name,
            pictures: data.picture ? [data.picture] : [],
            portion: data.portion,
            source: data.source,
            stepSections: stepSections,
            time: {
                preparation: moment.duration(data.time.preparation.format("HH:mm")).asMinutes(),
                baking: moment.duration(data.time.baking.format("HH:mm")).asMinutes(),
                total: moment.duration(data.time.total.format("HH:mm")).asMinutes(),
            },
            tagIds
        };

        let id = recipe.id;
        // if creating a new recipe
        if (id === undefined) {
            id = await insertRecipe(recipeToSave);
        } else {
            recipeToSave.id = id;
            await upsertRecipe(recipeToSave);
        }
        navigate(getDetailsRecipeRoute(id));
    };

    return (
        <Paper sx={{ p: 2, flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            {
                formState.isLoading ? <CircularProgress /> :
                    <>
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
                                                    name="source"
                                                    label={t("Source")}
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


                                                <Autocomplete
                                                    sx={{
                                                        mr: 2, width: "100%"
                                                    }}
                                                    size="small"
                                                    multiple
                                                    freeSolo
                                                    disablePortal
                                                    filterSelectedOptions
                                                    value={tagsFields.map((field, index) => ({ name: watch(`tags.${index}`).name }))}
                                                    options={tags?.map(tag => ({ name: tag.name })) ?? []}
                                                    getOptionLabel={option => (option as { name: string }).name} // strange behaviour with typescript
                                                    onChange={(event, newValues) => {
                                                        // new value can be an object (selection of an option)
                                                        // or a string (freeSolo)
                                                        // we convert everything to object before updating state
                                                        const newValueObjects = newValues.map((value) => typeof value === "string" ? ({ name: sanitizeTagName(value) }) : value);
                                                        tagsReplace(newValueObjects);
                                                    }}


                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            placeholder={`${t("Tags")}...`}
                                                            fullWidth
                                                        />
                                                    )}
                                                />

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
                                                    <DragDropContext onDragEnd={handleIngredientsDrag}>
                                                        <Droppable droppableId="ingredients-items">
                                                            {(provided) => (
                                                                <Box
                                                                    ref={provided.innerRef}
                                                                    {...provided.droppableProps}
                                                                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                                                                >
                                                                    {ingredientsFields.map((step, index) => (
                                                                        <FormIngredientField
                                                                            key={`test[${index}]`}
                                                                            id={step.id}
                                                                            index={index}
                                                                            control={control}
                                                                            watch={watch}
                                                                            split={splitIngredients}
                                                                            remove={ingredientsRemove}
                                                                            minRows={2}
                                                                            textName={`ingredients.${index}.text`}
                                                                            isSectionName={`ingredients.${index}.isSection`}
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
                                                        onClick={() => ingredientsAppend({ text: "", isSection: false })}
                                                    >
                                                        <AddIcon />
                                                    </IconButton>
                                                </>

                                                : currentTabIndex == 2 ?
                                                    <>
                                                        <DragDropContext onDragEnd={handleStepsDrag}>
                                                            <Droppable droppableId="steps-items">
                                                                {(provided) => (
                                                                    <Box
                                                                        ref={provided.innerRef}
                                                                        {...provided.droppableProps}
                                                                        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                                                                    >
                                                                        {stepsFields.map((step, index) => (
                                                                            <FormStepField
                                                                                key={`test[${index}]`}
                                                                                id={step.id}
                                                                                index={index}
                                                                                control={control}
                                                                                watch={watch}
                                                                                split={splitSteps}
                                                                                remove={stepsRemove}
                                                                                minRows={2}
                                                                                textName={`steps.${index}.text`}
                                                                                isSectionName={`steps.${index}.isSection`}
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
                                                            onClick={() => stepsAppend({ text: "", isSection: false })}
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
                    </>
            }

        </Paper>
    )

}