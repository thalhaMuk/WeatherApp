import { API_KEY } from './constants';

export async function getWeatherDataWithId(cityId) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${API_KEY}`;
  try {
    const response = await fetch(apiUrl);
    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      throw new Error('Failed to fetch weather data');
    }
  } catch (error) {
    throw new Error('Failed to fetch weather data');
  }
}
