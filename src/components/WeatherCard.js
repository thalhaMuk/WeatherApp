import React, { useEffect, useState } from "react";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { getWeatherDataWithId } from "../utils/apiHelper";
import { weatherIcons } from "../utils/constants";
import { formatWeatherDateTime } from "../utils/utils";

import "../styles/WeatherCard.css";

export default function WeatherCard(props) {
  const [weatherData, setWeatherData] = useState([]);
  const [randomColor, setRandomColor] = useState([]);
  const navigate = useNavigate();
  const cityID = props.cityId;
  const ttl = props.cityTtl;
  let weatherIcon = null;

  useEffect(() => {
    fetchDataAndSetExpiry();
    const cacheCleanupInterval = setInterval(checkCacheExpiry, 1000);
    return () => clearInterval(cacheCleanupInterval);
  }, []);

  const checkCacheExpiry = () => {
    const currentTime = new Date().getTime();
    const dataFromLocalStorage = localStorage.getItem(cityID);
    if (dataFromLocalStorage) {
      const obj = JSON.parse(dataFromLocalStorage);
      if (obj.expiryTime && currentTime >= obj.expiryTime) {
        localStorage.removeItem(cityID);
      }
    }
  };

  const fetchDataAndSetExpiry = async () => {
    let dataFromLocalStorage = localStorage.getItem(cityID);
    let obj = dataFromLocalStorage ? JSON.parse(dataFromLocalStorage) : null;
    const currentTime = new Date().getTime();

    if (obj && obj.expiryTime && currentTime < obj.expiryTime) {
      setWeatherData(obj.value);
    } else {
      try {
        const result = await getWeatherDataWithId(cityID);
        setWeatherData(result);

        const ttlInSeconds = parseInt(ttl, 10);
        if (!isNaN(ttlInSeconds) && typeof result.main !== "undefined") {
          const expiryTime = currentTime + ttlInSeconds;
          const dataToCache = {
            value: result,
            expiryTime: expiryTime,
          };
          localStorage.setItem(cityID, JSON.stringify(dataToCache));
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    }
    setRandomColor("#" + Math.floor(Math.random() * 16777215).toString(16));
  };

  if (typeof weatherData.main != "undefined") {
    weatherIcon = weatherData.weather[0].main
      ? weatherIcons[weatherData.weather[0].main]
      : weatherIcons.Default;
  }

  const handleCardClick = () => {
    navigate(`/${props.cityId}`);
  };

  const formattedDateTime = formatWeatherDateTime(weatherData.timezone);

  return (
    <div className="Card" onClick={handleCardClick}>
      {typeof weatherData.main != "undefined" ? (
        <div className="Container" style={{ backgroundColor: randomColor }}>
          {/*Cannot remove this inline css since css cannot genereate random colors*/}
          <div className="TopContainer">
            <div className="TopLeftContainer">
              <h3 className="Heading">
                {weatherData.name}, {weatherData.sys.country}
              </h3>
              <h3 className="TinyText Time">{formattedDateTime}</h3>
              <h3 className="TinyText WeatherDesc">
                {weatherIcon} {weatherData.weather[0].description}
              </h3>
            </div>

            <div className="TopRightContainer">
              <h3 className="BigText">{weatherData.main.temp} &deg;C</h3>
              <h3 className="TinyText Temp">
                Temp Min: {weatherData.main.temp_min} &deg;C
                <br />
                Temp Max: {weatherData.main.temp_max} &deg;C
              </h3>
            </div>
          </div>

          <div className="BottomContainer">
            <div className="BottomLeftContainer">
              <h3 className="TinyText">
                <strong>Pressure:</strong> {weatherData.main.pressure}hPa <br />
                <strong>Humidity:</strong> {weatherData.main.humidity} &deg;C{" "}
                <br />
                <strong>Visibility:</strong> {weatherData.visibility} %
              </h3>
            </div>
            <div className="headerDivider"></div>

            <div className="BottomMiddleContainer">
              <FontAwesomeIcon icon={faPaperPlane} />
              <h3 className="TinyText Bottom">
                <strong>
                  {weatherData.wind.speed} m/s {weatherData.wind.deg} Degree
                </strong>
              </h3>
            </div>
            <div className="headerDivider"></div>

            <div className="BottomRightContainer">
              <h3 className="TinyText">
                <strong>Sunrise:</strong>{" "}
                {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString(
                  "en-IN"
                )}{" "}
                <br />
                <strong>Sunset:</strong>{" "}
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
