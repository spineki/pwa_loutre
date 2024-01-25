import { z } from "zod";

const TimeSchema = z.object({
  preparation: z.number().nonnegative().default(0),
  baking: z.number().nonnegative().default(0),
  total: z.number().nonnegative().default(0),
});

export type Time = z.infer<typeof TimeSchema>;

const IngredientSectionSchema = z.object({
  title: z.string().optional(),
  ingredients: z.string().array(),
});

export type IngredientSection = z.infer<typeof IngredientSectionSchema>;

const StepSectionSchema = z.object({
  title: z.string().optional(),
  steps: z.string().array(),
});

export type StepSection = z.infer<typeof StepSectionSchema>;

export const RecipeSchema = z.object({
  id: z.number().optional(),
  comments: z.string().default(""),
  name: z.string(),
  isFavorite: z.boolean().default(false),
  ingredientSections: IngredientSectionSchema.array().default([]),
  portion: z.number().positive().default(1),
  pictures: z.instanceof(Blob).array().default([]),
  source: z.string().default(""),
  stepSections: StepSectionSchema.array().default([]),
  tagIds: z.number().array().default([]), // foreign key for tags
  time: TimeSchema,
});

export type Recipe = z.infer<typeof RecipeSchema>;

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
