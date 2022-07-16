import './App.css';
import Item from './Item';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Pool Tracker</h1>
      </header>
      <body>
       <div className="dashboard">
        <Item name="pH" value="7.2" unit="" date="14/07/2022"/>
        <Item name="Chlore" value="1.5" unit="ppm" date="14/07/2022"/>
        <Item name="Temperature" value="28.2" unit="°C" date="14/07/2022"/>
        <Item name="Chaussette" value="" unit="" date="14/07/2022"/>
        <Item name="Robot" value="" unit="" date="14/07/2022"/>
       </div>
      </body>
    </div>
  );
}

export default App;
