import React, { Component } from "react";
import Moment from 'react-moment';
import API from "../../utils/API";
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import ToggleDisplay from 'react-toggle-display';
import Card from '@material-ui/core/Card';
import AddIcon from '@material-ui/icons/Add'

const styles = theme => ({
    layout: {
        width: 'auto',
        display: 'block', // Fix IE11 issue.

        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
        },
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing.unit * 10,
        right: theme.spacing.unit * 10,
    },

})


class Weather extends Component {
    state = {
        weathers: [],
        time: [],
        title: [],
        weatherType: [],
        icons: [],
        times: [],
        show: false,

    };

    getWeather = () => {
        this.setState({
            show: this.state.show
        });
        API.getWeather("94116")
            .then(res => {
                console.log(res);
                this.setState({ weathers: "http://openweathermap.org/img/w/" + res.data.list[0].weather[0].icon + ".png" });
                for (var i = 4; i < 9; i++) {
                    this.setState({ title: res.data.list[i].weather[0].description });
                    this.state.weatherType.push(this.state.title);
                }
                for (var j = 4; j < 10; j++) {
                    this.setState({ weathers: "http://openweathermap.org/img/w/" + res.data.list[j].weather[0].icon + ".png" });
                    this.state.icons.push(this.state.weathers);
                }
                for (var k = 4; k < 10; k++) {
                    this.setState({ time: res.data.list[k].dt_txt });
                    this.state.times.push(this.state.time);
                }
                // console.log(this.state.time);
                this.setState({ show: true })
            })
            .catch(err => console.log(err));
    }

    render() {
        const { classes, theme } = this.props;

        return (
            <React.Fragment>
                <CssBaseline />
                <main className={classes.layout}>
                <Button
                    onClick={() => this.getWeather()}
                >Get Weather</Button>

                <ToggleDisplay show={this.state.show}>
                    <div id="div2">
                        <Card><h2>Current Weather</h2>
                            <img src={this.state.weathers} />
                            {this.state.title}<br></br>
                            {this.state.time}<br></br>
                            <div>
                                <h2>Weather During the Day</h2>

                                <img src={this.state.icons[0]} />
                                <img src={this.state.icons[1]} />
                                <img src={this.state.icons[2]} />
                                <img src={this.state.icons[3]} />
                                <img src={this.state.icons[4]} />
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

                <Button variant="fab" color="primary" aria-label="Add" className={classes.fab}>
                    <AddIcon />
                </Button>
            </main>
            </React.Fragment>
        )

    }
}

export default withStyles(styles)(Weather);