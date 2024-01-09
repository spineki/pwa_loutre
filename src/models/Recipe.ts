export type Time = {
  preparation: number;
  baking: number;
  total: number;
};

export type Recipe = {
  id: number;
  name: string;
  isFavorite: boolean;
  // steps: string[];
  // comments: string[];
  time: Time;
  // ingredients: string[];
  // source: string;
  // portion: number;
  pictures: string[];
  // category: string;
  // tags: string[];
};
