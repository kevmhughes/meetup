import React, { Component } from 'react';
import { getSuggestions } from './api';
import { InfoAlert } from './Alert';

class CitySearch extends Component {

  state = {
    query: '',
    suggestions: [],
    infoText: '',
    offlineText: ''
  }


  handleInputChanged = (event) => {
    const value = event.target.value;
    this.setState({ query: value });
  
    if (!navigator.onLine)
    {
      this.props.updateEvents({ offlineText: "You are currently offline." });
    }
    else
    {
      this.props.updateEvents({ offlineText: "" })
    }

    getSuggestions(value).then(suggestions => {
      this.setState({ suggestions });

      if (value && suggestions.length === 0) {
        this.setState({
          infoText: 'We cannot find your choice. Please try again.',
        });
      } else {
        this.setState({
          infoText: '',
        });
      }
    });
  }

  handleItemClicked = (value, lat, lon) => {
    this.setState({ query: value, suggestions: [] });
    this.props.updateEvents(lat, lon);
  }

  render() {
    return (
      <div className="CitySearch">
        <div className="info-alert">
        <InfoAlert text={this.state.infoText} />
        </div>
        <input
          type="text"
          placeholder="Search"
          className="city"
          value={this.state.query}
          onChange={this.handleInputChanged}
        />
        <ul className="suggestions">
          {this.state.suggestions.map(item => (
            <li
              key={item.name_string}
              onClick={() =>
                this.handleItemClicked(item.name_string, item.lat, item.lon)
              }
            >
              {item.name_string}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default CitySearch;