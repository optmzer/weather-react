import * as React from 'react';
import './App.css';

import SmallWeather from './smallWeather/smallWeather';

import clear from './img/weather-clear.png';
import drizzleDay from "./img/weather-drizzle-day.png";
import fewClouds from "./img/weather-few-clouds.png";

// import SmallWeatherProps from './smallWeather/smallWeather';


class App extends React.Component {

// Get data from API

// Put data into

  public render() {

    const data1 = {
      date: Date.now(),
      iconSrc: clear,
      temp: 45
    }

    const data2 = {
      date: Date.now(),
      iconSrc: drizzleDay,
      temp: 28
    }

    const data3 = {
      date: Date.now(),
      iconSrc: fewClouds,
      temp: 30
    }

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="mail-view">
          <h3>City Name</h3>
          <span>Current temp</span>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum deleniti veritatis corrupti eius sed fugit molestiae nisi placeat aspernatur tempore!</p>
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
