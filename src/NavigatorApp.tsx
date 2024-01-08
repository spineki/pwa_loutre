import React from "react";
import { AppNavbar } from "./components/AppNavbar";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import { Root } from "./routes/Root";
import { NotFound } from "./routes/NotFound";
import { Drawer } from "./components/Drawer";
import { DrawerContextProvider } from "./contexts/drawer_context";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <NotFound />
    },
]);

export function NavigatorApp() {
    return (
        <DrawerContextProvider>
            <>
                <AppNavbar />
                <Drawer />
                <RouterProvider router={router} />
            </>
        </DrawerContextProvider>
    );
}

