import * as React from 'react';
import 'small-weather.css';

/**
 *  TODO: It should show temp, and small weather icon
 * possibly date like 23 Apr at the bottom from its props
 * from parent component.
 * Switch between C and F.
 */ 
export interface SmallWeatherProps { 
    icon: string;
    temp: string;
    date: Date;
}

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export default class SmallWeather extends React.Component<SmallWeatherProps, {}> {
    render(){
        return(
            <div className="small-weather">
                <img src={this.props.icon}/>
                <p>{this.props.temp}C</p>
                <p>{this.props.date}</p>
            </div>
        ); // return()
    }// render()
}// class
