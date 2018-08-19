// tslint:disable:no-console
// React
import * as Ma from "@material-ui/icons";
import * as React from "react";
import "./App.css";
// local
import drizzleDay from "./img/weather-drizzle-day.png";
import fewClouds from "./img/weather-few-clouds.png";
import * as service from "./services/servicesAPI";
import SmallWeather from "./smallWeather/smallWeather";

// this is working too.
const iconURL = "http://openweathermap.org/img/w/10d.png";

class App extends React.Component<any, any> {
  constructor(props: any) {
      super(props);
      this.state = {
        city_name: "Auckland",
        current_temp: 30,
        current_time: Date.now(),
      };

      this.getWeather();
  }

  // Get data from API
  public getWeather = () => {
    service.getWeather(this.state.city_name)
    .then(
      (res) => {
      // Put data into state log
      console.log("JSON.stringify(res) = ", JSON.stringify(res));
      this.setState({
        current_temp: res.main.temp,
        current_time: res.dt,
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

  public render() {
    // assemble options object for toLocaleTimeString() method
    const options = {
      // day: "numeric",
      hour12: false,
      // month: "short",
      // weekday: "short",
      // year: "numeric",
    };

    const timestamp = new Date(this.state.current_time).toLocaleTimeString("en-NZ", options);

    const data1 = {
      // Had to manually sort it in alphbet. order.
      date: this.state.current_time,
      iconSrc: iconURL,
      temp: 45,
    };

    const data2 = {
      date: this.state.current_time,
      iconSrc: drizzleDay,
      temp: 28,
    };

    const data3 = {
      date: this.state.current_time,
      iconSrc: fewClouds,
      temp: 30,
    };

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Your Local Weather App</h1>
        </header>
        <div className="mail-view">
          <h3>{this.state.city_name}</h3>
          <p>{this.state.current_temp}<span>C|F</span></p>
          <div className="current-time">
            <Ma.AccessTime className="current-time-icon"/>
            <span>{timestamp}</span>
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
