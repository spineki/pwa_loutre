export type Time = {
  preparation: number;
  baking: number;
  total: number;
};

export interface Recipe {
  id?: number;
  name: string;
  isFavorite: boolean;
  // comments: string[];
  ingredients: string[];
  // source: string;
  // portion: number;
  pictures: string[];
  steps: string[];
  time: Time;
  // category: string;
  // tags: string[];
}
