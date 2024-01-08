import React from 'react';
import './App.css';
import { ThemedApp } from './ThemedApp';
import { ColorModeProvider } from './contexts/colormode_context';

function App() {
  return (
    <ColorModeProvider>
      <ThemedApp />
    </ColorModeProvider>
  );
}

export default App;
