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
    offlineText: ''
  };
  
  offLineAlert = () => {
    if(navigator.onLine === false) {
      this.setState({
        offlineText: 'You appear to be offline, this list is cached. Please connect to the internet for an updated list.'
      });
    } else {
      this.setState({
        offlineText: '',
      });
    }
  }
  
  updateEvents = (lat, lon, page) => {
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
        <CitySearch updateEvents={this.updateEvents} />
        <NumberOfEvents updateEvents={this.updateEvents}/>
        <OfflineAlert text={this.state.offlineText} />
        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;