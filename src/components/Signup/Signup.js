import React, { Component } from "react"; //instantiates React components within proj

import { isAlpha, isEmail, isAlphanumeric, isStrongPassword } from "validator"; //instantiates these validators from validator library
import { toast } from "react-toastify"; // brings in toastify -> enables notifications
import Axios from "../utils/Axios"; // brings in Axios from direct path inside utils
import "./Signup.css"; // brings in css styling file for Signup page

//defines the Signup function and extends through components
export class Signup extends Component {
  //state object that stores prop values that will be handled in funcs below
  state = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstNameError: "",
    lastNameError: "",
    usernameError: "",
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
    isButtonDisabled: true,
    firstNameOnFocus: false,
    lastNameOnFocus: false,
    emailOnFocus: false,
    usernameOnFocus: false,
    passwordOnFocus: false,
    confirmPasswordOnFocus: false,
  };

  //func that handles changes to props and updates their value
  handleOnChange = (event) => {
    // setState = update
    this.setState(
      //update object property dynamically for multiple inputs
      {
        [event.target.name]: event.target.value,
      },
      //run the funcs below
      () => {
        //handles the case for first & last name inputs
        if (
          event.target.name === "firstName" ||
          event.target.name === "lastName"
        ) {
          //update first & last name to input provided
          this.handleFirstNameAndLastNameInput(event);
        }
        //handles the case for email input
        if (event.target.name === "email") {
          //update email from user input
          this.handleEmailInput();
        }
        //handles the case for username input
        if (event.target.name === "username") {
          //update username from user input
          this.handleUsernameInput();
        }
        //handles case for password input
        if (event.target.name === "password") {
          //update password from user input
          this.handlePasswordInput();
        }
        //asks user to confirm matching password
        if (event.target.name === "confirmPassword") {
          //displays password that asked user to match password
          this.handleConfirmPasswordInput();
        }
      }
    );
  };

  //function to check if user inputted matching passwords
  handleConfirmPasswordInput = () => {
    //compares the first & second password, if they do not match
    if (this.state.password !== this.state.confirmPassword) {
      //update to show err - mismatching passwords
      this.setState({
        confirmPasswordError: "Password does not match!", // err msg displayed to user
        isButtonDisabled: true,
      });
    } else {
      //however, if it is, setState (update) no err and confirm the user input
      this.setState({
        confirmPasswordError: "",
      });
    }
  };

  //function that handles user inputted password
  handlePasswordInput = () => {
    //checks the second password from user input
    if (this.state.confirmPasswordOnFocus) {
      //compares first and second password inputs, if they don't match (!==)
      if (this.state.password !== this.state.confirmPassword) {
        //set status update to display an err to user
        this.setState({
          confirmPasswordError: "Password does not match", // this is the err msg
          isButtonDisabled: true, //submit button disables if the passwords do not match
        });
      } else {
        //however, if the passwords do match, confirm the password inputs
        this.setState({
          confirmPasswordError: "",
        });
      }
    }

    // makes sure that user did not leave password field empty
    if (this.state.password.length === 0) {
      this.setState({
        // if the password field length is = 0, return err msg
        passwordError: "Password cannot be empty", // this is the err msg
        isButtonDisabled: true, //submit button disabled bc the field must have an input
      });
    } else {
      //checks to see if the password field is not empty, allow the input
      if (isStrongPassword(this.state.password)) {
        this.setState({
          passwordError: "",
        });
      } else {
        this.setState({
          //if the password is not strong enough, alert user how to make a strong password
          passwordError:
            "Password must contains 1 uppercase, 1 lowercase, 1 special character, 1 number and minimum of 8 characters long",
          // if it's not strong enough, alert user and disable button so that user cannot go forward
          isButtonDisabled: true,
        });
      }
    }
  };

  //func that handles user email input
  handleEmailInput = () => {
    //checks email length - cannot leave field empty
    if (this.state.email.length === 0) {
      //if field is left empty, send user err msg and disable submit button
      this.setState({
        emailError: "Email cannot be empty",
        isButtonDisabled: true,
      });
    } else {
      // if it is in email form, allow input
      if (isEmail(this.state.email)) {
        this.setState({
          emailError: "",
        });
      } else {
        // if it's not in correct email form, send user an err msg and disable submit form btn
        this.setState({
          emailError: "Please, enter a valid email!",
          isButtonDisabled: true,
        });
      }
    }
  };

  //func that handles first & last name input
  handleFirstNameAndLastNameInput = (event) => {
    // checks that value length is more than 0 characters long
    if (this.state[event.target.name].length > 0) {
      //checks to see if user input contains alphabet - through isAlpha validator
      if (isAlpha(this.state[event.target.name])) {
        this.setState({
          [`${event.target.name}Error`]: "",
        });
      } else {
        //if user input is anything other than letters of alphabet, alert user with err msg
        this.setState({
          [`${event.target.name}Error`]: `${event.target.placeholder} can only have alphabet`,
          //and disable submit form button
          isButtonDisabled: true,
        });
      }
    } else {
      //if the first & last name fields are empty, alert user w/ 'cannot be empty' err msg
      this.setState({
        [`${event.target.name}Error`]: `${event.target.placeholder} cannot be empty`,
        //and disable the submit form button until updated
        isButtonDisabled: true,
      });
    }
  };

  //func that handles username input
  handleUsernameInput = () => {
    //makes sure that user did not leave field empty
    if (this.state.username.length === 0) {
      this.setState({
        //if user left username field empty, alert user with err msg & disable submit button
        usernameError: "Username cannot be empty",
        isButtonDisabled: true,
      });
    } else {
      //checks to see if username contains alphabet letters and numbers isAlphanumeric - using validator
      if (isAlphanumeric(this.state.username)) {
        this.setState({
          usernameError: "",
        });
      } else {
        //if the user input a username that has anything other than alphabet letters & numbers, alert user w/ err msg below + disable button
        this.setState({
          usernameError: "Username can only have alphabet and number",
          isButtonDisabled: true,
        });
      }
    }
  };

  //func that handles form submission
  handleOnSubmit = async (event) => {
    event.preventDefault();
    //try block attempts to run the userInputObject of fields added by user
    try {
      let userInputObj = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        username: this.state.username,
        password: this.state.password,
      };
      //after axios sends a successful sign-up request via userInputObj...
      let success = await Axios.post("/api/user/sign-up", userInputObj);
      // display successfully
      console.log(success);
      //toastify / send a success notification message
      toast.success(`${success.data.message}`);
      //catch will catch errors, if any
    } catch (e) {
      //if there is an error found, toastify / send an error notification message
      toast.error(`${e.response.data.message}`);
    }
  };

  //handles fields out of focus
  handleOnBlur = (event) => {
    // console.log(event.target.name);
    // console.log("handle onBlur Triggered");
    // makes sure fields aren't empty
    if (this.state[event.target.name].length === 0) {
      this.setState({
        [`${event.target.name}Error`]: `${event.target.placeholder} cannot be empty`,
      });
    }
  };

  //compares previous props before update to state before update
  componentDidUpdate(prevProps, prevState) {
    //if the submit button is disabled, it's due to the onFocus property values and lengths not being in correct form or empty
    if (prevState.isButtonDisabled === true) {
      if (
        this.state.firstNameOnFocus &&
        this.state.lastNameOnFocus &&
        this.state.emailOnFocus &&
        this.state.usernameOnFocus &&
        this.state.passwordOnFocus &&
        this.state.confirmPasswordOnFocus
      ) {
        if (
          this.state.firstNameError.length === 0 &&
          this.state.lastNameError.length === 0 &&
          this.state.usernameError.length === 0 &&
          this.state.emailError.length === 0 &&
          this.state.passwordError.length === 0 &&
          this.state.confirmPasswordError.length === 0 &&
          this.state.password === this.state.confirmPassword
        ) {
          //if not the button will not be disabled
          this.setState({
            isButtonDisabled: false,
          });
        }
      }
    }
  }

  //handles user inputs that are focused in on
  handleInputOnFocus = (event) => {
    if (!this.state[`${event.target.name}OnFocus`]) {
      this.setState({
        [`${event.target.name}OnFocus`]: true,
      });
    }
  };

  //render the state of the validated variables
  render() {
    const {
      firstName,
      lastName,
      username,
      email,
      password,
      confirmPassword,
      firstNameError,
      lastNameError,
      usernameError,
      emailError,
      passwordError,
      confirmPasswordError,
    } = this.state;

    //handles the actual form fields
    return (
      <div className="container">
        {" "}
        //creates container to house form fields
        <div className="form-text">Sign up</div> //sign up form
        <div className="form-div">
          <form className="form" onSubmit={this.handleOnSubmit}>
            <div className="form-group-inline">
              <div className="inline-container">
                <label htmlFor="firstName">First Name</label> //first name field
                //place where user can add input - placeholder tells user what
                to add to field, onChange tells system to handles changes made
                to field, autoFocus focus field off the bat, onBlur refers to
                out of focus, and onFocus is when elements is focused in on
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  placeholder="First Name"
                  name="firstName"
                  onChange={this.handleOnChange}
                  autoFocus
                  onBlur={this.handleOnBlur}
                  onFocus={this.handleInputOnFocus}
                />
                //div that signals err to user
                <div className="errorMessage">
                  {firstNameError && firstNameError}
                </div>
              </div>

              <div className="inline-container">
                <label htmlFor="lastName">Last Name</label> //last name field
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  placeholder="Last Name"
                  name="lastName"
                  onChange={this.handleOnChange}
                  onBlur={this.handleOnBlur}
                  onFocus={this.handleInputOnFocus}
                />
                //div that signals err to user
                <div className="errorMessage">
                  {lastNameError && lastNameError}
                </div>
              </div>
            </div>

            <div className="form-group-block">
              <div className="block-container">
                <label htmlFor="email">Email</label> //email field
                <input
                  type="text"
                  id="email"
                  value={email}
                  placeholder="Email"
                  onChange={this.handleOnChange}
                  name="email"
                  onBlur={this.handleOnBlur}
                  onFocus={this.handleInputOnFocus}
                />
                //div that signals err to user
                <div className="errorMessage">{emailError && emailError}</div>
              </div>
            </div>

            <div className="form-group-block">
              <div className="block-container">
                <label htmlFor="username">Username</label> //username field
                <input
                  type="text"
                  id="username"
                  value={username}
                  placeholder="Username"
                  onChange={this.handleOnChange}
                  name="username"
                  onBlur={this.handleOnBlur}
                  onFocus={this.handleInputOnFocus}
                />
                //div that signals err to user
                <div className="errorMessage">
                  {usernameError && usernameError}
                </div>
              </div>
            </div>

            <div className="form-group-block">
              <div className="block-container">
                <label htmlFor="password">Password</label> //password field
                <input
                  type="text"
                  id="password"
                  value={password}
                  placeholder="Password"
                  onChange={this.handleOnChange}
                  name="password"
                  onBlur={this.handleOnBlur}
                  onFocus={this.handleInputOnFocus}
                />
                // div that signals err to user
                <div className="errorMessage">
                  {passwordError && passwordError}
                </div>
              </div>
            </div>

            <div className="form-group-block">
              <div className="block-container">
                <label htmlFor="confirmPassword">Confirm Password</label>{" "}
                //confirm password field
                <input
                  type="text"
                  id="confirmPassword"
                  value={confirmPassword}
                  placeholder="Confirm Password"
                  onChange={this.handleOnChange}
                  name="confirmPassword"
                  onBlur={this.handleOnBlur}
                  onFocus={this.handleInputOnFocus}
                />
                //div that alerts user to match passwords
                <div className="errorMessage">
                  {confirmPasswordError && confirmPasswordError}
                </div>
              </div>
            </div>

            <div className="button-container">
              <button type="submit" disabled={this.state.isButtonDisabled}>
                {" "}
                //submit button || toggles between disabled states depending on
                === and !== Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Signup; //runs the signup form func
