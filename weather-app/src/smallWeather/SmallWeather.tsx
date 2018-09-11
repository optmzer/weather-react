import { Button, ButtonBase, CircularProgress, Grid, Paper, Typography } from "@material-ui/core";
import { NearMe } from "@material-ui/icons";
import * as React from "react";
import * as service from "../services/servicesAPI";
import "./SmallWeather.css";

// State is never set so we use the "{}" type.
class SmallWeather extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    public render() {
        const { data, celsius } = this.props;
        let tempMin;
        let tempMax;
        let windSpeed;
        if (data) {
            const iconSrc = service.ICON_URL + data.weather[0].icon + ".png";
            if (celsius === "active") {
                tempMin = "" + service.tempKelvineToCelsius(data.main.temp_min) + "°C";
                tempMax = "" + service.tempKelvineToCelsius(data.main.temp_max) + "°C";
                windSpeed = "" + data.wind.speed + " m/s";
            } else {
                tempMin = "" + service.tempKelvineToFahrenheit(data.main.temp_min) + "°F";
                tempMax = "" + service.tempKelvineToFahrenheit(data.main.temp_max) + "°F";
                windSpeed = "" + service.convertMetersToMilesHours(data.wind.speed) + " mph";
            }
            return(
                <div className="small-weather">
                    <Paper>
                        <Grid container={true} spacing={16} className="weather-tile">
                            <Grid
                                item={true}
                                xs={5}
                                container={true}
                                direction="row"
                                alignItems="baseline"
                                style={{paddingBottom: "0.4em"}}
                            >
                                <Grid item={true} xs={5} style={{textAlign: "center"}}>
                                    <Typography>{service.getDayMonthYearString(data.dt * 1000)}</Typography>
                                </Grid>
                                <Grid item={true} xs={7}>
                                    <ButtonBase className="image">
                                        <img className="weather-icon" alt="complex" src={iconSrc} />
                                    </ButtonBase>
                                </Grid>
                            </Grid>
                            <Grid item={true} xs={7} container={true}>
                                <Grid item={true} xs={true} container={true} direction="row" spacing={8}>
                                    <Grid item={true} xs={3}>
                                        <Button
                                            variant="text"
                                            color="default"
                                            style={{
                                                background: "#ccccff",
                                                minHeight: "20px",
                                                padding: "0",
                                                width: "80px",
                                            }}
                                        >
                                            {tempMin}
                                        </Button>
                                    </Grid>
                                    <Grid item={true} xs={3}>
                                        <Button
                                            variant="flat"
                                            color="default"
                                            style={{
                                                background: "#dfbf9f",
                                                minHeight: "20px",
                                                padding: "0",
                                                width: "80px"}}
                                        >
                                            {tempMax}
                                        </Button>
                                    </Grid>
                                    <Grid item={true} container={true} xs={6} alignItems="flex-start">
                                        <Typography variant="caption">
                                            {data.weather[0].description}
                                        </Typography>
                                    </Grid>
                                    <Grid
                                        item={true}
                                        container={true}
                                        direction="row"
                                        xs={12}
                                        alignContent="space-around"
                                    >
                                        <Typography>
                                            Wind: {windSpeed}, <NearMe/> {data.wind.deg}
                                        </Typography>
                                    </Grid>
                                    <Grid
                                        item={true}
                                        container={true}
                                        direction="row"
                                        xs={12}
                                        alignContent="flex-start"
                                    >
                                        <Typography>
                                            Humidity: {data.main.humidity}%, {data.main.pressure} hPa
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </div>
            ); // return()
        } else {
            return(
                <div className="small-weather">
                    <CircularProgress thickness={2} />
                </div>
            ); // return()
        }
    }// render()
}// class

export default SmallWeather;
