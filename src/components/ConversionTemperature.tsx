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

interface Props {
    onBackPressed: () => void;
}

enum Temperature {
    C = "°C",
    F = "°F",
}

function convertCelciusToFahrenheit(degree: number): number {
    return degree * 1.8 + 32;
}

function convertFahrenheitToCelcius(degree: number): number {
    return (degree - 32) / 1.8;
}

export function ConversionTemperature(props: Props) {
    const { onBackPressed } = props;

    const { t } = useTranslation();

    const [srcUnit, setSrcUnit] = useState(Temperature.F);
    const [destUnit, setDestUnit] = useState(Temperature.C);
    const [srcValue, setSrcValue] = useState<number | string>(0);
    const [destValue, setDestValue] = useState<number | string>("-17.78");

    useEffect(() => {
        if (typeof srcValue === "string") {
            return;
        }

        if (srcUnit === Temperature.F && destUnit == Temperature.C) {
            setDestValue(convertFahrenheitToCelcius(srcValue).toFixed(2));
        }

        if (srcUnit === Temperature.F && destUnit == Temperature.F) {
            setDestValue(srcValue.toFixed(2));
        }

        if (srcUnit === Temperature.C && destUnit == Temperature.F) {
            setDestValue(convertCelciusToFahrenheit(srcValue).toFixed(2));
        }

        if (srcUnit === Temperature.C && destUnit == Temperature.C) {
            setDestValue(srcValue.toFixed(2));
        }
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
                        <ListItemText primary={t("Temperatures")} />
                    </ListItemButton>
                </ListItem>
            </List>

            <Box sx={{ p: 2 }}>
                <Grid container>
                    <Grid item xs={2}>
                        <Select
                            value={srcUnit}
                            onChange={(event: SelectChangeEvent) => setSrcUnit(event.target.value as Temperature)}
                        >
                            <MenuItem value={Temperature.F}>{Temperature.F}</MenuItem>
                            <MenuItem value={Temperature.C}>{Temperature.C}</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={5} />

                    <Grid item xs={5}>
                        <OutlinedInput
                            value={srcValue}
                            endAdornment={<InputAdornment position="end">{srcUnit}</InputAdornment>}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const rawText = event.target.value as Temperature;
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
                    <Grid item xs={2}>
                        <Select
                            value={destUnit}
                            onChange={(event: SelectChangeEvent) => setDestUnit(event.target.value as Temperature)}
                        >
                            <MenuItem value={Temperature.F}>{Temperature.F}</MenuItem>
                            <MenuItem value={Temperature.C}>{Temperature.C}</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={5} />
                    <Grid item xs={5}>
                        <OutlinedInput
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