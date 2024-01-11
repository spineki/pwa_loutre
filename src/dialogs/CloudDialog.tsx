import { useContext } from "react";
import { useTranslation } from "react-i18next";

import BackupIcon from '@mui/icons-material/Backup';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { useSharing } from "../hooks/useSharing";
import { getAllRecipes } from "../models/controllers";
import { CloudDialogContext } from "../contexts/CloudDialogContext";
import DialogContent from "@mui/material/DialogContent";


export function CloudDialog() {
    const { t } = useTranslation();
    const { showDialog, setShowDialog } = useContext(CloudDialogContext);
    const { browserCanShareFiles, shareFile } = useSharing();

    const handleClose = () => {
        setShowDialog(false);
    };

    const handleExport = async () => {
        const allRecipes = await getAllRecipes();
        shareFile(allRecipes);
    }

    return (
        <Dialog onClose={handleClose} open={showDialog}>
            <DialogTitle>{t("Saves")}</DialogTitle>
            {browserCanShareFiles ?
                <List sx={{ pt: 0 }}>
                    <ListItem disableGutters>
                        <ListItemButton disabled={!browserCanShareFiles} onClick={() => alert("test")}>
                            <ListItemIcon>
                                <CloudDownloadIcon />
                            </ListItemIcon>
                            <ListItemText primary={t("Import saved recipes")} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disableGutters>
                        <ListItemButton disabled={!browserCanShareFiles} onClick={handleExport}>
                            <ListItemIcon>
                                <BackupIcon />
                            </ListItemIcon>
                            <ListItemText primary={t("Export saved recipes")} />
                        </ListItemButton>
                    </ListItem>
                </List>
                :
                <DialogContent>
                    <DialogContentText>
                        Your website does not seem to be able to share files. Sorry.
                    </DialogContentText>
                </DialogContent>
            }
        </Dialog >
    );
}