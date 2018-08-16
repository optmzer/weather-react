import * as Ma from '@material-ui/icons'
import * as React from 'react';
import './App.css';

import SmallWeather from './smallWeather/smallWeather';

import clear from './img/weather-clear.png';
import drizzleDay from "./img/weather-drizzle-day.png";
import fewClouds from "./img/weather-few-clouds.png";


// import SmallWeatherProps from './smallWeather/smallWeather';


class App extends React.Component<any, any> {
  constructor(props: any){
      super(props);
      this.state = {
        city_name: "Auckland",
        current_temp: 30,
        current_time: Date.now()
      }
  }
// Get data from API

// Put data into

  public render() {
    // assemble options object for toLocaleTimeString() method
    const options = { 
      day: 'numeric',
      hour12: false, 
      month: 'short',
      weekday: 'short',
      year: 'numeric',
    }
    
    const timestamp = new Date(this.state.current_time).toLocaleTimeString("en-NZ", options);

    const data1 = {
      // Had to manually sort it in alphbet. order.
      date: this.state.current_time,
      iconSrc: clear,
      temp: 45
    }

    const data2 = {
      date: this.state.current_time,
      iconSrc: drizzleDay,
      temp: 28
    }

    const data3 = {
      date: this.state.current_time,
      iconSrc: fewClouds,
      temp: 30
    }

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
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
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
