import { useEffect } from 'react';
import './App.css';
import { ThemedApp } from './ThemedApp';
import { ColorModeProvider } from './contexts/ColormodeContext';
import { database } from './models/database';
import { fakeRecipes } from './fixtures';
import { useSharing } from './hooks/useSharing';

function App() {
  useEffect(() => {
    async function fillFixturesInDatabase() {

      // only for debugging purpose for now
      if (await database.recipes.count() === 0) {
        await database.recipes.bulkAdd(fakeRecipes);
      }
      else {
        await database.recipes.clear();
        await database.recipes.bulkAdd(fakeRecipes);
      }
    }
    fillFixturesInDatabase()
  }, [])

  const { receiveFile } = useSharing();

  useEffect(() => {
    async function checkReceivedFiles() {
      await receiveFile();
    }
    checkReceivedFiles();

  }, [receiveFile])

  return (
    <ColorModeProvider>
      <ThemedApp />
    </ColorModeProvider >
  );
}

export default App;
