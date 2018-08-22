// tslint:disable:no-console
import * as Ma from "@material-ui/icons";
import * as React from "react";
import "./App.css";
import SearchBar from "./search/SearchBar";
import * as service from "./services/servicesAPI";
import SmallWeather from "./smallWeather/SmallWeather";

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
        current_temp_converted: service.tempKelvineToCelsius(res.main.temp),
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
            current_temp_converted: service.tempKelvineToCelsius(res.list[0].main.temp),
            current_temp_kelvin: res.list[0].main.temp,
            five_day_forecast: res.list,
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

  // Toggles temp between C and F.
  public toggleTemp = (): void => {
    if (this.state.celsius !== "active") {
      this.setState(() => {
        return {
          celsius: "active",
          current_temp_converted: service.tempKelvineToCelsius(this.state.current_temp_kelvin),
          farenheit: "",
        };
      });
    } else {
      this.setState(() => {
        return {
          celsius: "",
          current_temp_converted: service.tempKelvineToFahrenheit(this.state.current_temp_kelvin),
          farenheit: "active",
        };
      });
    }
  }

  public render() {

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
            <SmallWeather data={this.state.five_day_forecast[0]} celsius={this.state.celsius}/>
            <SmallWeather data={this.state.five_day_forecast[8]} celsius={this.state.celsius}/>
            <SmallWeather data={this.state.five_day_forecast[16]} celsius={this.state.celsius}/>
          </div>
      </div>
    );
  }
}

export default App;
