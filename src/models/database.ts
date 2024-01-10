import Dexie, { Table } from "dexie";
import { Recipe } from "./Recipe";

export class MySubClassedDexie extends Dexie {
  recipes!: Table<Recipe>;

  constructor() {
    super("database");
    this.version(1).stores({
      recipes: "++id, name, isFavorite, time, pictures", // Primary key and indexed props
    });
  }
}

export const database = new MySubClassedDexie();
