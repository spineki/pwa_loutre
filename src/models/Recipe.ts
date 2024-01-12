export type Time = {
  preparation: number;
  baking: number;
  total: number;
};

export interface Recipe {
  id?: number;
  comments: string;
  name: string;
  isFavorite: boolean;
  ingredients: string[];
  // source: string;
  // portion: number;
  pictures: string[];
  steps: string[];
  time: Time;
  // category: string;
  // tags: string[];
}
