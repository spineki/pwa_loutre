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
