import { z } from "zod";
import { getBase64FromBlob, getBlobFromBase64 } from "../../utils/files";

const TimeSchema = z
  .object({
    preparation: z.number().nonnegative(),
    baking: z.number().nonnegative(),
    total: z.number().nonnegative(),
  })
  .strict();

export type Time = z.infer<typeof TimeSchema>;

const IngredientSectionSchema = z
  .object({
    title: z.string().optional(),
    ingredients: z.string().array(),
  })
  .strict();

export type IngredientSection = z.infer<typeof IngredientSectionSchema>;

const StepSectionSchema = z
  .object({
    title: z.string().optional(),
    steps: z.string().array(),
  })
  .strict();

export type StepSection = z.infer<typeof StepSectionSchema>;

export const RecipeSchema = z
  .object({
    id: z.number().optional(),
    comments: z.string(),
    name: z.string(),
    isFavorite: z.boolean().default(false),
    ingredientSections: IngredientSectionSchema.array(),
    portion: z.number().positive().default(1),
    pictures: z.instanceof(Blob).array(),
    source: z.string(),
    stepSections: StepSectionSchema.array(),
    tagIds: z.number().array().default([]), // foreign key for tags
    time: TimeSchema,
  })
  .strict();

export type Recipe = z.infer<typeof RecipeSchema>;

// a recipe stored in a file and given as input
export const JsonCompatibleRecipeSchema = RecipeSchema.omit({ pictures: true })
  .extend({
    pictures: z.string().array(),
  })
  .strict();

export type JsonCompatibleRecipe = z.infer<typeof JsonCompatibleRecipeSchema>;

export async function getJsonCompatibleRecipe(
  recipe: Recipe,
): Promise<JsonCompatibleRecipe> {
  // eslint-disable-next-line
  const { id, pictures, ...rest } = recipe;

  const jsonCompatibleRecipe: JsonCompatibleRecipe = {
    ...rest,
    pictures: (await Promise.all(
      pictures.map((picture) => getBase64FromBlob(picture)),
    )) as string[],
  };

  return jsonCompatibleRecipe;
}

export async function getRecipeFromJSonCompatibleRecipe(
  jsonCompatibleRecipe: JsonCompatibleRecipe,
): Promise<Recipe> {
  // eslint-disable-next-line
  const { id, pictures, ...rest } = jsonCompatibleRecipe;

  const recipe: Recipe = {
    ...rest,
    pictures: await Promise.all(
      pictures.map((picture) => getBlobFromBase64(picture)),
    ),
  };

  return recipe;
}
/**
 * Create an empty recipe object (could be seen as an empty constructor)
 */
export function getEmptyRecipe(): Recipe {
  return {
    comments: "",
    name: "",
    isFavorite: false,
    ingredientSections: [],
    portion: 1,
    pictures: [],
    source: "",
    stepSections: [],
    tagIds: [],
    time: {
      preparation: 0,
      baking: 0,
      total: 0,
    },
  };
}
