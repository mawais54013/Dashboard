import React, { Component } from 'react';
import Moment from 'react-moment';
import MenuAppBar from "./components/MenuAppBAr";
import API from "./utils/API";
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Calendar from 'react-calendar';
import Grid from '@material-ui/core/Grid';
import Clock from 'react-clock';
import Paper from '@material-ui/core/Paper';
import Drawer from '@material-ui/core/Drawer';
import { gitCard } from './components/gitHubJobs/gitHubJobs';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';




class App extends Component {
  
  state={
    left: false,
    data: new Date(),
    weathers: [],
    time: [],
    title: [],
    weatherType: [],
    icons: [],
    times: [],
    jobs: [],
    events: [],
    news: [],
    hackJobs: [],
  };
  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  getHackJobs = () => {
    console.log("tetser");
    API.getHackerJobs()
    .then(res => {
      console.log(res.data[0].title);
      this.setState({ hackJobs: res.data[0].title})
    })
  }

  getNews = () => { 
    // console.log("tester");
    API.getNews()
    .then(res => {
      console.log(res.data[0].title);
      this.setState({ news: res.data[0].title })
    })
  }

  getEvents = () => {
    console.log("here");
    API.getEvents("sanfrancisco")
    .then(res => {
      console.log(res.data);
      this.setState({ events: res.data.results[0] })
    })
  }

  getJobs = () => {
     API.getJobs("javascript")
     .then(res => {
      //  console.log("banana: ", res);
      this.setState({ jobs: res.data[0] })
      // console.log(this.state.jobs);
     })
     .catch(err => console.log("hello",err));
  }

  getWeather = () => {
  
    API.getWeather("94116")
      .then(res => {
        // console.log("tester");
        this.setState({ weathers: "http://openweathermap.org/img/w/" + res.data.list[0].weather[0].icon + ".png"});
        for(var i = 0; i < 5; i++)
        {   
          this.setState({ title: res.data.list[i].weather[0].description });
          this.state.weatherType.push(this.state.title);
        }
        for(var j = 0; j < 6; j++)
        {   
          this.setState({ weathers: "http://openweathermap.org/img/w/" + res.data.list[j].weather[0].icon + ".png" });
          this.state.icons.push(this.state.weathers);
        }
        for(var k = 0; k < 6; k++)
        {   
          this.setState({ time: res.data.list[k].dt_txt });
          this.state.times.push(this.state.time);
        }
        // console.log(this.state.time);
      })
      .catch(err => console.log(err));
  }
  
  onChange = date => this.setState({ date })

  componentDidMount() {
    setInterval(
      () => this.setState({ date: new Date() }),
      1000
    );
  }
  
  render() {
    
    return (
      
      <div>
         
        <MenuAppBar />
        <h1>Dashboard!</h1>
        <Button 
        onClick={() => this.getWeather()}
        >Get Weather</Button>
        <Button
        onClick={() => this.getJobs()}>
        Get Jobs</Button>
        <Button
        onClick={() => this.getEvents()}>
        Get Events</Button>
        <Button
        onClick={() => this.getNews()}>
        Get News</Button>
        <Button
        onClick={() => this.getHackJobs()}>
        Get Hack Jobs</Button>
        <div>
        <p>Current time:</p>
        <Clock
          value={this.state.date}
        />
      </div>
      <div>
        <Calendar
          onChange={this.onChange}
          value={this.state.date}
        />
      </div>
        <div>
          <h2>Current Weather</h2>
           <img src={this.state.weathers} />
        </div>
        <div>
          {this.state.title}
        </div>
        <div>
          {this.state.time}
        </div>

        <div>
        <h2>Weather During the Day</h2>
        <img src={this.state.icons[0]} />
        <img src={this.state.icons[1]} />
        <img src={this.state.icons[2]} />
        <img src={this.state.icons[3]} />
        <img src={this.state.icons[4]} />
        </div>

        <div>
          {" " + this.state.weatherType + " "}
        </div>
        <div>
          <Moment format="hh:mm a  " date={this.state.times[0]} />
          <Moment format=" hh:mm a  " date={this.state.times[1]} />
          <Moment format=" hh:mm a  " date={this.state.times[2]} />
          <Moment format=" hh:mm a  " date={this.state.times[3]} />
          <Moment format=" hh:mm a  " date={this.state.times[4]} />
    
        </div>
        
        <div>
          <h3>Jobs Selection</h3>
            {this.state.jobs.company}<br></br>
            {this.state.jobs.title}<br></br>
            {this.state.jobs.location}<br></br>
            <a href={this.state.jobs.url}>Link</a>
          </div>

          <div>
            <h3>Events Section</h3>
            {this.state.events.name}
          </div>

        <div>
          <h3>News Section</h3>
          {this.state.news}
        </div>
        <div>
          <h3>Hacker Jobs Section</h3>
          {this.state.hackJobs}
        </div>
      </div>
    
    );
  }
}


export default App;
