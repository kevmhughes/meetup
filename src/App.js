import React, { Component } from 'react';
import './App.css';

import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents } from './api';
import { OfflineAlert } from './Alert';
import moment from 'moment';
import {
  ScatterChart, Scatter, Label, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import logo from './img/meetup.svg'; // with import

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

  countEventsOnADate = (date) => {
    let count = 0;
    for (let i = 0; i < this.state.events.length; i += 1) {
      if (this.state.events[i].local_date === date) {
        count += 1;
      }
    }
    return count;
  }
  
  getData = () => {
    const next7Days = []; // Create empty array for the next 7 days
    const currentDate = moment(); // Today
    // Loop 7 times for next 7 days
    for (let i = 0; i < 7; i += 1) {
      currentDate.add(1, 'days'); // Add 1 day to current date, currentDate changes
      const dateString = currentDate.format('YYYY-MM-DD'); // Format the date
      // Use the countEventsOnADate function to count #events on this date
      const count = this.countEventsOnADate(dateString);
      next7Days.push({ date: dateString, number: count }); // Add this date and number to the list
    }
    return next7Days;
  }
  
  render() {
    return (
      <div className="App">
        <div className = "header"><img className="logo" src={logo} alt="meetup logo"></img></div>
        <div className="prebody"><h1>Find your next event</h1></div>
        <CitySearch updateEvents={this.updateEvents} />
        <div className="n-o-events">
        <NumberOfEvents updateEvents={this.updateEvents}/>
        </div>
        <div className="offline-alert">
        <OfflineAlert text={this.state.offlineText} />
        </div>
        <div className="chart-div">
        <ResponsiveContainer height={400}>
        <ScatterChart
          margin={{
            top: 20, right: 20, bottom: 20, left: 20,
          }}
        >
          <CartesianGrid />
          <XAxis type="category" dataKey="date" name="date" label={{ value: 'this week', position: 'bottom' }}/>
          <YAxis allowDecimals={false} type="number" dataKey="number" name="number of events" 
          label={{ value: 'events', angle: -90, position: 'insideLeft' }}/>
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Scatter data={this.getData()} fill="#8884d8" />
        </ScatterChart>
        </ResponsiveContainer>
        </div>
        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;