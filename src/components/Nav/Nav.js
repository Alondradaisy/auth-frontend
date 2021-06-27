import React, { Component } from "react"; //instantiates React w/in proj
import { Link, NavLink } from "react-router-dom"; // instantiates react's NavLink w/in proj
import "./Nav.css"; //brings in styling file for nav bar
export class Nav extends Component {
  render() {
    return (
      <nav className="Navbar">
        {" "}
        //initializes a navbar to render in DOM
        <div className="h1-logo">
          <h1>
            {" "}
            //header text
            <Link to="/">Movie with friends!</Link> //Link is react's link tag
            with indication to path - in this case Home
          </h1>
        </div>
        <div className="right-side-nav">
          //creates a right side nav div
          <ul>
            {" "}
            //creates a listed nav bar on the right
            <li>
              <NavLink activeClassName="selected" to="/sign-up">
                {" "}
                //active link to signup path Sign up
              </NavLink>
            </li>
            <li>
              <NavLink
                activeStyle={{ borderBottom: "1px solid white" }}
                to="/login"
              >
                {" "}
                //NavLink activeStyle enables inline styling - in this case for
                Login Login
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
export default Nav; // run the Nav funcs to display
