import { useContext } from "react";

import Snackbar from "@mui/material/Snackbar";

import Alert from "@mui/material/Alert";
import { MessageContext } from "../contexts/MessageContext";

export function ConsecutiveMessageSnackbar() {
  const { messageInfo, closeMessage, handleExitedMessage, showMessage } =
    useContext(MessageContext);

  return (
    <Snackbar
      key={messageInfo ? messageInfo.key : undefined}
      open={showMessage}
      autoHideDuration={6000}
      onClose={closeMessage}
      TransitionProps={{ onExited: handleExitedMessage }}
    >
      <Alert
        onClose={closeMessage}
        severity={messageInfo?.severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {messageInfo?.message ?? ""}
      </Alert>
    </Snackbar>
  );
}
