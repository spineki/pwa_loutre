import Dexie, { Table } from "dexie";

import { Preferences } from "./models/Preferences";
import { Recipe } from "./models/Recipe";
import { Tag } from "./models/Tag";

export const database_version = 1.3;

export class MySubClassedDexie extends Dexie {
  recipes!: Table<Recipe>;
  tags!: Table<Tag>;
  preferences!: Table<Preferences>;

  constructor() {
    super("database");
    this.version(database_version).stores({
      recipes: "++id, name", // Primary key and indexed props for recipes
      tags: "++id, name", // Primary key and indexed props for tags
      preferences: "id",
    });
  }
}

export const database = new MySubClassedDexie();
