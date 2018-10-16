import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MenuAppBar from "./components/MenuAppBar";
import SignIn from './components/Auth/SignIn';
import Register from "./components/Auth/Register";
import Dash from "./components/Dash"
import Test from "./components/Auth/Test";
import HorizontalNonLinearStepper from "./components/userForm/userForm"
import Testing from "./components/Testing";
import Weather from "./components/Weather";
import Welcome from "./components/Welcome/Welcome";
import News from "./components/News";
import gitJobs from "./components/GitJobs";
import HackerJobs from "./components/HackerJobs";
import Events from "./components/Events";
import Reminders from "./components/reminder";
import axios from "axios";


class App extends Component {
  state = {
    userID: "",
    authenticated: false
  }

  componentDidMount() {
    axios.get("/auth/login").then(res => {
      let user = res.data.user;
      if (res.status === 200 && user) {
        this.setState({ userID: res.data.user._id, authenticated: true })
      }
    });

  }

  handleLogin = id => {
    this.setState({ userID: id, authenticated: true });
  };

  handleLogout = () => {
    axios.get("auth/logout").then(res => {
      if (res.status === 200) {
        this.setState({ userID: "", authenticated: false });
      }
    });
  }

  render() {
    const MyDash = (props) => {
      return (
        <Dash authenticated={this.state.authenticated} userID={this.state.userID} {...props} />
      )
    }

    const MyRegister = (props) => {
      return (
        <Register login={this.handleLogin} {...props} />
      )
    }

    const MySignIn = (props) => {
      return (
        <SignIn login={this.handleLogin} authenticated={this.state.authenticated} {...props} />
      )
    }

    const MyWeather = (props) => {
      return (
        <Weather authenticated={this.state.authenticated} {...props} />
      )
    }

    const MyNews = (props) => {
      return (
      <News authenticated={this.state.authenticated} {...props}/>
      )
    }

    const MyMenuAppBar = (props) => {
      return(
        <Router>
        <>
          <MenuAppBar authenticated={this.state.authenticated} handleLogout={this.handleLogout}>
            <Switch>
              <Route path="/dash" exact component={MyDash}/>
              <Route path="/register" exact component={MyRegister} />
              <Route path="/signin" exact component={MySignIn} />
              <Route path="/test" exact component={Test} />
              <Route path="/testing" exact component={Testing} />
              <Route path="/weather" exact component={MyWeather} />
              <Route path="/news" exact component={MyNews} />
              <Route path="/userForm" exact component={HorizontalNonLinearStepper} />
              <Route path="/hackerJobs" exact component={HackerJobs} />
              <Route path="/events" exact component={Events} />
              <Route path="/gitJobs" exact component={gitJobs} />
              <Route path="/reminders" exact component={Reminders} />

            </Switch>
          </MenuAppBar>
        </>
      </Router>
            )
    }
    return (
      <Router>
        <>
          <Switch>
            <Route path="/" exact component={Welcome} />
            <Route component={MyMenuAppBar} />
          </Switch>
          
        </>
      </Router>
    );
  }

}

export default App;
