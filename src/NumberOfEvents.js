import React, { Component } from 'react';
import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {

    state = {
        numberOfEvents: 32,
      }

    handleInputChanged = (event) => {
        const value = event.target.value;
        this.setState({ numberOfEvents: value });
        this.props.updateEvents(null, null, value);

        if (value  <= 0) {
          this.setState({
            infoText: 'The number needs to be at least 1',
          });
        } else {
          this.setState({
            infoText: '',
          });
        }

      }

  render() {
    return(
      <div className="number-of-events">
        <ErrorAlert text={this.state.infoText} />
        <label>Number of events: </label>
        <input
          type="number"
          className="number-of-events-input"
          value={this.state.numberOfEvents}
          onChange={this.handleInputChanged}
        />
      </div>
    );
  }
}

export default NumberOfEvents;