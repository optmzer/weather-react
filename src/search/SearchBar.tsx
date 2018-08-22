import { FormControl, IconButton, Input, InputAdornment, InputLabel } from "@material-ui/core";
import { Cancel, Search } from "@material-ui/icons";
import * as React from "react";

class SearchBar extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            city_name: "",
        };
        this.props.getForecast("Auckland"); // Default value for now
    }

    public onTextChange = (event: any) => {
        console.log("Event = ", event.target.value);
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    public handleMouseDownSearch = (event: any) => {
        event.preventDefault();
    }

    public handleClickSearch = () => {
        console.log("Send API request to Weather", this.state.city_name);
        this.props.getForecast(this.state.city_name);
        this.setState({
            city_name: "",
        });
    }

    public handleClickCancel = () => {
        this.setState({
            city_name: "",
        });
    }

    public render() {
        return(
            <div>
                <FormControl className="search-bar">
                    <InputLabel htmlFor="adornment-city-name">Search City Name</InputLabel>
                    <Input
                        id="adornment-search"
                        name="city_name"
                        type="text"
                        value={this.state.city_name}
                        onChange={this.onTextChange}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="Search"
                                    onClick={this.handleClickSearch}
                                    onMouseDown={this.handleMouseDownSearch}
                                >
                                    <Search />
                                </IconButton>
                                <IconButton
                                    aria-label="Cancel"
                                    onClick={this.handleClickCancel}
                                    onMouseDown={this.handleMouseDownSearch}
                                >
                                    <Cancel />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
            </div>
        );
    }
}

export default SearchBar;
