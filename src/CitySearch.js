import React, { Component } from 'react';
import { getSuggestions } from './api';
import { InfoAlert, OfflineAlert } from './Alert';

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
      this.props.updateEvents({ warningText: "You are currently offline, events are loaded from last session" });
    }
    else
    {
      this.props.updateEvents({ warningText: "" })
    }
  
    getSuggestions(value).then(suggestions => {
      this.setState({ suggestions });

      if (value && suggestions.length === 0) {
        this.setState({
          infoText: 'We can not find the city you are looking for. Please try another city',
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
        <h1>Choose a city to check out its events </h1>
        <div className="offline-alert">
        <OfflineAlert text={this.state.offlineText} />
        </div>
        <div className="info-alert">
        <InfoAlert text={this.state.infoText} />
        </div>
        <input
          type="text"
          placeholder="Your chosen city"
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