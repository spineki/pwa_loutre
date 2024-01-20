import { Recipe } from "./models/Recipe";
import { Tag } from "./models/Tag";

export const fakeRecipes: Recipe[] = [
  {
    comments: "",
    ingredientSections: [
      { ingredients: ["1 baguette", "1 carotte", "2 oignons"] },
    ],
    isFavorite: false,
    name: "Savory Sunset Chicken",
    pictures: [],
    portion: 1,
    stepSections: [],
    source: "",
    tagIds: [],
    time: {
      preparation: 1,
      baking: 2,
      total: 3,
    },
  },
  {
    comments: "",
    ingredientSections: [],
    isFavorite: true,
    name: "Tropical Fusion Delight",
    pictures: [],
    portion: 1,
    stepSections: [],
    source: "",
    tagIds: [],
    time: {
      preparation: 2,
      baking: 3,
      total: 4,
    },
  },
  {
    comments:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
    ingredientSections: [
      {
        title: "first section",
        ingredients: ["1 cinnammon", "1 spice", "2 onions"],
      },
      {
        title: "second section",
        ingredients: ["1 baguette", "1 / 2 cheese"],
      },
    ],
    isFavorite: false,
    name: "Cinnamon Spiced Apples",
    pictures: [],
    portion: 1,
    source: "",
    stepSections: [
      {
        title: "section 1",
        steps: [
          "step1",
          "step2",
          "a very long step i agree slqdfldsq h ljhfslk jh h jhk jh khk hk hk jhkh kh k hk hlh lig i  hj jhjhljhsql hjljhlkjhlkjh ljkh kjhlkjhlk jh lkhlkjh lkjhl kjh l",
          "step4",
        ],
      },
      {
        title: "section 2",
        steps: [
          "step1",
          "step2",
          "a very long step i agree slqdfldsq h ljhfslk jh h jhk jh khk hk hk jhkh kh k hk hlh lig i  hj jhjhljhsql hjljhlkjhlkjh ljkh kjhlkjhlk jh lkhlkjh lkjhl kjh l",
          "step4",
        ],
      },
    ],
    tagIds: [],
    time: {
      preparation: 5,
      baking: 6,
      total: 7,
    },
  },
  {
    comments: "",
    ingredientSections: [],
    isFavorite: true,
    name: "Lemon Zest Peach Surprise",
    pictures: [],
    portion: 1,
    stepSections: [],
    source: "",
    tagIds: [],
    time: {
      preparation: 3,
      baking: 4,
      total: 7,
    },
  },
  {
    comments: "",
    ingredientSections: [],
    isFavorite: false,
    name: "Mediterranean Chicken Delight",
    pictures: [],
    portion: 1,
    stepSections: [],
    source: "",
    tagIds: [],
    time: {
      preparation: 4,
      baking: 5,
      total: 9,
    },
  },
  {
    comments: "",
    ingredientSections: [],
    isFavorite: false,
    name: "Exquisite Homemade Spaghetti with Tomato Sauce and Basil Toppings",
    pictures: [],
    portion: 1,
    stepSections: [],
    source: "",
    tagIds: [],
    time: {
      preparation: 25,
      baking: 30,
      total: 55,
    },
  },
  {
    comments: "",
    ingredientSections: [],
    isFavorite: true,
    name: "Deliciously Rich Chocolate Layered Cake with Vanilla Frosting and Berries",
    pictures: [],
    portion: 1,
    stepSections: [],
    source: "",
    tagIds: [],
    time: {
      preparation: 40,
      baking: 35,
      total: 75,
    },
  },
  {
    comments: "",
    ingredientSections: [],
    isFavorite: false,
    name: "Savory Herb-Crusted Grilled Salmon with Lemon Butter Sauce and Roasted Vegetables",
    pictures: [],
    portion: 1,
    stepSections: [],
    source: "",
    tagIds: [],
    time: {
      preparation: 20,
      baking: 15,
      total: 35,
    },
  },
  {
    comments: "",
    ingredientSections: [],
    isFavorite: true,
    name: "Sumptuous Mediterranean-Style Stuffed Bell Peppers with Feta and Spinach",
    pictures: [],
    portion: 1,
    stepSections: [],
    source: "",
    tagIds: [],
    time: {
      preparation: 30,
      baking: 45,
      total: 75,
    },
  },
  {
    comments: "",
    ingredientSections: [],
    isFavorite: false,
    name: "Flavorful",
    pictures: [],
    portion: 1,
    stepSections: [],
    source: "",
    tagIds: [],
    time: {
      preparation: 20,
      baking: 180,
      total: 200,
    },
  },
];

export const fakeTags: Tag[] = [
  {
    isFavorite: false,
    name: "sweet",
  },
  {
    isFavorite: false,
    name: "fish",
  },
  {
    isFavorite: false,
    name: "beverage",
  },
  {
    isFavorite: true,
    name: "spicy",
  },
  {
    isFavorite: false,
    name: "fruit",
  },
  {
    isFavorite: false,
    name: "vegetarian",
  },
  {
    isFavorite: false,
    name: "dessert",
  },
  {
    isFavorite: false,
    name: "coffee",
  },
  {
    isFavorite: false,
    name: "grilled",
  },
  {
    isFavorite: true,
    name: "italian",
  },
  {
    isFavorite: false,
    name: "saucy",
  },
  {
    isFavorite: false,
    name: "juicy",
  },
  {
    isFavorite: false,
    name: "refreshing",
  },
  {
    isFavorite: false,
    name: "nutty",
  },
  {
    isFavorite: false,
    name: "spicy-sweet",
  },
];
