// Preferences ----------------------------------

import { database } from "../database";

// If a user preference already exists, does nothing
// else, create
export async function initUserPreferences() {
  const existingEntries = await database.preferences.toArray();

  if (existingEntries.length == 0) {
    // not found in the database, need to create it
    await database.preferences.put({ id: 0 });
  }
}

export async function getUserPreferedColorMode() {
  return (await database.preferences.get(0))?.colorMode;
}

export async function saveUserPreferedColorMode(colorMode: "light" | "dark") {
  return await database.preferences.update(0, { colorMode: colorMode });
}

export async function getUserPreferedLanguage() {
  return (await database.preferences.get(0))?.language;
}

export async function saveUserPreferedLanguage(language: string) {
  return await database.preferences.update(0, { language: language });
}
