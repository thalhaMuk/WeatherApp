import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as util from '../utils/utils.js';
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
  faArrowLeft
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from 'react-router-dom';
import '../styles/Weather.css'

const Weather = () => {
  const { cityId } = useParams();
  const [weatherData, setWeatherData] = useState([]);
  const [date, setDate] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setInterval(() => setDate(new Date(Date.now()).getTime() - (19800 * 1000)), 1000);
  }, []);

  useEffect(() => {
    fetchWeatherData();
  }, [cityId]);

  const fetchWeatherData = async () => {
    try {
      let dataFromLocalStorage = localStorage.getItem(cityId);
      let obj = JSON.parse(dataFromLocalStorage);
      console.log(obj.value);

    if(typeof obj.value === 'undefined'){
        try {
          await fetch(
            `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${util.API_KEY}&units=metric`
          )
                      .then((res) => res.json())
            .then((result) => {
              setWeatherData(result);
            });
        } catch (error) {
          console.error("Error fetching weather data:", error);
        } util.setWithExpiry(`${cityId}`, weatherData, 50000);
      }
      else {
        setWeatherData(JSON.parse(dataFromLocalStorage).value)
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
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

  const handleBackClick = () => {
    navigate("/");
  };


  let utcDate = date;
  const shiftInSeconds = weatherData.timezone;
  const localDate = new Date(utcDate + (shiftInSeconds * 1000));

  return (
    <div className="WeatherCard">
      {typeof weatherData.main != "undefined" ? (
        <div className="WeatherContainer">
          <div className="WeatherBack" onClick={handleBackClick}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </div>
          <h3 className="WeatherHeading">
            {weatherData.name}, {weatherData.sys.country}
          </h3>
          <h3 className="WeatherTinyText">
            {localDate.toLocaleTimeString("en-IN")}
          </h3>
          <div className="WeatherTopContainer">
            <div className="WeatherTopLeftContainer">
              <h3 className="WeatherIcon" >
                {weatherIcon}
              </h3>
              <h3 className="WeatherTinyText">
                {weatherData.weather[0].description}
              </h3>
            </div>


            <div className="WeatherTopRightContainer">
              <h3 className="WeatherBigText">{weatherData.main.temp} &deg;C</h3>
              <h3 className="WeatherTinyText" style={{ paddingBottom: 5, paddingTop: 10 }}>
                Temp Min: {weatherData.main.temp_min} &deg;C
              </h3>
              <h3 className="WeatherTinyText" >
                Temp Max: {weatherData.main.temp_max} &deg;C
              </h3>
            </div>
          </div>

          <div className="BottomContainer">
            <div className="BottomLeftContainer">
              <h3 className="WeatherTinyText" style={{ paddingBottom: 5, paddingLeft: 25 }}>
                <strong>Pressure:</strong> {weatherData.main.pressure}hPa <br />
              </h3>
              <h3 className="WeatherTinyText" style={{ paddingBottom: 5, paddingLeft: 25 }}>
                <strong>Humidity:</strong> {weatherData.main.humidity} &deg;C <br />
              </h3>
              <h3 className="WeatherTinyText" style={{ paddingBottom: 5, paddingLeft: 25 }}>
                <strong>Visibility:</strong> {weatherData.visibility} %
              </h3>
            </div>
            <Divider
              varient="middle"
              style={{ height: "60%", backgroundColor: "white", opacity: "50%" }}
              orientation="vertical"
            />
            <div className="BottomMiddleContainer">
              <FontAwesomeIcon icon={faPaperPlane} /> <br />
              <h3 className="WeatherTinyText">
                {weatherData.wind.speed} m/s {weatherData.wind.deg} Degree
              </h3>
            </div>
            <Divider
              varient="middle"
              style={{ height: "60%", backgroundColor: "white", opacity: "50%" }}
              orientation="vertical"
            />
            <div className="BottomRightContainer">
              <h3 className="WeatherTinyText" style={{ paddingBottom: 5, paddingRight: 25 }}>
                <strong>Sunrise:{" "}</strong>
                {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString(
                  "en-IN"
                )}{" "}
              </h3>
              <h3 className="WeatherTinyText" >
                <strong>Sunset:{" "}</strong>
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
};

export default Weather;
