import { z } from "zod";

import { tutorialRecipe, tutorialTags } from "../../fixtures";
import { Result } from "../../utils/errorHandling";
import { database } from "../database";
import { fastForward } from "../helpers";
import {
  Recipe,
  ShareFileSchema,
  getRecipeFromJSonCompatibleRecipe,
} from "../models/Recipe";
import { getTagByName, upsertTag } from "./tagController";

// RECIPES --------------------------------------
export async function getRecipeCount(
  filter: (recipe: Recipe) => boolean = () => true,
) {
  return await database.recipes.filter(filter).count();
}

export async function getRecipeById(id: number) {
  return await database.recipes.get({ id });
}

export async function getAllRecipes() {
  return await database.recipes.orderBy("name").toArray();
}

export async function getFilteredRecipes(
  filter: (recipe: Recipe) => boolean,
): Promise<Recipe[]> {
  const recipes = await database.recipes
    .orderBy("name") // Utilize index for sorting
    .filter(filter)
    .toArray();

  return recipes;
}

export async function getFirstPaginatedRecipes(
  pageSize: number,
  filter: (recipe: Recipe) => boolean = () => true,
): Promise<Recipe[]> {
  const page = await database.recipes
    .orderBy("name") // Utilize index for sorting
    .filter(filter)
    .limit(pageSize)
    .toArray();

  return page;
}

export async function getPaginatedRecipes(
  lastRecipe: Pick<Recipe, "id" | "name">,
  pageSize: number,
  filter: (recipe: Recipe) => boolean = () => true,
): Promise<Recipe[]> {
  const page = await database.recipes
    // Use index to fast forward as much as possible
    // This line is what makes the paging optimized
    .where("name")
    .aboveOrEqual(lastRecipe.name) // makes it sorted by name
    // Use helper function to fast forward to the exact last result:
    .filter(fastForward(lastRecipe.id, "id", filter))
    // Limit to page size:
    .limit(pageSize)
    .toArray();

  return page;
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
 * It also ensures that removed tags that are not part of another recipe are delete from the database.
 * @param recipe
 */
export async function upsertRecipe(recipe: Recipe & { id: number }) {
  // getting previous existing recipe
  const previousRecipe = await database.recipes.get(recipe.id);

  // updating database recipe
  await database.recipes.put(recipe);

  // Post process, checking if

  if (previousRecipe !== undefined) {
    // If a tagId was only linked to this recipe, delete it
    const tagIds = previousRecipe.tagIds;

    //? note: this is really not great performance-wise. A better alternative would be to have some foreign key consistency.
    //? But as far as I know, there is no such thing in indexDB, and thus neither in dexie
    for (const tagId of tagIds) {
      const nbRecipeHavingThisTagId = await database.recipes
        .filter((recipe) => recipe.tagIds.includes(tagId))
        .count();
      if (nbRecipeHavingThisTagId == 0) {
        await database.tags.delete(tagId);
      }
    }
  }
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

export async function deleteRecipe(id: number) {
  const existingRecipe = await getRecipeById(id);

  // not deleting an existing recipe
  if (existingRecipe == undefined) {
    return;
  }

  await database.recipes.delete(id);

  // If a tagId was only linked to this recipe, delete it
  const tagIds = existingRecipe.tagIds;

  //? note: this is really not great performance-wise. A better alternative would be to have some foreign key consistency.
  //? But as far as I know, there is no such thing in indexDB, and thus neither in dexie
  for (const tagId of tagIds) {
    const nbRecipeHavingThisTagId = await database.recipes
      .filter((recipe) => recipe.tagIds.includes(tagId))
      .count();
    if (nbRecipeHavingThisTagId == 0) {
      await database.tags.delete(tagId);
    }
  }
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
    .pipe(ShareFileSchema)
    .safeParse(content);

  if (result.success) {
    const version = result.data.version;

    const recipes = await Promise.all(
      // eslint-disable-next-line
      result.data.recipes.map((jsonCompatibleRecipe) =>
        getRecipeFromJSonCompatibleRecipe(jsonCompatibleRecipe),
      ),
    );

    // todo, add extra verifications thanks to recipes version
    console.log("Importing recipes from version", version);

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
