import { RouteAllRecipesName } from "./AllRecipes";
import { RouteWorkInProgressName } from "./WorkInProgress";
import { RouteFavoriteRecipesName } from "./FavoriteRecipes";
import { RouteRootName } from "./Root";
import { RouteChangelogsName } from "./Changelogs";
import { RouteTagsName } from "./Tags";

export type RoutesType =
  | typeof RouteRootName
  | typeof RouteAllRecipesName
  | typeof RouteFavoriteRecipesName
  | typeof RouteChangelogsName
  | typeof RouteTagsName
  | typeof RouteWorkInProgressName;
