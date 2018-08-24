/**
 * Allows import of any .json files into the app.
 */
declare module "*.json" {
    const value: any;
    export default value;
}

/**
 * 3rd party react module to implement autosuggest
 */
declare module "react-autosuggest";

/**
 * City data object from city.list.json that
 * contains list of all the cities openweather.org collects data for.
 */
interface ICityData {
    id: number;
    name: string;
    country: string;
    coord: {
      lon: number;
      lat: number;
    }
  }
  