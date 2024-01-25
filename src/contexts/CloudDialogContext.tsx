import { createContext, ReactElement, useState } from "react";

export interface CloudDialogContextInterface {
  showDialog: boolean;
  setShowDialog: (visibility: boolean) => void;
}

export const CloudDialogContext = createContext<CloudDialogContextInterface>(
  {} as CloudDialogContextInterface,
);

/**
 * A theme to
 * @param children
 * @returns
 */
export function CloudDialogContextProvider({
  children,
}: {
  children: ReactElement;
}): ReactElement {
  const [showDialog, setShowDialog] = useState<boolean>(false);

  return (
    <CloudDialogContext.Provider value={{ showDialog, setShowDialog }}>
      {children}
    </CloudDialogContext.Provider>
  );
}
