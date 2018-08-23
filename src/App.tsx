import { AppBar, Card, CardContent, GridList, GridListTile, IconButton, Toolbar, Typography } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
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
              <AccountCircle className="github"/>
            </IconButton>
            <Typography className="App-Title" variant="title" color="inherit" style={{flexGrow: 1}}>
              Local Weather App
            </Typography>
            <div style={{flexGrow: 3, textAlign: "right"}}>
              <SearchBar getForecast={this.getFiveDayForecast}/>
            </div>
          </Toolbar>
        </AppBar>
        <Card
          className="mainViewCard"
          style={{
            backgroundImage: "url(\"https://images.pexels.com/photos/1340156/pexels-photo-1340156.jpeg\")",
            backgroundRepeat: "no-repeat",
            backgroundSize: "auto 100%",
            textAlign: "right",
          }}
        >
          <CardContent className="">
            {
              this.state.error_msg === "" ?
                <div>
                  <Typography variant="headline">5 Day Forecast For</Typography>
                  <Typography variant="headline">
                    {this.state.city_name}, {this.state.country}
                  </Typography>
                </div>
              :
                <Typography variant="headline">{this.state.error_msg}</Typography>
            }
            <Typography
              variant="subheading"
              style={{
                fontSize: "1.5rem",
                paddingBottom: "0.2em",
                paddingTop: "0.2em",
              }}
            > {this.state.current_temp_converted}
              <span className="tempToggle">
                <a onClick={this.toggleTemp}>
                  <span className={this.state.celsius}> °C</span> | <span className={this.state.farenheit}>°F</span>
                </a>
              </span>
            </Typography>
            <div className="current-time">
              <Typography
                variant="body2"
                style={{
                  fontSize: "1.5rem",
                }}
              >
                {service.getFullDateTime(this.state.current_time)}
              </Typography>
            </div>
            <Typography variant="subheading" color="textSecondary">
              lat = {this.state.latitude}, lon = {this.state.longitude}
            </Typography>
          </CardContent>
        </Card>
        <div className="grid-view">
          <GridList
            className=""
            cellHeight="auto"
            spacing={4}
            cols={4}
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-around",
              overflow: "hidden",
            }}
          >
            {
              this.state.five_day_forecast.map(
                (data: any, index: number) => {
                  if (index % 8 === 0) {
                    return (
                      <GridListTile key={data.dt} cols={4}>
                        <SmallWeather data={data} celsius={this.state.celsius} style={{backgroundColor: "#f5f5f5"}}/>
                      </GridListTile>
                    );
                  }
                  return null;
                },
              )
            }
          </GridList>
        </div>
      </div>
    );
  }
}

export default App;
