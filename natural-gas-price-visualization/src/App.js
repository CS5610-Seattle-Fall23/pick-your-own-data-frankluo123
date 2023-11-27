import React from 'react';
import './App.css';
import NaturalGasPricesPlot from './NaturalGasPricesPlot'; // Import the component

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Natural Gas Prices Visualization</h1>
        <NaturalGasPricesPlot url="daily_csv.csv" /> {/* Add the component here */}
      </header>
    </div>
  );
}

export default App;