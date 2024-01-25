import { z } from "zod";

const TimeSchema = z.object({
  preparation: z.number().positive(),
  baking: z.number().positive(),
  total: z.number().positive(),
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

const RecipeSchema = z.object({
  id: z.number().optional(),
  comments: z.string(),
  name: z.string(),
  isFavorite: z.boolean(),
  ingredientSections: IngredientSectionSchema.array(),
  portion: z.number().positive(),
  pictures: z.instanceof(Blob).array(),
  source: z.string(),
  stepSections: StepSectionSchema.array(),
  tagIds: z.number().array(), // foreign key for tags
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
