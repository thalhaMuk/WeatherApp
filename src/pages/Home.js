import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import weatherData from "../data/cities.json";
import WeatherCard from "../components/WeatherCard";
import "../styles/Home.css";

export default function Home() {
  const { isAuthenticated } = useAuth0();

  return (
    <>
      {isAuthenticated && (
        <div className="box-container">
          <div className="inner-box">
            <div className="stack-row-2">
              <input className="cus-text-field" placeholder="Enter a city" />
              <button className="color-button">Add City</button>
            </div>
            <div className="grid-container">
              {weatherData.List.map((city) => (
                <div className="Cards" key={city.CityCode}>
                  <WeatherCard
                    cityId={city.CityCode}
                    cityName={city.CityName}
                    cityTtl={city.ttl}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
