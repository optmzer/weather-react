/**
 * api.openweathermap.org/data/2.5/weather?q={city name}
 * api.openweathermap.org/data/2.5/weather?q={city name},{country code}
 * Call by city name
 * api.openweathermap.org/data/2.5/weather?q=London&APPID={APIKEY}
 * Call by city name and country code
 * api.openweathermap.org/data/2.5/weather?q=London,uk
 * http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID={APIKEY}
 */
const WEATHER_API_URI = "https://api.openweathermap.org/data/2.5/";
const PEXELS_API_URI = "https://api.pexels.com/v1/search?query=";
/**
 * Usage
 * ICON_URL + 10d.png = "http://openweathermap.org/img/w/10d.png"
 */
export const ICON_URL = "https://openweathermap.org/img/w/";

const headers: Headers = new Headers({
  "Content-Type": "text/plain; charset=utf-8",
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

export function getCurrentWeather(cityName: string): Promise<any> {
  const uri = WEATHER_API_URI + "weather?q=" + cityName + "&APPID=" + process.env.REACT_APP_WEATHER_APPID;
  return fetch(uri, {
    headers,
    method: "POST",
  })
  .then(
    (res) => res.json(), // Have to have this in order to get to the body.
  );
}

export function getFiveDayForecast(cityName: string): Promise<any> {
  const uri = WEATHER_API_URI + "forecast?q=" + cityName + "&APPID=" + process.env.REACT_APP_WEATHER_APPID;
  return fetch(uri, {
    headers,
    method: "POST",
  })
  .then(
    (res) => res.json(), // Have to have this in order to get to the body.
  );
}

/**
 * Fetches a picture from Pexel.com by description
 * of weather condition
 * Always credit our photographers when possible (e.g.
 * "Photo by John Doe on Pexels" with a link to the photo page on Pexels).
 *
 * req -
 * add a HTTP Authorization header to each of your requests
 * Authorization: YOUR_API_KEY
 *
 * https://api.pexels.com/v1/search?query=example+query&per_page=15&page=1
 * query -	Get photos related to this query. (required)
 * per_page - Defines the number of results per page. (optional, default: 15, max: 40)
 * page -	Defines the number of the page. (optional, default: 1)
 *
 * res -
 * use medium or large
 * {
 * page: 1,
 * per_page: 15,
 * total_results: 236,
 * url: "https://www.pexels.com/search/example%20query/",
 * next_page: "https://api.pexels.com/v1/search/?page=2&per_page=15&query=example+query"
 * photos: [{
 * width: 1000,
 * height: 1000,
 * url: "https://www.pexels.com/photo/12345",
 * photographer: "Name",
 * src: {
 *   original: "https://*.jpg",
 *   large: "https://*.jpg",
 *   large2x: "https://*.jpg",
 *   medium: "https://*.jpg",
 *   small: "https://*.jpg",
 *   portrait: "https://*.jpg",
 *   landscape: "https://*.jpg",
 *   tiny: "https://*.jpg"
 *   }, (NEXT PHOTOS)]
 *  }
 * }
 */
export function getBackgroundPic(description: string): Promise<any> {
  const queryURI = PEXELS_API_URI + description + "&per_page=5&page=1";
  const APIKEY: string = process.env.REACT_APP_PEXEL_API_KEY as string;
  return fetch(queryURI, {
    headers: new Headers({
      "Authorization": APIKEY,
      "Content-Type": "text/plain; charset=utf-8",
    }),
    method: "GET",
  } ).then(
    (res) => res.json(),
  );
}

export function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}
