import { RouteAllRecipesName } from "./AllRecipes";
import { RouteFavoriteRecipesName } from "./FavoriteRecipes";
import { RouteRootName } from "./Root";

export type RoutesType =
  | typeof RouteRootName
  | typeof RouteAllRecipesName
  | typeof RouteFavoriteRecipesName;
