import React, { Component } from 'react';
import {ResponsiveContainer, PieChart, Pie, Legend, Tooltip, Cell, Line} from "recharts";


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

      getData() {
        let peopleGoing = this.props.event.yes_rsvp_count;
        let spotsAvailable =
          this.props.event.rsvp_limit - this.props.event.yes_rsvp_count;
    
        return [
          { name: "Attending", value: peopleGoing },
          { name: "Places free", value: spotsAvailable }
        ];
      }
    

  render() {
      const showDetails = this.state.showDetails;
      const event = this.props.event;
      let colors = ["#e34542", "#43e06d"]
      
    return (
      <div className="event">
          <div className="main-info">
            <p className="time">{this.props.event.local_time} - {this.props.event.local_date}</p>
            <p className="name">{this.props.event.name}</p>
            <p className="group-name">{this.props.event.group.name}</p>
            <p className="going">Going: {this.props.event.yes_rsvp_count}</p>

          {showDetails &&
            <button className="details-btn" onClick={() => this.handleShowDetails()}>hide details</button>
          }
          {!showDetails &&
            <button className="details-btn" onClick={() => this.handleShowDetails()}>show details</button>
          }
        </div>

          {showDetails &&
         <div className="event-details">
         <hr/>
         {this.props.event.rsvp_limit ? (
           <ResponsiveContainer height={200}>
           <PieChart width={100} height={100}>
             <Pie isAnimationActive={false} data={this.getData()} dataKey="value" cx="50%" cy="50%" outerRadius={40} label> 
               { 
                 this.getData().map((entry, index) => (
                   <Cell key={`cell-${index}`} fill={colors[index]}/>
                 ))
               }
             </Pie>
             <Tooltip />
             <Legend verticalAlign="top" height={30}> 
               <Line name="Attending" type="monotone" dataKey="spotsTaken" stroke="#8884d8" />
               <Line name="Spots Open" type="monotone" dataKey="spotsFree" stroke="#82ca9d" />
             </Legend>
           </PieChart>
         </ResponsiveContainer>
         ):(
           ""
         )           
         }
            <div className="description" dangerouslySetInnerHTML={{__html: event.description}}/>
          </div>
          }

      </div>
    );
  }
}

export default Event;