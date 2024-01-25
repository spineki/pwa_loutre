import { useCallback, useContext, useState } from "react";
import { useTranslation } from "react-i18next";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import MonitorWeightIcon from "@mui/icons-material/MonitorWeight";
import LocalDrinkIcon from "@mui/icons-material/LocalDrink";
import SquareFootIcon from "@mui/icons-material/SquareFoot";

import { ConversionDialogContext } from "../contexts/ConversionDialogContext";
import { ConversionTemperature } from "../components/ConversionTemperature";
import { ConversionMass } from "../components/ConversionMass";
import { ConversionVolume } from "../components/ConversionVolume";
import { ConversionVolumeToMass } from "../components/ConversionVolumeToMass";

enum Conversion {
  TEMPERATURE = "temperature",
  MASSES = "masses",
  VOLUMES = "volumes",
  VOLUME_TO_MASS = "volume to mass",
}

export function ConversionDialog() {
  const { t } = useTranslation();
  const { showDialog, setShowDialog } = useContext(ConversionDialogContext);

  const [currentConversion, setCurrentConversion] = useState<Conversion | null>(
    null,
  );

  const handleClose = () => {
    setShowDialog(false);
  };

  const conversionSelector = useCallback((conversion: Conversion) => {
    switch (conversion) {
      case Conversion.TEMPERATURE:
        return (
          <ConversionTemperature
            onBackPressed={() => setCurrentConversion(null)}
          />
        );
      case Conversion.MASSES:
        return (
          <ConversionMass onBackPressed={() => setCurrentConversion(null)} />
        );
      case Conversion.VOLUMES:
        return (
          <ConversionVolume onBackPressed={() => setCurrentConversion(null)} />
        );
      case Conversion.VOLUME_TO_MASS:
        return (
          <ConversionVolumeToMass
            onBackPressed={() => setCurrentConversion(null)}
          />
        );
    }
  }, []);

  return (
    <Dialog onClose={handleClose} open={showDialog}>
      <DialogTitle>{t("Conversions")}</DialogTitle>
      {currentConversion ? (
        conversionSelector(currentConversion)
      ) : (
        <List sx={{ pt: 0 }}>
          <ListItem disableGutters>
            <ListItemButton
              onClick={() => setCurrentConversion(Conversion.TEMPERATURE)}
            >
              <ListItemIcon>
                <DeviceThermostatIcon />
              </ListItemIcon>
              <ListItemText primary={t("Temperature")} />
            </ListItemButton>
          </ListItem>
          <ListItem disableGutters>
            <ListItemButton
              onClick={() => setCurrentConversion(Conversion.MASSES)}
            >
              <ListItemIcon>
                <MonitorWeightIcon />
              </ListItemIcon>
              <ListItemText primary={t("Masses")} />
            </ListItemButton>
          </ListItem>
          <ListItem disableGutters>
            <ListItemButton
              onClick={() => setCurrentConversion(Conversion.VOLUMES)}
            >
              <ListItemIcon>
                <SquareFootIcon />
              </ListItemIcon>
              <ListItemText primary={t("Volumes")} />
            </ListItemButton>
          </ListItem>
          <ListItem disableGutters>
            <ListItemButton
              onClick={() => setCurrentConversion(Conversion.VOLUME_TO_MASS)}
            >
              <ListItemIcon>
                <LocalDrinkIcon />
              </ListItemIcon>
              <ListItemText primary={t("VolumeToMass")} />
            </ListItemButton>
          </ListItem>
        </List>
      )}
    </Dialog>
  );
}
