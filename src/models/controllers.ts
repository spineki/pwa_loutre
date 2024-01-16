import { Recipe } from "./Recipe";
import { Tag } from "./Tag";
import { database } from "./database";

// TAGS -----------------------------------------

/**
 * Partially update an existing tags
 * @param id
 * @param changes
 */
export async function partialUpdateTag(id: number, changes: Partial<Tag>) {
  await database.tags.update(id, changes);
}

// RECIPES --------------------------------------
export async function getRecipeById(id: number) {
  return await database.recipes.get({ id });
}

export async function getAllRecipes() {
  return await database.recipes.toArray();
}

export async function bulkUpsertRecipes(recipes: Recipe[]) {
  await database.recipes.bulkPut(recipes);
}

/**
 * Add a recipe if it does not exist, else do nothing
 * @param recipe
 * @returns
 */
export async function insertRecipe(recipe: Recipe) {
  return (await database.recipes.add(recipe)) as number;
}

/**
 * Add a recipe if it does not exist, else overwrite existing recipe
 * @param recipe
 */
export async function upsertRecipe(recipe: Recipe) {
  return await database.recipes.put(recipe);
}

/**
 * Partially update an existing recipe
 * @param id
 * @param changes
 */
export async function partialUpdateRecipe(
  id: number,
  changes: Partial<Recipe>
) {
  await database.recipes.update(id, changes);
}

// Helpers

/**
 * Import into database recipes from a stringified list of recipes
 * @param content
 * @returns
 */
export async function importRecipesFromFileContent(content: string) {
  let recipes;
  try {
    recipes = JSON.parse(content);
  } catch (error: unknown) {
    console.error("An error occured while parsing files to json");
    return { error };
  }

  if (!Array.isArray(recipes)) {
    return { error: "The provided document does not contain an array" };
  }

  await bulkUpsertRecipes(recipes);
}
