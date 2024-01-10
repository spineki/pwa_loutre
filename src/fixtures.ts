import { Recipe } from "./models/Recipe";

export const fakeRecipes: Recipe[] = [
  {
    isFavorite: false,
    name: "Savory Sunset Chicken",
    pictures: ["/logo192.png"],
    time: {
      preparation: 1,
      baking: 2,
      total: 3,
    },
  },
  {
    isFavorite: true,
    name: "Tropical Fusion Delight",
    pictures: ["/fake_placeholder.jpg"],
    time: {
      preparation: 2,
      baking: 3,
      total: 4,
    },
  },
  {
    isFavorite: false,
    name: "Cinnamon Spiced Apples",
    pictures: ["/fake_placeholder.jpg"],
    time: {
      preparation: 5,
      baking: 6,
      total: 7,
    },
  },
  {
    isFavorite: true,
    name: "Lemon Zest Peach Surprise",
    pictures: ["/fake_placeholder.jpg"],
    time: {
      preparation: 3,
      baking: 4,
      total: 7,
    },
  },
  {
    isFavorite: false,
    name: "Mediterranean Chicken Delight",
    pictures: ["/fake_placeholder.jpg"],
    time: {
      preparation: 4,
      baking: 5,
      total: 9,
    },
  },
  {
    isFavorite: false,
    name: "Exquisite Homemade Spaghetti with Tomato Sauce and Basil Toppings",
    pictures: ["/fake_placeholder.jpg"],
    time: {
      preparation: 25,
      baking: 30,
      total: 55,
    },
  },
  {
    isFavorite: true,
    name: "Deliciously Rich Chocolate Layered Cake with Vanilla Frosting and Berries",
    pictures: ["/fake_placeholder.jpg"],
    time: {
      preparation: 40,
      baking: 35,
      total: 75,
    },
  },
  {
    isFavorite: false,
    name: "Savory Herb-Crusted Grilled Salmon with Lemon Butter Sauce and Roasted Vegetables",
    pictures: ["/fake_placeholder.jpg"],
    time: {
      preparation: 20,
      baking: 15,
      total: 35,
    },
  },
  {
    isFavorite: true,
    name: "Sumptuous Mediterranean-Style Stuffed Bell Peppers with Feta and Spinach",
    pictures: ["/fake_placeholder.jpg"],
    time: {
      preparation: 30,
      baking: 45,
      total: 75,
    },
  },
  {
    isFavorite: false,
    name: "Flavorful",
    pictures: ["/fake_placeholder.jpg"],
    time: {
      preparation: 20,
      baking: 180,
      total: 200,
    },
  },
];
