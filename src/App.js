import { BrowserRouter as Router, Route } from "react-router-dom"; // instantiates React components into proj
import { ToastContainer } from "react-toastify"; // instantiates React toastify components into proj (toastify enables notification pop-ups)

import Signup from "./components/Signup/Signup"; // registers Signup file route directly from path
import Login from "./components/Login/Login"; // registers Login file route directly from path
import Home from "./components/Home/Home"; // registers Home file route directly from path
import Nav from "./components/Nav/Nav"; // registers Nav file route directly from path

import "./App.css"; // adds the css file for the overall app
import "react-toastify/dist/ReactToastify.css"; // instantiates toastify css file

function App() {
  // func to run the app
  return (
    <Router>
      // initializes a dynamic react app to render components
      <ToastContainer position="top-center" /> //styles the position for
      toastify component
      <Nav /> // initializes navigation within app || the components below are
      placed within this nav bar
      <>
        <Route exact path="/sign-up" component={Signup} /> // nested route adds
        exact path for Signup page
        <Route exact path="/login" component={Login} /> // nested route adds
        exact path for Login page
        <Route exact path="/" component={Home} /> // nested route adds exact
        path for Homepage
      </>
    </Router> // closing router tag to encapsulate components
  );
}

export default App; // run the app
