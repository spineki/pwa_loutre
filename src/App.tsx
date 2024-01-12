import React, { useEffect } from 'react';
import './App.css';
import { ThemedApp } from './ThemedApp';
import { ColorModeProvider } from './contexts/ColormodeContext';
import { database } from './models/database';
import { fakeRecipes } from './fixtures';

function App() {
  useEffect(() => {
    async function fillFixturesInDatabase() {

      // only for debugging purpose for now
      if (await database.recipes.count() === 0) {
        await database.recipes.bulkAdd(fakeRecipes);
      }
      // else {
      //   await database.recipes.clear();
      //   await database.recipes.bulkAdd(fakeRecipes);
      // }
    }
    fillFixturesInDatabase()
  }, [])

  return (
    <ColorModeProvider>
      <ThemedApp />
    </ColorModeProvider >
  );
}

export default App;
