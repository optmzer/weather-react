// tslint:disable:no-console
import "./App.css";

import * as Ma from "@material-ui/icons";
import * as React from "react";
import * as service from "./services/servicesAPI";

import drizzleDay from "./img/weather-drizzle-day.png";
import fewClouds from "./img/weather-few-clouds.png";
import SearchBar from "./search/SearchBar";
import SmallWeather from "./smallWeather/smallWeather";

// this is working too.
const iconURL = "http://openweathermap.org/img/w/10d.png";

class App extends React.Component<any, any> {
  constructor(props: any) {
      super(props);
      this.state = {
        celsius: "active", // default in Celsius
        city_name: "Auckland", // default Auckland
        current_temp_converted: "",
        current_temp_kelvin: 0, // default from weather API in Kelvin
        current_time: Date.now(),
        farenheit: "",
        five_day_forecast: [],
      };

      this.getCurrentWeather();
      this.getFiveDayForecast();
  }

  // Get data from API
  public getCurrentWeather = () => {
    service.getCurrentWeather(this.state.city_name)
    .then(
      (res) => {
      // Put data into state log
      console.log("JSON.stringify(res) = ", JSON.stringify(res));
      this.setState({
        current_temp_converted: this.tempKelvineToCelsius(res.main.temp),
        current_temp_kelvin: res.main.temp,
        latitude: res.coord.lat,
        longitude: res.coord.lon,
      });
    })
    .catch(
      (err) => {
        console.log(err);
      },
    );
  }

  public getFiveDayForecast = () => {
    service.getFiveDayForecast(this.state.city_name)
    .then(
      (res) => {
        console.log(res);
      // Put data into state log
        if (res.list.length !== 0) {
          this.setState({
            current_temp_converted: this.tempKelvineToCelsius(res.list[0].main.temp),
            current_temp_kelvin: res.list[0].main.temp,
            latitude: res.city.coord.lat,
            longitude: res.city.coord.lon,
          });
        }
    })
    .catch(
      (err) => {
        console.log(err);
      },
    );
  }

  // Kelvin to Farenhaite
  public tempKelvineToFahrenheit = (tempKelv: number): string => {
    const Farenheit = (9 / 5 * (tempKelv - 273)) + 32;
    return Farenheit.toFixed(2);
  }

  // Kelvine to Celsius
  public tempKelvineToCelsius = (tempKelv: number): string => {
    const Celsius = tempKelv - 273;
    return Celsius.toFixed(2);
  }

  // Toggles temp between C and F.
  public toggleTemp = (): void => {
    if (this.state.celsius !== "active") {
      this.setState(() => {
        return {
          celsius: "active",
          current_temp_converted: this.tempKelvineToCelsius(this.state.current_temp_kelvin),
          farenheit: "",
        };
      });
    } else {
      this.setState(() => {
        return {
          celsius: "",
          current_temp_converted: this.tempKelvineToFahrenheit(this.state.current_temp_kelvin),
          farenheit: "active",
        };
      });
    }
  }

  public render() {

    const data1 = {
      date: service.getTime24Hour(this.state.current_time),
      iconSrc: iconURL,
      temp: 45,
    };

    const data2 = {
      date: service.getTime24Hour(this.state.current_time),
      iconSrc: drizzleDay,
      temp: 28,
    };

    const data3 = {
      date: service.getTime24Hour(this.state.current_time),
      iconSrc: fewClouds,
      temp: 30,
    };

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Your Local Weather App</h1>
        </header>
        <div className="main-view">
          <SearchBar />
          <h3>{this.state.city_name}</h3>
          <p>{this.state.current_temp_converted}
            <span>
              <a onClick={this.toggleTemp}>
                <span className={this.state.celsius}> °C</span> | <span className={this.state.farenheit}>°F</span>
              </a>
            </span>
          </p>
          <div className="current-time">
            <Ma.AccessTime className="current-time-icon"/>
            <span>{service.getFullDateTime(this.state.current_time)}</span>
          </div>

          <p>lat = {this.state.latitude}, lon = {this.state.longitude}</p>
        </div>
        <div className="grid-view">
          <SmallWeather data={data1}/>
          <SmallWeather data={data2}/>
          <SmallWeather data={data3}/>
        </div>
      </div>
    );
  }
}

export default App;
