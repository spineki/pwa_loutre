import { Outlet } from "react-router-dom";

import { AppNavbar } from "../components/AppNavbar";
import { Drawer } from "../components/Drawer";
import { CloudDialogContextProvider } from "../contexts/CloudDialogContext";
import { CloudDialog } from "../dialogs/CloudDialog";
import { ConversionDialogContextProvider } from "../contexts/ConversionDialogContext";
import { ConversionDialog } from "../dialogs/ConversionDialog";

export const RouteRootName = "/";

export function Root() {

    return (
        <CloudDialogContextProvider>
            <ConversionDialogContextProvider>
                <>
                    <AppNavbar />
                    <Drawer />
                    <CloudDialog />
                    <ConversionDialog />
                    <Outlet />
                </>
            </ConversionDialogContextProvider>
        </CloudDialogContextProvider>
    );
}