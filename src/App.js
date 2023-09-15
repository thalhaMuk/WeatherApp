import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Home from "./pages/Home.js";
import Weather from "./pages/Weather.js";

import "./styles/App.css";

function App() {
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();

  return (
    <div className="App">
      <div className="header-container">
        <div className="stack-row">
          <img className="logo" src="/logo.png" alt="logo" />
          <h2 className="weather-app-title">Weather App</h2>
        </div>
        <div className="user-auth-container">
          {isAuthenticated ? (
            <button className="logout" onClick={logout}>
              Logout
            </button>
          ) : (
            <>
              <button className="login" onClick={loginWithRedirect}>
              Login
              </button>
              <h2 className="login-message">Please login to use the app</h2>
            </>
          )}
        </div>
      </div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:cityId" element={<Weather />} />
        </Routes>
      </Router>
      <div className="footer">
        <footer>2021 Fidenz Technologies</footer>
      </div>
    </div>
  );
}

export default App;
