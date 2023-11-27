/**
 * Pick Your Own Data App.js JavaScript Code
 * @author Frank Luo
 * Sources Used:
 * https://react.dev/learn 
 * https://kinsta.com/knowledgebase/what-is-react-js/
 * https://www.youtube.com/watch?v=b9eMGE7QtTk
 **/

// Importing relevant components 
import React from 'react';
import './App.css';
import NaturalGasPricesPlot from './NaturalGasPricesPlot'; 

// Defining App component 
function App() {
  // Return statement defines the JSX to render 
  return (
    <div className="App">
      <header className="App-header">
        <h1>Natural Gas Prices Visualization</h1>
        <NaturalGasPricesPlot url="daily_csv.csv" />
      </header>
    </div>
  );
}

// Exporting App component to be used in other parts of the application
export default App;