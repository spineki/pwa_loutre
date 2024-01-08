import React, { useContext } from "react";
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import ListSubheader from "@mui/material/ListSubheader";
import Typography from "@mui/material/Typography";

import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ChecklistIcon from '@mui/icons-material/Checklist';
import Brightness5Icon from '@mui/icons-material/Brightness5';
import TagIcon from '@mui/icons-material/Tag';
import TapasIcon from '@mui/icons-material/Tapas';
import Avatar from "@mui/material/Avatar";
import appLogo from "../icons/loutre.png"

import { DrawerContext } from "../contexts/drawer_context";

export function Drawer() {

    const { toggleDrawer, showDrawer } = useContext(DrawerContext);

    const list = () => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={() => toggleDrawer()}
            onKeyDown={() => toggleDrawer()}
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

            <List
                subheader={
                    <ListSubheader component="div">
                        Pages
                    </ListSubheader>
                }
            >
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <FormatListBulletedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Recipes" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <TapasIcon />
                        </ListItemIcon>
                        <ListItemText primary="Categories" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <TagIcon />
                        </ListItemIcon>
                        <ListItemText primary="Tags" />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <List
                subheader={
                    <ListSubheader component="div">
                        Mode
                    </ListSubheader>
                }
            >
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <Brightness5Icon />
                        </ListItemIcon>
                        <ListItemText primary="Day" />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <List
                subheader={
                    <ListSubheader component="div">
                        News
                    </ListSubheader>
                }
            >
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <ChecklistIcon />
                        </ListItemIcon>
                        <ListItemText primary="Changelog" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <SwipeableDrawer
            anchor="left"
            open={showDrawer}
            onClose={() => toggleDrawer()}
            onOpen={() => toggleDrawer()}
        >
            {list()}
        </SwipeableDrawer>
    );
}