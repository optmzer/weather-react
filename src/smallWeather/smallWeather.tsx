import { ButtonBase, Grid, Paper, Typography } from "@material-ui/core";
import * as React from "react";
import "./smallWeather.css";

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
        return(
            <div className="small-weather">
                <Paper className="weather-tile">
                    <Grid container={true} spacing={16}>
                        <Grid item={true}>
                            <ButtonBase className="image">
                                <img className="weather-icon" alt="complex" src={this.props.data.iconSrc} />
                            </ButtonBase>
                        </Grid>
                        <Grid item={true} xs={12} sm={true} container={true}>
                            <Grid item={true} xs={true} container={true} direction="column" spacing={16}>
                                <Grid item={true} xs={true}>
                                <Typography gutterBottom={true} variant="subheading">
                                    Standard license
                                </Typography>
                                <Typography gutterBottom={true}>Full resolution 1920x1080 • JPEG</Typography>
                                <Typography color="textSecondary">ID: 1030114</Typography>
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
    }// render()
}// class
