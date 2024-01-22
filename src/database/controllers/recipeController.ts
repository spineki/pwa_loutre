import { tutorialRecipe, tutorialTags } from "../../fixtures";
import { database } from "../database";
import { Recipe } from "../models/Recipe";
import { getTagByName, upsertTag } from "./tagController";

// RECIPES --------------------------------------
export async function getRecipeCount() {
  return await database.recipes.count();
}

export async function getRecipeById(id: number) {
  return await database.recipes.get({ id });
}

export async function getAllRecipes() {
  return await database.recipes.orderBy("name").toArray();
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

export async function initTutorialRecipe() {
  // add a tutorial recipe and add tutorial tags to it
  if ((await database.recipes.count()) !== 0) {
    // only adding tutorial recipe if there is no other recipes
    return;
  }

  // adding tags to database
  const tagIds = await Promise.all(
    tutorialTags.map((tutorialTag) =>
      getTagByName(tutorialTag.name).then((tag) => {
        if (tag === undefined) {
          return upsertTag(tutorialTag);
        }
        return tag.id!;
      })
    )
  );

  // adding recipe to database
  await insertRecipe({ ...tutorialRecipe, tagIds });
}
