export type Time = {
  preparation: number;
  baking: number;
  total: number;
};

export type IngredientSection = {
  title?: string;
  ingredients: string[];
};

export interface Recipe {
  id?: number;
  comments: string;
  name: string;
  isFavorite: boolean;
  ingredientSections: IngredientSection[];
  // source: string;
  portion: number;
  pictures: string[];
  steps: string[];
  time: Time;
  // category: string;
  // tags: string[];
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
    steps: [],
    time: {
      preparation: 0,
      baking: 0,
      total: 0,
    },
  };
}
