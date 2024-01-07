import React from 'react';
import './App.css';
import "./fonts/AtomicAge/AtomicAge-Regular.ttf"

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <p style={{ "fontFamily": "AtomicAge-Regular" }}>
          Atomic age font
        </p>
        <p style={{ "fontFamily": "Cookie-Regular" }}>
          Cookie font
        </p>
      </header>
    </div>
  );
}

export default App;
