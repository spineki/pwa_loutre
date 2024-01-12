import { RouteAllRecipesName } from "./AllRecipes";
import { RouteWorkInProgressName } from "./WorkInProgress";
import { RouteFavoriteRecipesName } from "./FavoriteRecipes";
import { RouteRootName } from "./Root";
import { RouteChangelogsName } from "./Changelogs";

export type RoutesType =
  | typeof RouteRootName
  | typeof RouteAllRecipesName
  | typeof RouteFavoriteRecipesName
  | typeof RouteChangelogsName
  | typeof RouteWorkInProgressName;
