import * as React from 'react';
import './smallWeather.css';

/**
 *  TODO: It should show temp, and small weather icon
 * possibly date like 23 Apr at the bottom from its props
 * from parent component.
 * Switch between C and F.
 */ 
export interface ISmallWeatherProps { 
    iconSrc: string;
    temp: number;
    date: number;
}

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export default class SmallWeather extends React.Component<any, {}> {
    // constructor(props: any){
    //     super(props);
    // }
    
    public render(){
        return(
            <div className="small-weather">
                <img className="small-weather-img" src={this.props.data.iconSrc}/>
                <div className="small-weather-metric">
                    <p className="small-weather-temp">{this.props.data.temp}</p>
                    <p className="small-weather-date">{this.props.data.date}</p>
                </div>
            </div>
        ); // return()
    }// render()
}// class
