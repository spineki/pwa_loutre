import React, { useContext } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List, { ListProps } from '@mui/material/List';
import ListItem, { ListItemProps } from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from "@mui/material/ListSubheader";
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Typography from "@mui/material/Typography";

import Brightness5Icon from '@mui/icons-material/Brightness5';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import ChecklistIcon from '@mui/icons-material/Checklist';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import TagIcon from '@mui/icons-material/Tag';
import TapasIcon from '@mui/icons-material/Tapas';

import appLogo from "../icons/loutre.png"

import { DrawerContext } from "../contexts/drawer_context";
import { ColorModeContext } from "../contexts/colormode_context";

export function Drawer() {
    const theme = useTheme();
    const { showDrawer, toggleDrawer } = useContext(DrawerContext);
    const { colorMode, toggleColorMode } = useContext(ColorModeContext)



    const StyledListItem = styled(ListItem)<ListItemProps>(({ theme }) => ({
        background: theme.palette.background.paper
    }));
    const StyledList = styled(List)<ListProps>(({ theme }) => ({
        background: theme.palette.background.paper
    }));



    return (
        <SwipeableDrawer
            anchor="left"
            open={showDrawer}
            onClose={() => toggleDrawer()}
            onOpen={() => toggleDrawer()}
        >
            <Box
                sx={{
                    width: 250,
                    background: theme.palette.background.paper,
                    height: "100%"
                }}
                role="presentation"
            >

                <Box component="div" sx={{
                    p: 2,
                    background: "#ad102f",
                    display: "flex",
                    flexDirection: "row",
                    color: "white",
                }}>
                    <Avatar src={appLogo} sx={{ width: 50, height: 50 }} />
                    <Box sx={{ paddingLeft: 2 }}>
                        <Typography component="div">
                            <Box sx={{ fontFamily: 'Cookie-Regular', fontSize: 40, lineHeight: 1 }}>
                                Loutre
                            </Box>
                            <code style={{ fontSize: 12 }}>version: 0.0.1</code>
                            <Box sx={{ fontFamily: 'AtomicAge-Regular', fontSize: 12 }}>
                                Par Antoine Marras
                            </Box>
                        </Typography>
                    </Box>
                </Box>

                <StyledList
                    subheader={
                        <ListSubheader component="div">
                            Pages
                        </ListSubheader>
                    }
                >
                    <StyledListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <FormatListBulletedIcon />
                            </ListItemIcon>
                            <ListItemText primary="Recipes" />
                        </ListItemButton>
                    </StyledListItem>
                    <StyledListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <TapasIcon />
                            </ListItemIcon>
                            <ListItemText primary="Categories" />
                        </ListItemButton>
                    </StyledListItem>
                    <StyledListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <TagIcon />
                            </ListItemIcon>
                            <ListItemText primary="Tags" />
                        </ListItemButton>
                    </StyledListItem>
                </StyledList>
                <Divider />
                <StyledList
                    subheader={
                        <ListSubheader component="div">
                            Mode
                        </ListSubheader>
                    }
                >
                    <StyledListItem disablePadding>
                        < ListItemButton onClick={() => toggleColorMode()}>
                            {
                                colorMode === "light" ?
                                    <>
                                        <ListItemIcon>
                                            <Brightness5Icon />
                                        </ListItemIcon>
                                        <ListItemText primary="Day" />
                                    </>
                                    :
                                    <>
                                        <ListItemIcon>
                                            <DarkModeIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Night" />
                                    </>
                            }
                        </ListItemButton>
                    </StyledListItem>
                </StyledList>
                <Divider />
                <StyledList
                    subheader={
                        <ListSubheader component="div">
                            News
                        </ListSubheader>
                    }
                >
                    <StyledListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <ChecklistIcon />
                            </ListItemIcon>
                            <ListItemText primary="Changelog" />
                        </ListItemButton>
                    </StyledListItem>
                </StyledList>
            </Box>
        </SwipeableDrawer >
    );
}