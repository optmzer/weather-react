import { Button, ButtonBase, CircularProgress, Grid, Paper, Typography } from "@material-ui/core";
import * as React from "react";
import * as service from "../services/servicesAPI";
import "./SmallWeather.css";

/**
 * TODO: It should show temp, and small weather icon
 * possibly date like 23 Apr at the bottom from its props
 * from parent component.
 * Switch between C and F.
 */
export interface ISmallWeatherProps {
    iconSrc: string;
    temp: number;
    date: number;
}

// "HelloProps" describes the shape of props.
// State is never set so we use the "{}" type.
export default class SmallWeather extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    public render() {
        const { data } = this.props;
        if (data) {
            const iconSrc = service.ICON_URL + data.weather[0].icon + ".png";

            return(
                <div className="small-weather">
                    <Paper className="weather-tile">
                        <Grid container={true} spacing={16}>
                            <Grid
                                item={true}
                                xs={5}
                                container={true}
                                direction="row"
                                style={{background: "blue"}}
                                alignItems="center"
                            >
                                <Grid item={true} xs={5}>
                                    <Typography>{service.getDayMonthYearString(data.dt * 1000)}</Typography>
                                </Grid>
                                <Grid item={true} xs={7}>
                                    <ButtonBase className="image">
                                        <img className="weather-icon" alt="complex" src={iconSrc} />
                                    </ButtonBase>
                                </Grid>
                            </Grid>
                            <Grid item={true} xs={7} container={true}>
                                <Grid item={true} xs={true} container={true} direction="column" spacing={16}>
                                    <Grid item={true} xs={true} >
                                        <div className="elements-inline">
                                            <Button variant="contained" color="default" >
                                                {data.main.temp_min}
                                            </Button>
                                            <Button variant="contained" color="default" >
                                                {data.main.temp_max}
                                            </Button>
                                        </div>
                                    </Grid>
                                    <Grid item={true}>
                                        <Typography style={{ cursor: "pointer" }}>Remove</Typography>
                                    </Grid>
                                </Grid>
                                <Grid item={true}>
                                    <Typography variant="subheading">$19.00</Typography>
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
