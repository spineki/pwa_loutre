import { Outlet, useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";

import { AppNavbar } from "../components/AppNavbar";
import { ConsecutiveMessageSnackbar } from "../components/ConsecutiveMessageSnackbar";
import { Drawer } from "../components/Drawer";
import { CloudDialogContextProvider } from "../contexts/CloudDialogContext";
import { ConversionDialogContextProvider } from "../contexts/ConversionDialogContext";
import { CloudDialog } from "../dialogs/CloudDialog";
import { ConversionDialog } from "../dialogs/ConversionDialog";
import { useEffect } from "react";

export function Root() {
  const navigate = useNavigate();
  useEffect(() => {
    // we want users to go back to the main page wen they use the back button
    window.onpopstate = () => {
      navigate("/");
    };
  }, []);

  return (
    <CloudDialogContextProvider>
      <ConversionDialogContextProvider>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
          }}
        >
          <AppNavbar />
          <Drawer />
          <CloudDialog />
          <ConversionDialog />
          <ConsecutiveMessageSnackbar />
          <Outlet />
        </Box>
      </ConversionDialogContextProvider>
    </CloudDialogContextProvider>
  );
}
