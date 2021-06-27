import axios from "axios"; //instantiates Axios || download axios via terminal || axios is a library used to make API / http reqs to retrieve data

const Axios = axios.create({
  // creates a variable for axios to be used within developing
  // refers to the web address || in this case localhost
  baseURL:
    process.env.NODE_ENV === "development" // global variable that refers to where app is being hosted
      ? "http://localhost:8080" // path in local environment
      : "deploy CLOUD ADDRESS", // hard coded for where app will be hosted
  timeout: 50000, // timer for running react axios call
});

export default Axios; // runs Axios func
