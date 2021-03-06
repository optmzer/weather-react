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
 * Import env variables from .env file.
 */
declare module 'dotenv';

/**
 * Contains data of image search result from Pexel
 */
interface IPexelImg {
  photographer: string,
  src: string,
  url: string,
  }
  