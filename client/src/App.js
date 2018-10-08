import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MenuAppBar from "./components/MenuAppBAr";
import SignIn from './components/Auth/SignIn';
import Register from "./components/Auth/Register";

class App extends Component {
  render() {
    return (
      <Router>
      <div>
        <MenuAppBar>
        <Switch>
        <Route path="/register" exact component={Register} />
        <Route path="/signin" exact component={SignIn} />
      </Switch>
        </MenuAppBar>
      </div>
      </Router>
    );
  }
}

export default App;
