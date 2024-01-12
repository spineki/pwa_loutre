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

enum Volumes {
    CL = "cl",
    CUP = "cup",
    DL = "dl",
    FLUID_OZ_UK = "fl oz (UK)",
    FLUID_OZ_US = "fl oz (US)",
    GAL_UK = "gal (UK)",
    GAL_US = "gal (US)",
    L = "l",
    ML = "ml",
    PINT_UK = "pt(Imp)",
    PINT_DRY_US = "pt(US dry)",
    PINT_FLUID_US = "pt(US fl)",
}

const volumeData = {
    [Volumes.CL]: 100.0,
    [Volumes.CUP]: 4.0,
    [Volumes.DL]: 10.0,
    [Volumes.FLUID_OZ_UK]: 35.195079727854,
    [Volumes.FLUID_OZ_US]: 33.814022701843,
    [Volumes.GAL_UK]: 0.21996924829909,
    [Volumes.GAL_US]: 0.26417205235815,
    [Volumes.L]: 1.0,
    [Volumes.ML]: 1000.0,
    [Volumes.PINT_UK]: 1.7597539863927,
    [Volumes.PINT_DRY_US]: 1.8161659685377,
    [Volumes.PINT_FLUID_US]: 2.1133764188652,
};

function convertVolume(
    unit_src: Volumes,
    unit_dest: Volumes,
    value: number
): number {
    return (value / volumeData[unit_src]) * volumeData[unit_dest];
}

interface Props {
    onBackPressed: () => void;
}

export function ConversionVolume(props: Props) {
    const { onBackPressed } = props;

    const { t } = useTranslation();

    const [srcUnit, setSrcUnit] = useState(Volumes.CUP);
    const [destUnit, setDestUnit] = useState(Volumes.L);
    const [srcValue, setSrcValue] = useState<number | string>(0);
    const [destValue, setDestValue] = useState<number | string>("0");

    useEffect(() => {
        if (typeof srcValue === "string") {
            return;
        }

        setDestValue(
            convertVolume(srcUnit, destUnit, parseFloat(srcValue.toString())).toFixed(2)
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
                        <ListItemText primary={t("Volumes")} />
                    </ListItemButton>
                </ListItem>
            </List>

            <Box sx={{ p: 2 }}>
                <Grid container>
                    <Grid item xs={5}>
                        <Select
                            value={srcUnit}
                            onChange={(event: SelectChangeEvent) => setSrcUnit(event.target.value as Volumes)}
                        >
                            {Object.values(Volumes).map((unit) =>
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
                                const rawText = event.target.value as Volumes;
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
                    <Grid item xs={5}>
                        <Select
                            value={destUnit}
                            onChange={(event: SelectChangeEvent) => setDestUnit(event.target.value as Volumes)}
                        >
                            {Object.values(Volumes).map((unit) =>
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