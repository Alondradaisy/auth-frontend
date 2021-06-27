import React, { Component } from "react"; //instantiates React components w/in app

export class Home extends Component {
  render() {
    return (
      //styles the Home page inline
      <div style={{ textAlign: "center", marginTop: "15%", fontSize: 75 }}>
        Welcome to Coolest APP
      </div>
    );
  }
}

export default Home; //runs the Home page func to display
