import { Outlet } from "react-router-dom";
import { AppNavbar } from "../components/AppNavbar";
import { Drawer } from "../components/Drawer";

export const RouteRootName = "/";

export function Root() {
    return (
        <>
            <AppNavbar />
            <Drawer />
            <Outlet />
        </>
    );
}