import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import { DrawerContextProvider } from "./contexts/DrawerContext";
import { AllRecipes } from "./routes/AllRecipes";
import { Changelogs } from "./routes/Changelogs";
import { DetailsRecipe, detailsRecipeLoader } from "./routes/DetailsRecipe";
import {
  createRecipeLoader,
  EditRecipe,
  editRecipeLoader,
} from "./routes/EditRecipe";
// import { FavoriteRecipes } from "./routes/FavoriteRecipes";
import { NotFound } from "./routes/NotFound";
import { Root } from "./routes/Root";
import {
  RouteAllRecipesName,
  RouteChangelogsName,
  RouteCreateRecipeName,
  RouteDetailsRecipesName,
  RouteEditRecipeName,
  // RouteFavoriteRecipesName,
  RouteTagsName,
  RouteWorkInProgressName,
} from "./routes/routes";
import { Tags } from "./routes/Tags";
import { WorkInProgress } from "./routes/WorkInProgress";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Navigate to={RouteAllRecipesName} replace />,
      },
      {
        path: RouteAllRecipesName,
        element: <AllRecipes />,
      },
      {
        path: RouteDetailsRecipesName,
        element: <DetailsRecipe />,
        loader: detailsRecipeLoader,
        errorElement: <NotFound />,
      },
      // {
      //   path: RouteFavoriteRecipesName,
      //   element: <FavoriteRecipes />,
      // },
      {
        path: RouteTagsName,
        element: <Tags />,
      },
      {
        path: RouteEditRecipeName,
        element: <EditRecipe />,
        loader: editRecipeLoader,
        errorElement: <NotFound />,
      },
      {
        path: RouteCreateRecipeName,
        element: <EditRecipe />,
        loader: createRecipeLoader,
      },
      {
        path: RouteChangelogsName,
        element: <Changelogs />,
      },
      {
        path: RouteWorkInProgressName,
        element: <WorkInProgress />,
      },
    ],
  },
]);

export function NavigatorApp() {
  return (
    <DrawerContextProvider>
      <RouterProvider router={router} />
    </DrawerContextProvider>
  );
}
