import { createContext, ReactElement, useEffect, useState } from "react";

import { AlertColor } from "@mui/material/Alert";

export interface SnackbarMessage {
  key: number;
  message: string;
  severity: AlertColor;
}

export interface MessageContextInterface {
  showMessage: boolean;
  messageInfo?: SnackbarMessage;
  closeMessage: (event: React.SyntheticEvent | Event, reason?: string) => void;
  handleExitedMessage: () => void;
  pushMessage: (message: string, severity?: AlertColor) => void;
}

export const MessageContext = createContext<MessageContextInterface>(
  {} as MessageContextInterface,
);

/**
 * Show pushed message in snackbars
 * Courtesy https://mui.com/material-ui/react-snackbar/#consecutive-snackbars
 * @param children
 * @returns
 */
export function MessageContextProvider({
  children,
}: {
  children: ReactElement;
}): ReactElement {
  const [snackPack, setSnackPack] = useState<readonly SnackbarMessage[]>([]);
  const [showMessage, setShowMessage] = useState(false);
  const [messageInfo, setMessageInfo] = useState<SnackbarMessage | undefined>(
    undefined,
  );

  useEffect(() => {
    if (snackPack.length && !messageInfo) {
      // Set a new snack when we don't have an active one
      setMessageInfo({ ...snackPack[0] });
      setSnackPack((prev) => prev.slice(1));
      setShowMessage(true);
    } else if (snackPack.length && messageInfo && showMessage) {
      // Close an active snack when a new one is added
      setShowMessage(false);
    }
  }, [snackPack, messageInfo, showMessage]);

  const pushMessage = (message: string, severity: AlertColor = "error") => {
    setSnackPack((prev) => [
      ...prev,
      { key: new Date().getTime(), message, severity },
    ]);
  };

  const closeMessage = (
    event: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setShowMessage(false);
  };

  const handleExitedMessage = () => {
    setMessageInfo(undefined);
  };

  return (
    <MessageContext.Provider
      value={{
        showMessage,
        messageInfo,
        closeMessage,
        handleExitedMessage,
        pushMessage,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
}
