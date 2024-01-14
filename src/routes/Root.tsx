import { Outlet } from "react-router-dom";

import Box from "@mui/material/Box";

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
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    flex: 1
                }}>
                    <AppNavbar />
                    <Drawer />
                    <CloudDialog />
                    <ConversionDialog />
                    <Outlet />
                </Box>
            </ConversionDialogContextProvider>
        </CloudDialogContextProvider>
    );
}