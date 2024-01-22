// TAGS -----------------------------------------

import { database } from "../database";
import { Tag } from "../models/Tag";

export async function getTagCount() {
  return await database.tags.count();
}

export async function getAllTags() {
  return await database.tags.orderBy("name").toArray();
}

export async function getTagsByIds(ids: number[]) {
  return await database.tags.bulkGet(ids);
}

export async function getTagByName(name: string) {
  return await database.tags.get({ name });
}

/**
 * Add a tag if it does not exist, else overwrite existing tag
 *
 * @param tag
 */
export async function upsertTag(tag: Tag) {
  return (await database.tags.put(tag)) as number;
}

/**
 * Partially update an existing tags
 * @param id
 * @param changes
 */
export async function partialUpdateTag(id: number, changes: Partial<Tag>) {
  await database.tags.update(id, changes);
}
