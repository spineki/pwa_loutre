import { useEffect } from "react";

import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import "./App.css";
import { ThemedApp } from "./ThemedApp";
import { ColorModeProvider } from "./contexts/ColormodeContext";
import { MessageContextProvider } from "./contexts/MessageContext";
import { initUserPreferences } from "./database/controllers/preferencesController";
import { initTutorialRecipe } from "./database/controllers/recipeController";
import { useSharing } from "./hooks/useSharing";

function App() {
  useEffect(() => {
    async function setupDatabase() {
      await initUserPreferences();
      await initTutorialRecipe();
    }
    setupDatabase();
  }, []);

  const { receiveFile } = useSharing();

  useEffect(() => {
    async function checkReceivedFiles() {
      await receiveFile();
    }
    checkReceivedFiles();
  }, [receiveFile]);

  return (
    <ColorModeProvider>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <MessageContextProvider>
          <ThemedApp />
        </MessageContextProvider>
      </LocalizationProvider>
    </ColorModeProvider>
  );
}

export default App;
