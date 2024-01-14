import { useContext } from "react";

import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from '@mui/icons-material/Menu';
import { styled, alpha } from '@mui/material/styles';
import InputBase from "@mui/material/InputBase";

import SearchIcon from '@mui/icons-material/Search';
import CloudIcon from '@mui/icons-material/CloudQueue';
import ScaleIcon from '@mui/icons-material/Scale';

import { DrawerContext } from "../contexts/DrawerContext";
import { CloudDialogContext } from "../contexts/CloudDialogContext";
import { ConversionDialogContext } from "../contexts/ConversionDialogContext";

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));


const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

// An offset is required to make some room for the appNavbar (scrolling issue)
const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

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
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        sx={{ mr: 2 }}
                        onClick={() => toggleDrawer()}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Search sx={{ mr: 2 }}>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase placeholder="Search…" />
                    </Search>
                    <Box sx={{ flexGrow: 1 }} />
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        sx={{ mr: 2 }}
                        onClick={openCloudDialog}
                    >
                        <CloudIcon fontSize="large" />
                    </IconButton>

                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        sx={{ mr: 2 }}
                        onClick={openConversionDialog}
                    >
                        <ScaleIcon fontSize="large" />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Offset />
        </Box>
    );
}