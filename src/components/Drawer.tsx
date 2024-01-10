import { useContext } from "react";
import { useTranslation } from 'react-i18next';

import { styled, useTheme } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List, { ListProps } from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from "@mui/material/ListSubheader";
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Typography from "@mui/material/Typography";

import FavoriteIcon from '@mui/icons-material/Favorite';
import Brightness5Icon from '@mui/icons-material/Brightness5';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import ChecklistIcon from '@mui/icons-material/Checklist';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import TagIcon from '@mui/icons-material/Tag';
import TapasIcon from '@mui/icons-material/Tapas';
import appLogo from "../icons/loutre.png"

import { DrawerContext } from "../contexts/drawer_context";
import { ColorModeContext } from "../contexts/colormode_context";
import { RouteFavoriteRecipesName } from "../routes/FavoriteRecipes";
import { RouteAllRecipesName } from "../routes/AllRecipes";
import { DrawerListItem } from "./DrawerListItem";
import { RouteWorkInProgressName } from "../routes/WorkInProgress";

export function Drawer() {
    const theme = useTheme();
    const { t } = useTranslation();
    const { showDrawer, toggleDrawer } = useContext(DrawerContext);
    const { colorMode, toggleColorMode } = useContext(ColorModeContext)

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
                            {t("Pages")}
                        </ListSubheader>
                    }
                >
                    <DrawerListItem to={RouteFavoriteRecipesName} CustomIcon={FavoriteIcon} iconColor="red" text={t("Favorites")} />
                    <DrawerListItem to={RouteAllRecipesName} CustomIcon={FormatListBulletedIcon} text={t("Recipes")} />
                    <DrawerListItem to={RouteWorkInProgressName} CustomIcon={TapasIcon} text={t("Categories")} />
                    <DrawerListItem to={RouteWorkInProgressName} CustomIcon={TagIcon} text={t("Tags")} />
                </StyledList>
                <Divider />
                <StyledList
                    subheader={
                        <ListSubheader component="div">
                            {t("Mode")}
                        </ListSubheader>
                    }
                >
                    <ListItem disablePadding style={{ background: theme.palette.background.paper }}>
                        < ListItemButton onClick={() => toggleColorMode()}>
                            {
                                colorMode === "light" ?
                                    <>
                                        <ListItemIcon>
                                            <Brightness5Icon />
                                        </ListItemIcon>
                                        <ListItemText primary={t("Day")} />
                                    </>
                                    :
                                    <>
                                        <ListItemIcon>
                                            <DarkModeIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={t("Night")} />
                                    </>
                            }
                        </ListItemButton>
                    </ListItem>
                </StyledList>
                <Divider />
                <StyledList
                    subheader={
                        <ListSubheader component="div">
                            {t("News")}
                        </ListSubheader>
                    }
                >
                    <DrawerListItem to={RouteWorkInProgressName} CustomIcon={ChecklistIcon} text={t("ChangeLogs")} />
                </StyledList>
            </Box>
        </SwipeableDrawer >
    );
}