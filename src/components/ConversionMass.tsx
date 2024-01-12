import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';

import SwapVertIcon from '@mui/icons-material/SwapVert';
import InputAdornment from "@mui/material/InputAdornment";
import { Masses, convertMass } from "../script/conversions";

interface Props {
    onBackPressed: () => void;
}

export function ConversionMass(props: Props) {
    const { onBackPressed } = props;

    const { t } = useTranslation();

    const [srcUnit, setSrcUnit] = useState(Masses.OZ);
    const [destUnit, setDestUnit] = useState(Masses.G);
    const [srcValue, setSrcValue] = useState<number | string>(0);
    const [destValue, setDestValue] = useState<number | string>("0");

    useEffect(() => {
        if (typeof srcValue === "string") {
            return;
        }

        setDestValue(
            convertMass(srcUnit, destUnit, parseFloat(srcValue.toString())).toFixed(2)
        );
    }, [srcValue, srcUnit, destUnit]);

    const swapUnits = () => {
        const temp = srcUnit;
        setSrcUnit(destUnit);
        setDestUnit(temp);
    };

    return (
        <Box>
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => onBackPressed()}>
                        <ListItemIcon>
                            <ArrowBackIcon />
                        </ListItemIcon>
                        <ListItemText primary={t("Masses")} />
                    </ListItemButton>
                </ListItem>
            </List>

            <Box sx={{ p: 2 }}>
                <Grid container>
                    <Grid item xs={5} sx={{ display: "flex" }}>
                        <Select
                            sx={{ flex: 1 }}
                            value={srcUnit}
                            onChange={(event: SelectChangeEvent) => setSrcUnit(event.target.value as Masses)}
                        >
                            {Object.values(Masses).map((unit) =>
                                <MenuItem key={unit} value={unit}>{unit}</MenuItem>
                            )}
                        </Select>
                    </Grid>
                    <Grid item xs={2} />

                    <Grid item xs={5} sx={{ display: "flex" }}>
                        <OutlinedInput
                            style={{ flex: 1 }}
                            value={srcValue}
                            endAdornment={<InputAdornment position="end">{srcUnit}</InputAdornment>}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const rawText = event.target.value as Masses;
                                const text = rawText.trim();
                                const parsedValue = parseFloat(text);

                                if (!isNaN(parsedValue)) {
                                    setSrcValue(parsedValue);
                                } else {
                                    setSrcValue(text);
                                    setDestValue("");
                                }
                            }} />
                    </Grid>
                </Grid>

                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <IconButton onClick={() => swapUnits()}>
                        <SwapVertIcon />
                    </IconButton>
                </Box>

                <Grid container>
                    <Grid item xs={5} sx={{ display: "flex" }}>
                        <Select
                            sx={{ flex: 1 }}
                            value={destUnit}
                            onChange={(event: SelectChangeEvent) => setDestUnit(event.target.value as Masses)}
                        >
                            {Object.values(Masses).map((unit) =>
                                <MenuItem key={unit} value={unit}>{unit}</MenuItem>
                            )}
                        </Select>
                    </Grid>
                    <Grid item xs={2} />
                    <Grid item xs={5} sx={{ display: "flex" }}>
                        <OutlinedInput
                            style={{ flex: 1 }}
                            value={destValue}
                            disabled={true}
                            endAdornment={<InputAdornment position="end">{destUnit}</InputAdornment>}
                        />
                    </Grid>
                </Grid>
            </Box>
        </Box >
    );

}