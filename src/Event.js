import React, { Component } from 'react';


class Event extends Component {

    state = {
        showDetails: false,
        events: [],
      }

      handleShowDetails = () => {
        if(this.state.showDetails === false) {
          this.setState({ showDetails: true });
        }
        else {
          this.setState({ showDetails: false });
        }
      }

  render() {
      const showDetails = this.state.showDetails;

    return (
      <div className="event">

        
          {showDetails &&
            <button className="details-btn" onClick={() => this.handleShowDetails()}>hide details</button>
          }
          {!showDetails &&
            <button className="details-btn" onClick={() => this.handleShowDetails()}>show details</button>
          }
          
          {showDetails &&
          <div className="event-details">
          </div>
          }

      </div>
    );
  }
}

export default Event;