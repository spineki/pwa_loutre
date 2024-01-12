import {
    createBrowserRouter,
    Navigate,
    RouterProvider,
} from "react-router-dom";

import { Root } from "./routes/Root";
import { NotFound } from "./routes/NotFound";
import { DrawerContextProvider } from "./contexts/DrawerContext";
import { AllRecipes, RouteAllRecipesName } from "./routes/AllRecipes";
import { FavoriteRecipes, RouteFavoriteRecipesName } from "./routes/FavoriteRecipes";
import { WorkInProgress, RouteWorkInProgressName } from "./routes/WorkInProgress";
import { Changelogs, RouteChangelogsName } from "./routes/Changelogs";


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
                path: RouteFavoriteRecipesName,
                element: <FavoriteRecipes />,
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

