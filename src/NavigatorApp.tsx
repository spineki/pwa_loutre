import {
    createBrowserRouter,
    Navigate,
    RouterProvider,
} from "react-router-dom";

import { Root } from "./routes/Root";
import { NotFound } from "./routes/NotFound";
import { DrawerContextProvider } from "./contexts/drawer_context";
import { AllRecipes, RouteAllRecipesName } from "./routes/AllRecipes";
import { FavoriteRecipes, RouteFavoriteRecipesName } from "./routes/FavoriteRecipes";


const router = createBrowserRouter([
    {
        path: "/*",
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

