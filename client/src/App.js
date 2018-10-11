import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MenuAppBar from "./components/MenuAppBAr";
import SignIn from './components/Auth/SignIn';
import Register from "./components/Auth/Register";
import Dash from "./components/Dash"
import Test from "./components/Auth/Test";
import Testing from "./components/Testing";
<<<<<<< HEAD
import welcome from "./components/Welcome/Welcome";
=======
import Weather from "./components/Weather";
>>>>>>> 87bbfad106e4e550e487bd6e631ce14ecbf4a8ce
import axios from "axios"

class App extends Component {
  state = {
    userID: "",
    authenticated: false
  }

  componentWillMount() {
    axios.get("/auth/login").then(res => {
      let user = res.data.user;
      if(res.status === 200 && user){
        this.setState({userID: res.data.user._id, authenticated: true})
      }
    });

  }

  handleLogin = id => {
    this.setState({ userID: id, authenticated: true });
  };

  handleLogout = () => {
    axios.get("auth/logout").then(res => {
      if(res.status === 200){
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
      return(
        <Weather authenticated={this.state.authenticatd} {...props} />
      )
    }
    return (
      <Router>
        <>
          <MenuAppBar authenticated={this.state.authenticated} handleLogout={this.handleLogout}>
            <Switch>
              <Route exact path="/" component={welcome}/>
              <Route path="/dash" exact component={MyDash}/>
              <Route path="/register" exact component={MyRegister} />
              <Route path="/signin" exact component={MySignIn} />
              <Route path="/test" exact component={Test} />
              <Route path="/testing" exact component={Testing} />
              <Route path="/weather" exact component={MyWeather} />
            </Switch>
          </MenuAppBar>
        </>
      </Router>
    );
  }
  
}

export default App;
