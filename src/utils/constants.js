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

export const weatherIcons = {
  Thunderstorm: <FontAwesomeIcon className="WeatherIcon" icon={faBolt} />,
  Drizzle: <FontAwesomeIcon className="WeatherIcon" icon={faCloudRain} />,
  Rain: <FontAwesomeIcon className="WeatherIcon" icon={faCloudShowersHeavy} />,
  Snow: <FontAwesomeIcon className="WeatherIcon" icon={faSnowflake} />,
  Clear: <FontAwesomeIcon className="WeatherIcon" icon={faSun} />,
  Clouds: <FontAwesomeIcon className="WeatherIcon" icon={faCloud} />,
  Default: <FontAwesomeIcon className="WeatherIcon" icon={faSmog} />,
};
