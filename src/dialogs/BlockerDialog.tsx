import { useTranslation } from "react-i18next";
import { useBlocker } from "react-router-dom";

import { DialogActions } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface BlockDialogProps {
  block: boolean;
}

export function BlockerDialog(props: BlockDialogProps) {
  const { block } = props;
  const { t } = useTranslation();

  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      block && currentLocation.pathname !== nextLocation.pathname,
  );

  return (
    <Dialog open={blocker.state === "blocked"}>
      <DialogTitle id="alert-dialog-title">{t("AreYouSureLeave")}</DialogTitle>
      <DialogContent>
        <DialogContentText>{t("UnsavedChanges")}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => blocker.proceed?.()}>{t("Exit")}</Button>
        <Button onClick={() => blocker.reset?.()} autoFocus>
          {t("Cancel")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
