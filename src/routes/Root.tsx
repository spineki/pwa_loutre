import { Outlet } from "react-router-dom";

import { AppNavbar } from "../components/AppNavbar";
import { Drawer } from "../components/Drawer";
import { CloudDialogContextProvider } from "../contexts/CloudDialogContext";
import { CloudDialog } from "../dialogs/CloudDialog";

export const RouteRootName = "/";

export function Root() {

    return (
        <CloudDialogContextProvider>
            <>
                <AppNavbar />
                <Drawer />
                <CloudDialog />
                <Outlet />
            </>
        </CloudDialogContextProvider>
    );
}