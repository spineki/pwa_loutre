import Dexie, { Table } from "dexie";

import { Recipe } from "./Recipe";
import { Tag } from "./Tag";

export class MySubClassedDexie extends Dexie {
  recipes!: Table<Recipe>;
  tags!: Table<Tag>;

  constructor() {
    super("database");
    this.version(1.1).stores({
      recipes: "++id, name, isFavorite", // Primary key and indexed props for recipes
      tags: "++id, name, isFavorite", // Primary key and indexed props for tags
    });
  }
}

export const database = new MySubClassedDexie();
