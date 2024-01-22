export const RouteRootName = "/";
export const RouteAllRecipesName = "/recipes";
export const RouteDetailsRecipesName = "/recipes/:id";
export const RouteEditRecipeName = "/recipes/:id/edit";
export const RouteCreateRecipeName = "/recipes/create";
export const RouteFavoriteRecipesName = "/favorites";
export const RouteWorkInProgressName = "/work-in-progress";
export const RouteTagsName = "/tags";
export const RouteChangelogsName = "/changelogs";

/**
 * Create an absolute path for a detail route page for the given recipe id
 * @param id 
 * @returns 
 */
export function getDetailsRecipeRoute(id: number): string {
    return `/recipes/${id}`;
}

export function getEditRecipeRoute(id: number): string {
    return `/recipes/${id}/edit`;
}

export type RoutesType =
    | typeof RouteRootName
    | typeof RouteAllRecipesName
    | typeof RouteDetailsRecipesName
    | typeof RouteEditRecipeName
    | typeof RouteFavoriteRecipesName
    | typeof RouteWorkInProgressName
    | typeof RouteTagsName
    | typeof RouteChangelogsName;
