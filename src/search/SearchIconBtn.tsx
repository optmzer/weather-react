// tslint:disable:no-console
import { Icon, IconButton, InputAdornment } from "@material-ui/core";
import * as React from "react";

class SearchIconBtn extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    public render() {
        return (
            <InputAdornment position="end">
                <IconButton
                    aria-label="Search"
                    onClick={this.props.onClick}
                >
                    <Icon>search</Icon>
                </IconButton>
            </InputAdornment>

        );
    }
}

export default SearchIconBtn;
