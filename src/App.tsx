/** javadoc */
import { AccessTime } from "@material-ui/icons";
import * as React from "react";
import "./App.css";
import drizzleDay from "./img/weather-drizzle-day.png";
import fewClouds from "./img/weather-few-clouds.png";
import { getCity } from "./services/servicesAPI";
import SmallWeather from "./smallWeather/smallWeather";
/** Blah blah */
const iconURL = "http://openweathermap.org/img/w/10d.png";

class App extends React.Component<any, any> {
  constructor(props: any) {
      super(props);
      this.state = {
        city_name: "Auckland",
        current_temp: 30,
        current_time: Date.now(),
      };
  }

  public render() {
    const options = {
      hour12: false,
    };

    const timestamp = new Date(this.state.current_time).toLocaleTimeString("en-NZ", options);

    const data1 = {
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
            <AccessTime className="current-time-icon"/>
            <span>{timestamp}</span>
          </div>
          <p>{getCity("Auckland")}</p>
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
