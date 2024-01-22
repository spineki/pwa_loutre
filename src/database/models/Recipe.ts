export type Time = {
  preparation: number;
  baking: number;
  total: number;
};

export type IngredientSection = {
  title?: string;
  ingredients: string[];
};

export type StepSection = {
  title?: string;
  steps: string[];
};

export interface Recipe {
  id?: number;
  comments: string;
  name: string;
  isFavorite: boolean;
  ingredientSections: IngredientSection[];
  portion: number;
  pictures: Blob[];
  source: string;
  stepSections: StepSection[];
  tagIds: number[]; // foreignkey for tags
  time: Time;
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
