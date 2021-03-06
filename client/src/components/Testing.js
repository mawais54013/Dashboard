import React, { Component } from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Moment from 'react-moment';
import API from "../utils/API";
import Button from '@material-ui/core/Button';
import Calendar from 'react-calendar';
import Clock from 'react-clock';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import ToggleDisplay from 'react-toggle-display';
import Card from '@material-ui/core/Card';
import "./Card.css";





class Testing extends Component {
  
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
    reminders: [],
    remain: "",
    show: false,
    showJobs: false, 
    showEvents: false,
    showNews: false,
    showHackJobs: false,
  };

  componentDidMount() {
    this.loadReminders();
    setInterval(
      () => this.setState({ date: new Date() }),
      1000
    );
  };
  // componentDidMount() {
  //   this.loadReminders();
  // };

  loadReminders = () => {
    API.getReminders()
      .then(res =>
        this.setState({ reminders: res.data, remain:"" })
      )
      .catch(err => console.log(err));
  };

handleInputChange = event => {
  const{ name, value } = event.target;
  this.setState({
    [name]: value
  });
};

setReminder = event => {
  console.log("tester");
  if(this.state.reminder)
  {
    API.saveReminder({
      reminder: this.state.reminder,
    })
    .then(res => this.loadReminders())
    .catch(err => console.log(err));
  }
};
  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  getHackJobs = () => {
    this.setState({
      showHackJobs: !this.state.show
    });
    API.getHackerJobs()
    .then(res => {
      console.log(res.data[0].title);
      this.setState({ hackJobs: res.data[0].title})
    });
  }

  getNews = () => { 
    this.setState({
      showNews: !this.state.show
    });
    console.log(this.state.reminders);
    API.getNews()
    .then(res => {
      console.log(res.data[0].title);
      this.setState({ news: res.data[0].title })
    })
  }

  getEvents = () => {
    console.log("here");
    this.setState({
      showEvents: !this.state.show
    });
    API.getEvents("sanfrancisco")
    .then(res => {
      console.log(res.data);
      this.setState({ events: res.data.results[0] })
    })
  }

  getJobs = () => {
    this.setState({
      showJobs: !this.state.show
    });
     API.getJobs("javascript")
     .then(res => {
      //  console.log("banana: ", res);
      this.setState({ jobs: res.data[0] })
      // console.log(this.state.jobs);
     })
     .catch(err => console.log("hello",err));
  }

  getWeather = () => {
    this.setState({
      show: this.state.show
    });
    API.getWeather("94116")
      .then(res => {
        console.log(res);
        this.setState({ weathers: "http://openweathermap.org/img/w/" + res.data.list[0].weather[0].icon + ".png"});
        for(var i = 4; i < 9; i++)
        {   
          this.setState({ title: res.data.list[i].weather[0].description });
          this.state.weatherType.push(this.state.title);
        }
        for(var j = 4; j < 10; j++)
        {   
          this.setState({ weathers: "http://openweathermap.org/img/w/" + res.data.list[j].weather[0].icon + ".png" });
          this.state.icons.push(this.state.weathers);
        }
        for(var k = 4; k < 10; k++)
        {   
          this.setState({ time: res.data.list[k].dt_txt });
          this.state.times.push(this.state.time);
        }
        // console.log(this.state.time);
      })
      .catch(err => console.log(err));
  }
  
  onChange = date => this.setState({ date })
 

  render() {
    
    return (
      <React.Fragment>
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
        {/* <p>Current time:</p> */}
      </div>
      <ToggleDisplay show={this.state.show}>
      <div>
        <br></br>
        <MuiThemeProvider>
        <form id="myForm">
					<Paper style={{width: '90%', leftMargin: '15px'}} zDepth={1}>
					<div 
						style={{marginLeft: '10px'}}
					>
            <TextField 
              value = {this.state.reminder}
              onChange = {this.handleInputChange}
							placeholder="What needs to be done?"
							name="reminder" 
              fullWidth={true}
							// onChange={(e) => this.setState({ inputValue: e.target.value })}
						>
						</TextField>
					</div>
          <div>
            <h2>Reminders on my list</h2>
            {/* {this.state.reminders.reminder} */}
              {/* {this.state.reminders.map(things => (
                  <ReminderCard
                  id={things.id}
                  key={things.id}
                  reminder={things.reminder}
                  />
              ))} */}
            
          </div>
					</Paper>
						<br/>
            <Button 
        disabled={!(this.state.reminder)}
        onClick={() => this.setReminder()}>
        Set Reminder</Button>
					</form>
        </MuiThemeProvider>
      </div>
      </ToggleDisplay>

      <div id="div1">
      <Card> <Clock
          value={this.state.date}
        /></Card>
      </div>

      <ToggleDisplay show={this.state.show}>
      <div>
        <MuiThemeProvider>
          <div>
            <form>
            <Paper style={{width: '90%', leftMargin: '15px'}} zDepth={1}>
            
					<div 
						style={{marginLeft: '10px'}}
					>
						<TextField 
              placeholder="What needs to be done?"
							className="AddText" 
							fullWidth={true}
							onChange={(e) => this.setState({ inputValue: e.target.value })}
						>
						</TextField>
					</div>
					</Paper>
          <br/>
          <Button
        onClick={() => this.addReminder()}>
        Add Reminder</Button>
            </form>
          </div>
        </MuiThemeProvider>
      </div>
      </ToggleDisplay>

      <div>
        <Calendar
          onChange={this.onChange}
          value={this.state.date}
        />
      </div>
      <ToggleDisplay show={this.state.show}>
        <div id="div2">
        <Card><h2>Current Weather</h2>
            {/* {this.getWeather()} */}
           <img src={this.state.weathers} alt={this.state.time}/>
           {this.state.title}<br></br>
           {this.state.time}<br></br>
           <div>
            <h2>Weather During the Day</h2>
            
            <img src={this.state.icons[0]} alt={this.state.times[0]}/>
            <img src={this.state.icons[1]} alt={this.state.times[1]}/>
            <img src={this.state.icons[2]} alt={this.state.times[2]}/>
            <img src={this.state.icons[3]} alt={this.state.times[3]}/>
            <img src={this.state.icons[4]} alt={this.state.times[4]}/>
            </div><br></br>
            <div>
          <Moment format=" hh:mm a  " date={this.state.times[0]} />
          <Moment format=" hh:mm a  " date={this.state.times[1]} />
          <Moment format=" hh:mm a  " date={this.state.times[2]} />
          <Moment format=" hh:mm a  " date={this.state.times[3]} />
          <Moment format=" hh:mm a  " date={this.state.times[4]} />
    
        </div>

           </Card>
        </div>
        </ToggleDisplay>
        
        <ToggleDisplay show={this.state.showJobs}>
        <div>
          <h3>Jobs Selection</h3>
            {this.state.jobs.company}<br></br>
            {this.state.jobs.title}<br></br>
            {this.state.jobs.location}<br></br>
            <a href={this.state.jobs.url}>Link</a>
          </div>
          </ToggleDisplay>

          <ToggleDisplay show={this.state.showEvents}>
          <div>
            <h3>Events Section</h3>
            {this.state.events.name}
          </div>
          </ToggleDisplay>
          
        <ToggleDisplay show={this.state.showNews}>
        <div>
          <h3>News Section</h3>
          {this.state.news}
        </div>
        </ToggleDisplay>
        <ToggleDisplay show={this.state.showHackJobs}>
        <div>
          <h3>Hacker Jobs Section</h3>
          {this.state.hackJobs}
        </div>
        </ToggleDisplay>
      </React.Fragment>
    );
}

}

export default Testing;