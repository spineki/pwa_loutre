import { useContext } from "react";

import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import { styled } from "@mui/material/styles";

import CloudIcon from "@mui/icons-material/CloudQueue";
import ScaleIcon from "@mui/icons-material/Scale";

import { CloudDialogContext } from "../contexts/CloudDialogContext";
import { ConversionDialogContext } from "../contexts/ConversionDialogContext";
import { DrawerContext } from "../contexts/DrawerContext";
import { SearchBar } from "./SearchBar";


// An offset is required to make some room for the appNavbar (scrolling issue)
const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

export function AppNavbar() {

    const {
        toggleDrawer
    } = useContext(DrawerContext);

    const {
        setShowDialog: setShowCloudDialog
    } = useContext(CloudDialogContext);

    const {
        setShowDialog: setShowConversionDialog
    } = useContext(ConversionDialogContext);

    const openCloudDialog = () => {
        setShowCloudDialog(true);
    }
    const openConversionDialog = () => {
        setShowConversionDialog(true);
    }

    return (
        <Box>
            <AppBar position="fixed" >
                <Toolbar sx={{ paddingRight: 0 }}>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        sx={{ mr: 2 }}
                        onClick={() => toggleDrawer()}
                    >
                        <MenuIcon />
                    </IconButton>

                    <SearchBar />
                    <Box sx={{ flexGrow: 1 }} />
                    <IconButton
                        size="medium"
                        edge="start"
                        color="inherit"
                        sx={{ mr: 1 }}
                        onClick={openCloudDialog}
                    >
                        <CloudIcon fontSize="medium" />
                    </IconButton>

                    <IconButton
                        size="medium"
                        edge="start"
                        color="inherit"
                        sx={{ mr: 1 }}
                        onClick={openConversionDialog}
                    >
                        <ScaleIcon fontSize="medium" />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Offset />
        </Box>
    );
}