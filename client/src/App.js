import React, { Component } from 'react';
import MenuAppBar from "./components/MenuAppBAr";
import API from "./utils/API";
import Button from '@material-ui/core/Button';

class App extends Component {
  state={
    list: [],
    weatherList: ""
  };

  getWeather = () => {
    console.log("here");
    API.getWeather("94116")
      .then(res => {
        console.log(res);
        // this.setState({ list: res.data })
      })
      .catch(err => console.log(err));
  }
  render() {
    return (
      <div>
        <MenuAppBar />
        <h1>Dashboard!</h1>
        <Button 
        onClick={() => this.getWeather()}
        >Get Weather</Button>

        <div>
          <h1>{this.state.weatherList}</h1>
        </div>
      </div>
    );
  }
}

export default App;
