import { useTranslation } from "react-i18next";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface DeleteRecipeDialogProps {
  onConfirm: () => void;
  onClose: () => void;
  show: boolean;
}

export function DeleteRecipeDialog(props: DeleteRecipeDialogProps) {
  const { show, onClose, onConfirm } = props;

  const { t } = useTranslation();

  return (
    <Dialog open={show} onClose={onClose}>
      <DialogTitle>{t("DeleteRecipe")}</DialogTitle>
      <DialogContent>
        <DialogContentText>{t("DeleteRecipeLong")}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          color="error"
          onClick={() => {
            onClose();
            onConfirm();
          }}
        >
          {t("Delete")}
        </Button>
        <Button onClick={onClose} autoFocus>
          {t("Cancel")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
