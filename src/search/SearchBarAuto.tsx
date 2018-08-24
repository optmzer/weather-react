// import { FormControl, IconButton, Input, InputAdornment, InputLabel } from "@material-ui/core";
// import { Cancel, Search } from "@material-ui/icons";
import * as React from "react";
import Autosuggest from "react-autosuggest";

// Imagine you have a list of languages that you"d like to autosuggest.
const languages = [
    {
      name: "C",
      year: 1972,
    },
    {
      name: "Elm",
      year: 2012,
    },
  ];

// Teach Autosuggest how to calculate suggestions for any given input value.
// obj of {value: string, reason: string}
const getSuggestions = (data: any) => {
    console.log("getSuggestions - data", data);
    const inputValue = data.value.trim().toLowerCase();
    const inputLength = inputValue.length;
    console.log("getSuggestions - inputValue = ", inputValue);

    return inputLength === 0 ? [] : languages.filter((lang) => {
        console.log("lang = ", lang);
        return(lang.name.toLowerCase().slice(0, inputLength) === inputValue);
    });
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = (suggestion: any) => {
    console.log("getSuggestionValue = ", suggestion);
    return (suggestion.value);
};

// Use your imagination to render suggestions.
const renderSuggestion = (suggestion: any) => {
    console.log("renderSuggestion - ", suggestion);
    return(
        <div>
            {suggestion.name}, {suggestion.year}
        </div>
    );
};

class SearchBarAuto extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        // Autosuggest is a controlled component.
        // This means that you need to provide an input value
        // and an onChange handler that updates this value (see below).
        // Suggestions also need to be provided to the Autosuggest,
        // and they are initially empty because the Autosuggest is closed.
        this.state = {
            suggestions: [],
            value: "",
        };
    }

    public onChange = (event: any) => {
        // extracting newValue from the event
        console.log("onChange = ", event.target.value);
        this.setState({
            value: event.target.value,
        });
    }

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    public onSuggestionsFetchRequested = (data: any) => {
        console.log("onSuggestionsFetchRequested = ", data);
        this.setState({
            suggestions: getSuggestions(data),
        });
    }

    // Autosuggest will call this function every time you need to clear suggestions.
    public onSuggestionsClearRequested = () => {
        this.setState({
        suggestions: [],
        });
    }

    public render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
        onChange: this.onChange,
        placeholder: "Type a programming language",
        value,
    };

    // Finally, render it!
    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}// class

export default SearchBarAuto;
