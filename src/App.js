import './App.css';
import Cars from "./assets/cars.json";
import { BasicSelect } from './components/BasicSelect';

function App() {
  return (
    <div className="App">
      <BasicSelect carData={Cars} />
    </div>
  );
}

export default App;
