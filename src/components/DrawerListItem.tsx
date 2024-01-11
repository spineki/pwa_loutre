import React, { useContext } from "react";
import { Link } from "react-router-dom";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { SvgIconProps } from "@mui/material/SvgIcon";
import { useTheme } from "@mui/material/styles";

import { RoutesType } from "../routes/types";
import { DrawerContext } from "../contexts/DrawerContext";

interface DrawerListItemProps {
    to: RoutesType,
    CustomIcon: React.ComponentType<SvgIconProps>
    /**
     * If not iconColor given, default to use theme.palette.primary.main
     */
    iconColor?: string,
    text: string
}

export function DrawerListItem(props: DrawerListItemProps) {
    const { to, CustomIcon, iconColor, text } = props;

    const theme = useTheme();
    const { currentRoute } = useContext(DrawerContext);

    const matchCurrentRoute = currentRoute === to;

    return (
        <ListItem disablePadding style={{ background: theme.palette.background.paper }}>
            <ListItemButton
                component={Link}
                to={to}
                selected={matchCurrentRoute} >
                <ListItemIcon>
                    <CustomIcon htmlColor={matchCurrentRoute ? iconColor ?? theme.palette.primary.main : "inherit"} />
                </ListItemIcon>
                <ListItemText primary={text} style={{ color: matchCurrentRoute ? theme.palette.primary.main : "inherit" }} />
            </ListItemButton>
        </ListItem>
    );
}