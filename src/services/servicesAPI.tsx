// tslint:disable:no-console
import APIKEY from "../secrets/client_secret.json";

/**
 * list of cities JSON sample.
 * {
 *   "id": 519188,
 *   "name": "Novinki",
 *   "country": "RU",
 *   "coord": {
 *     "lon": 37.666668,
 *     "lat": 55.683334
 *   }
 * }
 */

// const API_URLSample = "api.openweathermap.org/data/2.5/weather?q=London";
/**
 * api.openweathermap.org/data/2.5/weather?q={city name}
 * api.openweathermap.org/data/2.5/weather?q={city name},{country code}
 * Call by city name
 * api.openweathermap.org/data/2.5/weather?q=London&APPID={APIKEY}
 * Call by city name and country code
 * api.openweathermap.org/data/2.5/weather?q=London,uk
 * http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID={APIKEY}
 */
const API_URL = "http://api.openweathermap.org/data/2.5/";

/**
 * Usage
 * ICON_URL + 10d.png = "http://openweathermap.org/img/w/10d.png"
 */
export const ICON_URL = "http://openweathermap.org/img/w/";

const headers: Headers = new Headers({
  "Content-Type": "text/plain",
});

// assemble options object for toLocaleTimeString() method
const options24Hours = {
  hour12: false,
};

// assemble options object for toLocaleTimeString() method
const optionsFullDateTime = {
  day: "numeric",
  hour12: false,
  month: "short",
  weekday: "short",
  year: "numeric",
};

const optionsDayMonthYear = {
  day: "numeric",
  month: "short",
  timeZone: "UTC",
  year: "numeric",
};

export function getTime24Hour(time: number): string {
  return new Date(time).toLocaleTimeString("en-NZ", options24Hours);
}

export function getFullDateTime(time: number): string {
  return new Date(time).toLocaleTimeString("en-NZ", optionsFullDateTime);
}

export function getDayMonthYearString(time: number): string {
  return new Date(time).toLocaleString("en-NZ", optionsDayMonthYear);
}

// ======

// Kelvin to Farenhaite
export function tempKelvineToFahrenheit(tempKelv: number): string {
  const Farenheit = (9 / 5 * (tempKelv - 273)) + 32;
  return Farenheit.toFixed(2);
}

// Kelvine to Celsius
export function tempKelvineToCelsius(tempKelv: number): string {
  const Celsius = tempKelv - 273;
  return Celsius.toFixed(2);
}

// meters/sec to Miles/hour 1 mile = 1609.344 meters
export function convertMetersToMilesHours(meters: number): string {
  const mph = meters / 0.44704;
  return mph.toFixed(2);
}

// ======

export function getCityId(cityName: string) {
  const uri = API_URL + "weather?q=" + cityName + "&APPID=" + APIKEY.web.APPID;
  return uri;
}

export function getCurrentWeather(cityName: string): Promise<any> {
  const uri = API_URL + "weather?q=" + cityName + "&APPID=" + APIKEY.web.APPID;
  return fetch(uri, {
    headers,
    method: "POST",
  })
  .then(
    (res) => res.json(), // Have to have this in order to get to the body.
  );
}

export function getFiveDayForecast(cityName: string): Promise<any> {
  const uri = API_URL + "forecast?q=" + cityName + "&APPID=" + APIKEY.web.APPID;
  return fetch(uri, {
    headers,
    method: "POST",
  })
  .then(
    (res) => res.json(), // Have to have this in order to get to the body.
  );
}
