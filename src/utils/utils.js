export const API_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY;


export function setWithExpiry(key, value, ttl) {
    const now = new Date();
    const item = {
      value: value,
      expiry: now.getTime() + ttl,
    };
    localStorage.setItem(key, JSON.stringify(item));
  }
  
