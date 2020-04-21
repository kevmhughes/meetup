import React, { Component } from 'react';
import './App.css';

import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents } from './api';
import { OfflineAlert } from './Alert';

class App extends Component {
  
  componentDidMount() {
    getEvents().then(response => this.setState({ events: response }));
  }

  state = {
    events: [],
    page: null,
    defaultCity: '',
    lat: null,
    lon: null,
    offlineText: '',
  };
  

  updateEvents = (lat, lon, page) => {
    if (!navigator.onLine)
    {
    this.setState({offlineText: "You are currently offline, events are loaded from last session" });
    }
    else
    {
      this.setState({ offlineText: "" })
    }
    if (lat && lon) {
      getEvents(lat, lon, this.state.page).then(response =>
        this.setState({ events: response, lat, lon })
      );
    } else if (page) {
      getEvents(this.state.lat, this.state.lon, page).then(response =>
        this.setState({ events: response, page })
      );
    } else {
      getEvents(this.state.lat, this.state.lon, this.state.page).then(
        response => this.setState({ events: response })
      );
    }
  };
  
  render() {
    return (
      <div className="App">
        <h1 className = "header">Meetup</h1>
        <div classNme="offline-alert">
        <OfflineAlert text={this.state.offlineText} />
        </div>
        <CitySearch updateEvents={this.updateEvents} />
        <NumberOfEvents updateEvents={this.updateEvents}/>
        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;