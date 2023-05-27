import React, { useEffect, useState } from "react";
import Divider from '@mui/material/Divider';
import {
  faCloud,
  faBolt,
  faCloudRain,
  faCloudShowersHeavy,
  faSnowflake,
  faSun,
  faSmog,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as util from '../utils/utils.js';
import '../styles/WeatherCard.css'
import { useNavigate } from 'react-router-dom';


export default function WeatherCard(props) {
  const [weatherData, setWeatherData] = useState([]);
  const [randomColor, setRandomColor] = useState([]);
  const [date, setDate] = useState(null);
  const navigate = useNavigate();
  const cityID = props.cityId;

  useEffect(() => {
    fetchDataAndSetExpiry();
  }, []);  
  
  useEffect(() => {
    setInterval(() => setDate(new Date(Date.now()).getTime() - (19800 * 1000)), 1000);
  }, []);

  const fetchDataAndSetExpiry = async () => {
    let dataFromLocalStorage = localStorage.getItem(`${cityID}`);
    let obj = dataFromLocalStorage ? JSON.parse(dataFromLocalStorage) : null;
    console.log(obj)    
    if (!Array.isArray(obj.value) || !obj.value.length) {
      try {
        await fetch(
          `https://api.openweathermap.org/data/2.5/weather?id=${cityID}&appid=${util.API_KEY}&units=metric`
        )
          .then((res) => res.json())
          .then((result) => {
            setWeatherData(result);
          });
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
      util.setWithExpiry(`${cityID}`, weatherData, 50000);
    }
    else {
      setWeatherData(JSON.parse(dataFromLocalStorage).value)
    }
    setRandomColor("#" + (Math.floor(Math.random() * 16777215).toString(16)));
  };


  let weatherIcon = null;
  if (typeof weatherData.main != "undefined") {
    if (weatherData.weather[0].main === "Thunderstorm") {
      weatherIcon = <FontAwesomeIcon icon={faBolt} />;
    } else if (weatherData.weather[0].main === "Drizzle") {
      weatherIcon = <FontAwesomeIcon icon={faCloudRain} />;
    } else if (weatherData.weather[0].main === "Rain") {
      weatherIcon = <FontAwesomeIcon icon={faCloudShowersHeavy} />;
    } else if (weatherData.weather[0].main === "Snow") {
      weatherIcon = <FontAwesomeIcon icon={faSnowflake} />;
    } else if (weatherData.weather[0].main === "Clear") {
      weatherIcon = <FontAwesomeIcon icon={faSun} />;
    } else if (weatherData.weather[0].main === "Clouds") {
      weatherIcon = <FontAwesomeIcon icon={faCloud} />;
    } else {
      weatherIcon = <FontAwesomeIcon icon={faSmog} />;
    }
  }

  const handleCardClick = () => {
    navigate(`/${props.cityId}`);
  };

  let utcDate = date;
  const shiftInSeconds = weatherData.timezone;
  const localDate = new Date(utcDate + (shiftInSeconds * 1000));

  return (
    <div className="card" onClick={handleCardClick}>
      {typeof weatherData.main != "undefined" ? (
        <div className="Container" style={{ backgroundColor: randomColor }}>
          <div className="TopContainer">
            <div className="TopLeftContainer">
              <h3 className="Heading">
                {weatherData.name}, {weatherData.sys.country}
              </h3>
              {localDate.toLocaleTimeString("en-IN")}
              <h3 className="TinyText" style={{ padding: 20, fontSize: 20 }}>
                {weatherIcon}{" "}{weatherData.weather[0].description}
              </h3>
            </div>

            <div className="TopRightContainer">
              <h3 className="BigText">{weatherData.main.temp} &deg;C</h3>
              <h3 className="TinyText" style={{ padding: 20 }}>
                Temp Min: {weatherData.main.temp_min} &deg;C
                <br />
                Temp Max: {weatherData.main.temp_max} &deg;C
              </h3>
            </div>
          </div>

          <div className="BottomContainer">
            <div className="BottomLeftContainer">
              <h3 className="TinyText">
                Pressure: {weatherData.main.pressure}hPa <br />
                Humidity: {weatherData.main.humidity} &deg;C <br />
                Visibility: {weatherData.visibility} %
              </h3>
            </div>
            <Divider
              varient="middle"
              style={{ height: "80%" }}
              orientation="vertical"
            />
            <div className="BottomMiddleContainer">
              <FontAwesomeIcon icon={faPaperPlane} /> <br />
              <h3 className="TinyText">
                {weatherData.wind.speed} m/s {weatherData.wind.deg} Degree
              </h3>
            </div>
            <Divider
              varient="middle"
              style={{ height: "80%" }}
              orientation="vertical"
            />
            <div className="BottomRightContainer">
              <h3 className="TinyText">
                Sunrise:{" "}
                {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString(
                  "en-IN"
                )}{" "}
                <br />
                Sunset:{" "}
                {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString(
                  "en-IN"
                )}
              </h3>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}