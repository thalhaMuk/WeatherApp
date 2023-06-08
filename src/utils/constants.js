import {
  faCloud,
  faBolt,
  faCloudRain,
  faCloudShowersHeavy,
  faSnowflake,
  faSun,
  faSmog,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const API_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

export function setWithExpiry(key, value) {
  const ttl = 300000; // 5 minutes
  const now = new Date();
  const item = {
    value: value,
    expiry: now.getTime() + ttl,
  };
  localStorage.setItem(key, JSON.stringify(item));
}

export const weatherIcons = {
  Thunderstorm: <FontAwesomeIcon className="WeatherIcon" icon={faBolt} />,
  Drizzle: <FontAwesomeIcon className="WeatherIcon" icon={faCloudRain} />,
  Rain: <FontAwesomeIcon className="WeatherIcon" icon={faCloudShowersHeavy} />,
  Snow: <FontAwesomeIcon className="WeatherIcon" icon={faSnowflake} />,
  Clear: <FontAwesomeIcon className="WeatherIcon" icon={faSun} />,
  Clouds: <FontAwesomeIcon className="WeatherIcon" icon={faCloud} />,
  Default: <FontAwesomeIcon className="WeatherIcon" icon={faSmog} />,
};

export function formatWeatherDateTime(timezone) {
  const DateOptions = {
    month: 'short',
    day: 'numeric',
  };

  const FormatTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, '0');
    return `${formattedHours}.${formattedMinutes}${ampm}`;
  };

  const utcDate = new Date(Date.now()).getTime() - (19800 * 1000);
  const shiftInSeconds = timezone;
  const localDate = new Date(utcDate + (shiftInSeconds * 1000));
  const formattedTime = FormatTime(localDate);
  const formattedDate = localDate.toLocaleDateString('en-IN', DateOptions);

  return `${formattedTime}, ${formattedDate}`;
}