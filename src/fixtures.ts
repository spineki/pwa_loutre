import { Recipe } from "./database/models/Recipe";
import { Tag } from "./database/models/Tag";

export const tutorialRecipe: Recipe = {
  comments:
    "You can write here personnal comments, thoughts or whatever makes you in the mood for cooking.",
  ingredientSections: [
    {
      title: "Conversions",
      ingredients: [
        "You can adjust the number of portion of recipes by using the loaf button in the bottom-right corner.",
        "A unit convert is available by clicking the 'scale' icon in the top-bar. ",
      ],
    },
    {
      title: "Editing a recipe",
      ingredients: [
        "Click the edit button in the bottom-right corner to edit this recipe",
        "Once you do it, you can read the rest of these ingredients",
      ],
    },
    {
      title: "Adding ingredients:",
      ingredients: ["Add an ingredient with the 'plus' button below."],
    },
    {
      title: "Left icons:",
      ingredients: [
        "Promote a text as section title with the star icon.",
        "Drag-and-drop by holding the handle at the left.",
      ],
    },
    {
      title: "Right icons:",
      ingredients: [
        "Click the three-dot icon to open a menu.",
        "Delete an ingredient with the trash icon.",
        "Split paragraphs into multiple fields with the split icon.\n\n try it \n\n yourself !",
      ],
    },
    {
      title: "Changing page:",
      ingredients: [
        "Try the round button in the bottom-right corner.",
        "Click on the page you want to edit.",
        "Don't forget to save with the save icon !",
      ],
    },
  ],
  isFavorite: true,
  name: "Tutorial",
  pictures: [],
  portion: 1,
  stepSections: [
    {
      title: "A section",
      steps: [
        "As for the ingredients, you can read here all the recipes steps.",
        "You can edit it too with the edit button below.",
      ],
    },
  ],
  source: "http://a-delicious-recipe.online",
  tagIds: [],
  time: {
    preparation: 1,
    baking: 2,
    total: 3,
  },
};

export const tutorialTags: Tag[] = [
  {
    isFavorite: false,
    name: "sweet",
  },
  {
    isFavorite: true,
    name: "salty",
  },
  {
    isFavorite: true,
    name: "spicy",
  },
];
