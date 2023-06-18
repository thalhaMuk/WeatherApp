import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { faPaperPlane, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { weatherIcons } from "../utils/constants";
import { formatWeatherDateTime } from "../utils/utils";

import "../styles/Weather.css";

const Weather = () => {
  const { cityId } = useParams();
  const [weatherData, setWeatherData] = useState([]);
  const navigate = useNavigate();
  let weatherIcon = null;

  useEffect(() => {
    fetchDataAndSetExpiry();
  }, [cityId]);

  const fetchDataAndSetExpiry = async () => {
    let dataFromLocalStorage = localStorage.getItem(`${cityId}`);
    let obj = dataFromLocalStorage ? JSON.parse(dataFromLocalStorage) : null;
    setWeatherData(obj.value);
  };

  if (typeof weatherData.main != "undefined") {
    weatherIcon = weatherData.weather[0].main
      ? weatherIcons[weatherData.weather[0].main]
      : weatherIcons.Default;
  }

  const handleBackClick = () => {
    navigate("/");
  };

  const formattedDateTime = formatWeatherDateTime(weatherData.timezone);

  return (
    <div className="WeatherCard">
      {typeof weatherData.main != "undefined" ? (
        <div className="WeatherContainerCard">
          <div className="WeatherBack" onClick={handleBackClick}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </div>
          <h3 className="WeatherHeadingCard">
            {weatherData.name}, {weatherData.sys.country}
          </h3>
          <h3 className="WeatherTinyText">{formattedDateTime}</h3>
          <div className="WeatherTopContainerCard">
            <div className="WeatherTopLeftContainerCard">
              <h3 className="WeatherIconCard">{weatherIcon}</h3>
              <h3 className="WeatherTinyText WeatherDesc">
                {weatherData.weather[0].description}
              </h3>
            </div>
            <div className="headerDividerTop"></div>

            <div className="WeatherTopRightContainerCard">
              <h3 className="WeatherBigTextCard">
                {weatherData.main.temp}&deg;c
              </h3>
              <h3 className="WeatherTinyText WeatherTemp">
                Temp Min: {weatherData.main.temp_min} &deg;C
              </h3>
              <h3 className="WeatherTinyText WeatherTemp">
                Temp Max: {weatherData.main.temp_max} &deg;C
              </h3>
            </div>
          </div>

          <div className="CardBottomContainer">
            <div className="CardBottomLeftContainer">
              <h3 className="WeatherTinyText">
                <strong>Pressure:</strong> {weatherData.main.pressure}hPa <br />
              </h3>
              <h3 className="WeatherTinyText">
                <strong>Humidity:</strong> {weatherData.main.humidity} &deg;C{" "}
                <br />
              </h3>
              <h3 className="WeatherTinyText">
                <strong>Visibility:</strong> {weatherData.visibility} %
              </h3>
            </div>
            <div className="headerDivider"></div>

            <div className="CardBottomMiddleContainer">
              <FontAwesomeIcon className="PlaneIcon" icon={faPaperPlane} />{" "}
              <br />
              <h3 className="WeatherTinyText">
                {weatherData.wind.speed} m/s {weatherData.wind.deg} Degree
              </h3>
            </div>
            <div className="headerDivider"></div>

            <div className="CardBottomRightContainer">
              <h3 className="WeatherTinyText">
                <strong>Sunrise: </strong>
                {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString(
                  "en-IN"
                )}{" "}
              </h3>
              <h3 className="WeatherTinyText">
                <strong>Sunset: </strong>
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
