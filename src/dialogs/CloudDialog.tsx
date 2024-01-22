import { useContext } from "react";
import { useTranslation } from "react-i18next";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import BackupIcon from '@mui/icons-material/Backup';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import DownloadIcon from '@mui/icons-material/Download';

import { CloudDialogContext } from "../contexts/CloudDialogContext";
import { useSharing } from "../hooks/useSharing";
import { getAllRecipes, importRecipesFromFileContent } from "../models/controllers";


export function CloudDialog() {
    const { t } = useTranslation();
    const { showDialog, setShowDialog } = useContext(CloudDialogContext);
    const {
        browserCanShareFiles,
        browserCanImportFiles,
        downloadFile,
        importFile,
        shareFile
    } = useSharing();

    const handleClose = () => {
        setShowDialog(false);
    };

    const handleImport = async () => {
        const content = await importFile();
        if (!(typeof content === "string")) {
            console.error(`Error while handling import ${content.error}`);
            return;
        }

        //todo, handle error code
        await importRecipesFromFileContent(content);
        setShowDialog(false);
    };

    // import files from an input field
    // This is dirty, and we could only use this instead of the handleImport
    // However, I wanted to try the nextSharing api, so we will use it on compatible device and the old fashioned way on uncompatible devices
    const handleImportOldWay = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files == null) {
            return;
        }

        for (const file of files) {
            const content = await file.text();
            await importRecipesFromFileContent(content);
        }

        setShowDialog(false);
    };

    const handleExport = async () => {
        const allRecipes = await getAllRecipes();
        allRecipes.forEach(element => {
            delete element.id;
        });
        shareFile(allRecipes);
    };

    const handleDownload = async () => {
        const allRecipes = await getAllRecipes();
        allRecipes.forEach(element => {
            delete element.id;
        });
        downloadFile(allRecipes);
    };

    return (
        <Dialog onClose={handleClose} open={showDialog}>
            <DialogTitle>{t("Saves")}</DialogTitle>
            {browserCanShareFiles ?
                <List sx={{ pt: 0 }}>
                    {
                        browserCanImportFiles ?
                            <ListItem disableGutters>
                                <ListItemButton onClick={() => handleImport()}>
                                    <ListItemIcon>
                                        <CloudDownloadIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={t("Import saved recipes")} />
                                </ListItemButton>
                            </ListItem>
                            :
                            <ListItem disableGutters>
                                <ListItemButton
                                    component="label"
                                >
                                    <ListItemIcon>
                                        <CloudDownloadIcon />
                                    </ListItemIcon>
                                    <input
                                        type="file"
                                        accept="text/plain"
                                        hidden onChange={handleImportOldWay}
                                    />
                                    <ListItemText primary={t("Import saved recipes")} />
                                </ListItemButton>
                            </ListItem>
                    }
                    <ListItem disableGutters>
                        <ListItemButton disabled={!browserCanShareFiles} onClick={() => handleExport()}>
                            <ListItemIcon>
                                <BackupIcon />
                            </ListItemIcon>
                            <ListItemText primary={t("Export saved recipes")} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disableGutters>
                        <ListItemButton disabled={!browserCanShareFiles} onClick={() => handleDownload()}>
                            <ListItemIcon>
                                <DownloadIcon />
                            </ListItemIcon>
                            <ListItemText primary={t("DownloadRecipes")} />
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