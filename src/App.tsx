import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";
import { AccessTime, AccountCircle } from "@material-ui/icons";
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
      country: "",
      current_temp_converted: "",
      current_temp_kelvin: 0, // default from weather API in Kelvin
      current_time: Date.now(),
      error_msg: "",
      farenheit: "",
      five_day_forecast: [],
      visibility: false,
    };
  }

  public getFiveDayForecast = (name: string) => {
    service.getFiveDayForecast(name)
    .then(
      (res) => {
        console.log("res = ", res);
      // Put data into state log
        if (res.cod === "200") {
          this.setState({
            city_name: res.city.name,
            country: res.city.country,
            current_temp_converted: service.tempKelvineToCelsius(res.list[0].main.temp),
            current_temp_kelvin: res.list[0].main.temp,
            error_msg: "",
            five_day_forecast: res.list,
            latitude: res.city.coord.lat,
            longitude: res.city.coord.lon,
          });
        } else {
          this.setState({
            error_msg: res.message,
          });
        }
    })
    .catch(
      (err) => {
        console.log("error_msg = ", err);
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
        <AppBar className="App-Bar" position="static" color="default">
          <Toolbar>
            <IconButton
              href="https://github.com/optmzer"
              target="_blank"
              color="inherit"
              aria-label="Menu"
            >
              <AccountCircle />
            </IconButton>
            <Typography className="App-Title" variant="title" color="inherit" style={{flexGrow: 1}}>
              Local Weather App
            </Typography>
            <div style={{flexGrow: 3, textAlign: "right"}}>
              <SearchBar getForecast={this.getFiveDayForecast}/>
            </div>
          </Toolbar>
        </AppBar>
        <div className="main-view">
          {
            this.state.error_msg === "" ?
              <h3>
                5 Day Forecast For {this.state.city_name}, {this.state.country}
              </h3>
            :
              <h3 className="error" >{this.state.error_msg}</h3>
          }
          <p>{this.state.current_temp_converted}
            <span>
              <a onClick={this.toggleTemp}>
                <span className={this.state.celsius}> °C</span> | <span className={this.state.farenheit}>°F</span>
              </a>
            </span>
          </p>
          <div className="current-time">
            <AccessTime className="current-time-icon"/>
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
