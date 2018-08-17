import APIKEY from '../secrets/client_secret.json';


/**
 * list of cities JSON sample.
 * {
    "id": 519188,
    "name": "Novinki",
    "country": "RU",
    "coord": {
      "lon": 37.666668,
      "lat": 55.683334
    }
  }
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
const url = "api.openweathermap.org/data/2.5/";
export function getCity(city_name: string){
  // Do I even need to do this?
  // TODO: make the API work first then
  // Search by city name.
  let uri = url + "weather?q="+ city_name + "&APPID=" + APIKEY['web']['APPID']
  console.log("My URI = ", uri);
  
  return null;
}

export function getWeather(city_name: string) {
  // let uri = url + "weather?q="+ city_name + "&APPID=" + APIKEY['web']['APPID']
  // fetch(url, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'text/plain',
  //   },
  //   body: JSON.stringify({
  //     file: base64String,
  //   })
  // })
  // .then((response : any) => {
  //   if (!response.ok) {
  //     this.setState({results: response.statusText})
  //   }
  //   else {
  //     response.json().then((data:any) => this.setState({results: data[0].class}))
  //   }
  //   return response
  // })
}