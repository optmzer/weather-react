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

// const urlSample = "api.openweathermap.org/data/2.5/weather?q=London";
/**
 * api.openweathermap.org/data/2.5/weather?q={city name}
 * api.openweathermap.org/data/2.5/weather?q={city name},{country code}
 * Call by city name
 * api.openweathermap.org/data/2.5/weather?q=London&APPID={APIKEY}
 * Call by city name and country code
 * api.openweathermap.org/data/2.5/weather?q=London,uk
 * http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID={APIKEY}
 */
const url = "http://api.openweathermap.org/data/2.5/";
export function getCity(cityName: string) {
  const uri = url + "weather?q=" + cityName + "&APPID=" + APIKEY.web.APPID;

  return uri;
}

export function getCurrentWeather(cityName: string): Promise<any> {
  const uri = url + "weather?q=" + cityName + "&APPID=" + APIKEY.web.APPID;
  console.log("URI = ", uri);
  return fetch(uri, {
    headers: {
      "Content-Type": "text/plain",
    },
    method: "POST",
  })
  .then(
    (res) => res.json(), // Have to have this in order to get to the body.
  );
}
