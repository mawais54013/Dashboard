import React, { Component } from 'react';
import Moment from 'react-moment';
import API from "../utils/API";
import Button from '@material-ui/core/Button';


class Dash extends Component {

    state = {
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

    componentWillMount() {
        if(!this.props.authenticated){
            this.props.history.push("/signin");
        }
    }

    getWeather = () => {

        API.getWeather("94116")
            .then(res => {
                // console.log("tester");
                this.setState({ weathers: "http://openweathermap.org/img/w/" + res.data.list[0].weather[0].icon + ".png" });
                for (var i = 0; i < 5; i++) {
                    this.setState({ title: res.data.list[i].weather[0].description });
                    this.state.weatherType.push(this.state.title);
                }
                for (var j = 0; j < 6; j++) {
                    this.setState({ weathers: "http://openweathermap.org/img/w/" + res.data.list[j].weather[0].icon + ".png" });
                    this.state.icons.push(this.state.weathers);
                }
                for (var k = 0; k < 6; k++) {
                    this.setState({ time: res.data.list[k].dt_txt });
                    this.state.times.push(this.state.time);
                }
                // console.log(this.state.time);
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <>
            <div>
                <Button
                    onClick={() => this.getWeather()}
                >Get Weather</Button>
                
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
            </>
        )
    }
}

export default Dash;