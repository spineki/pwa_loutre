import { useEffect } from "react";

import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import "./App.css";
import { ThemedApp } from "./ThemedApp";
import { ColorModeProvider } from "./contexts/ColormodeContext";
import { fakeRecipes, fakeTags } from "./fixtures";
import { useSharing } from "./hooks/useSharing";
import { initUserPreferences } from "./models/controllers";
import { database } from "./models/database";

function App() {

  useEffect(() => {
    async function setupDatabase() {

      await initUserPreferences();


      // only for debugging purpose for now
      if (await database.recipes.count() === 0) {
        await database.recipes.bulkAdd(fakeRecipes);
        await database.tags.bulkAdd(fakeTags);
      }
      // else {
      //   await database.recipes.clear();
      //   await database.recipes.bulkAdd(fakeRecipes);
      //   await database.tags.clear();
      //   await database.tags.bulkAdd(fakeTags);
      // }
    }
    setupDatabase()
  }, [])


  const { receiveFile } = useSharing();

  useEffect(() => {
    async function checkReceivedFiles() {
      await receiveFile();
    }
    checkReceivedFiles();

  }, [receiveFile])

  return (
    <ColorModeProvider >
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <ThemedApp />
      </LocalizationProvider>
    </ColorModeProvider >
  );
}

export default App;
