// tslint:disable:no-console
import { FormControl, IconButton, Input, InputLabel } from "@material-ui/core";
// import TextField from "@material-ui/core/TextField";
import { Cancel, Search } from "@material-ui/icons";
import * as React from "react";

class SearchBar extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            city_name: "Auckland",
        };
        this.handleClickSearch();
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
                    <InputLabel htmlFor="adornment-city-name">City Name</InputLabel>
                    <Input
                        id="adornment-search"
                        name="city_name"
                        type="text"
                        value={this.state.city_name}
                        onChange={this.onTextChange}
                    />
                    <span>
                        <IconButton
                            aria-label="Search"
                            onClick={this.handleClickSearch}
                            onMouseDown={this.handleMouseDownSearch}
                        >
                            <Search />
                        </IconButton>
                    </span>
                    <span>
                        <IconButton
                            aria-label="Cancel"
                            onClick={this.handleClickCancel}
                            onMouseDown={this.handleMouseDownSearch}
                        >
                            <Cancel />
                        </IconButton>
                    </span>
                </FormControl>
            </div>
        );
    }
}

export default SearchBar;
