
import './App.css';
import React from "react";
import logoGlp from './resources/logoGlp.png'

 

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logoGlp} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> .
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}


export default App;
