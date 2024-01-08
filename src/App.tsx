import React from 'react';
import './App.css';
import { ThemeContextProvider } from './contexts/theme_context';
import { ThemedApp } from './ThemedApp';

function App() {

  return (
    <ThemeContextProvider>
      <ThemedApp />
    </ThemeContextProvider>
  );
}

export default App;
