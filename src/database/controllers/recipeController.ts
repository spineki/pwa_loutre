import { z } from "zod";

import { tutorialRecipe, tutorialTags } from "../../fixtures";
import { Result } from "../../utils/errorHandling";
import { database } from "../database";
import { Recipe, RecipeSchema } from "../models/Recipe";
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
  changes: Partial<Recipe>,
) {
  await database.recipes.update(id, changes);
}

// Helpers

/**
 * Import into database recipes from a stringified list of recipes
 * @param content
 * @returns
 */
export async function importRecipesFromFileContent(
  content: string,
): Promise<Result<null, z.ZodError<string>>> {
  const result = z
    .custom<string>((content) => {
      try {
        JSON.parse(content as string);
      } catch (error) {
        return false;
      }
      return true;
    }, "An error occured while parsing files to json")
    .transform((content) => JSON.parse(content))
    .pipe(RecipeSchema.array())
    .safeParse(content);

  if (result.success) {
    const recipes = result.data;
    recipes.forEach((recipe) => {
      if (recipe.id) {
        delete recipe.id;
      }
    });
    await bulkUpsertRecipes(recipes);
    return { success: true };
  } else {
    return { success: false, error: result.error };
  }
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
      }),
    ),
  );

  // adding recipe to database
  await insertRecipe({ ...tutorialRecipe, tagIds });
}
