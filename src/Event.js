import React, { Component } from 'react';


class Event extends Component {

    state = {
        showDetails: false,
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
      const event = this.props.event;
      
    return (
      <div className="event">
          <div className="main-info">
            <p className="time">{this.props.event.local_time} - {this.props.event.local_date}</p>
            <p className="name">{this.props.event.name}</p>
            <p className="group-name">{this.props.event.group.name}</p>
            <p className="going">{this.props.event.yes_rsvp_count}</p>

          {showDetails &&
            <button className="details-btn" onClick={() => this.handleShowDetails()}>hide details</button>
          }
          {!showDetails &&
            <button className="details-btn" onClick={() => this.handleShowDetails()}>show details</button>
          }
        </div>

          {showDetails &&
          <div className="event-details">
            <div className="description" dangerouslySetInnerHTML={{__html: event.description}} />
          </div>
          }

      </div>
    );
  }
}

export default Event;