import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home.js";
import Weather from "./pages/Weather.js";

import './styles/App.css';

function App() {
  return (
    <div className="App">
      <div className="stack-row">
        <img className="logo" src="/logo.png" alt="logo" />
        <h2 className="weather-app-title">Weather App</h2>
      </div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:cityId" element={<Weather />} />
        </Routes>
      </Router>
      <div className='footer'>
        <footer>2021 Fidenz Technologies</footer>
      </div>
    </div>
  );
}

export default App;
