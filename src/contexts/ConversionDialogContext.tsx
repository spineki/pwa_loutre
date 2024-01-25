import { createContext, ReactElement, useState } from "react";

export interface ConversionDialogContextInterface {
  showDialog: boolean;
  setShowDialog: (visibility: boolean) => void;
}

export const ConversionDialogContext =
  createContext<ConversionDialogContextInterface>(
    {} as ConversionDialogContextInterface,
  );

/**
 * A theme to
 * @param children
 * @returns
 */
export function ConversionDialogContextProvider({
  children,
}: {
  children: ReactElement;
}): ReactElement {
  const [showDialog, setShowDialog] = useState<boolean>(false);

  return (
    <ConversionDialogContext.Provider value={{ showDialog, setShowDialog }}>
      {children}
    </ConversionDialogContext.Provider>
  );
}
