import { Recipe } from "./models/Recipe";

export const fakeRecipes: Recipe[] = [
  {
    ingredients: ["1 baguette", "1 carotte", "2 oignons"],
    isFavorite: false,
    name: "Savory Sunset Chicken",
    pictures: ["/logo192.png"],
    steps: [],
    time: {
      preparation: 1,
      baking: 2,
      total: 3,
    },
  },
  {
    ingredients: [],
    isFavorite: true,
    name: "Tropical Fusion Delight",
    pictures: ["/fake_placeholder.jpg"],
    steps: [],
    time: {
      preparation: 2,
      baking: 3,
      total: 4,
    },
  },
  {
    ingredients: ["1 cinnammon", "1 spice", "2 onions"],
    isFavorite: false,
    name: "Cinnamon Spiced Apples",
    pictures: ["/fake_placeholder.jpg"],
    steps: [
      "step1",
      "step2",
      "a very long step i agree slqdfldsq h ljhfslk jh h jhk jh khk hk hk jhkh kh k hk hlh lig i  hj jhjhljhsql hjljhlkjhlkjh ljkh kjhlkjhlk jh lkhlkjh lkjhl kjh l",
      "step4",
    ],
    time: {
      preparation: 5,
      baking: 6,
      total: 7,
    },
  },
  {
    ingredients: [],
    isFavorite: true,
    name: "Lemon Zest Peach Surprise",
    pictures: ["/fake_placeholder.jpg"],
    steps: [],
    time: {
      preparation: 3,
      baking: 4,
      total: 7,
    },
  },
  {
    ingredients: [],
    isFavorite: false,
    name: "Mediterranean Chicken Delight",
    pictures: ["/fake_placeholder.jpg"],
    steps: [],
    time: {
      preparation: 4,
      baking: 5,
      total: 9,
    },
  },
  {
    ingredients: [],
    isFavorite: false,
    name: "Exquisite Homemade Spaghetti with Tomato Sauce and Basil Toppings",
    pictures: ["/fake_placeholder.jpg"],
    steps: [],
    time: {
      preparation: 25,
      baking: 30,
      total: 55,
    },
  },
  {
    ingredients: [],
    isFavorite: true,
    name: "Deliciously Rich Chocolate Layered Cake with Vanilla Frosting and Berries",
    pictures: ["/fake_placeholder.jpg"],
    steps: [],
    time: {
      preparation: 40,
      baking: 35,
      total: 75,
    },
  },
  {
    ingredients: [],
    isFavorite: false,
    name: "Savory Herb-Crusted Grilled Salmon with Lemon Butter Sauce and Roasted Vegetables",
    pictures: ["/fake_placeholder.jpg"],
    steps: [],
    time: {
      preparation: 20,
      baking: 15,
      total: 35,
    },
  },
  {
    ingredients: [],
    isFavorite: true,
    name: "Sumptuous Mediterranean-Style Stuffed Bell Peppers with Feta and Spinach",
    pictures: ["/fake_placeholder.jpg"],
    steps: [],
    time: {
      preparation: 30,
      baking: 45,
      total: 75,
    },
  },
  {
    ingredients: [],
    isFavorite: false,
    name: "Flavorful",
    pictures: ["/fake_placeholder.jpg"],
    steps: [],
    time: {
      preparation: 20,
      baking: 180,
      total: 200,
    },
  },
];
