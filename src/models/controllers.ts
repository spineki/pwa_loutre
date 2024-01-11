import { Recipe } from "./Recipe";
import { database } from "./database";

export async function getAllRecipes() {
  return await database.recipes.toArray();
}

/**
 * Add a recipe if it does not exist, else overwrite existing recipe
 * @param id
 * @param recipe
 */
export async function upsertRecipe(id: number, recipe: Recipe) {
  await database.recipes.put(recipe);
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
