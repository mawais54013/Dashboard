import React, { Component } from 'react';
import Moment from 'react-moment';
import API from "../utils/API";
import Calendar from 'react-calendar';
import Clock from 'react-clock';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Agenda from './agenda';
import './agenda.css'
import { CssBaseline } from '@material-ui/core';


const styles = theme => ({
    layout: {
        width: 'auto',
        display: 'block', // Fix IE11 issue.

        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
        },
    },
})

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
        };
        setInterval(
          () => this.setState({ date: new Date() }),
          1000
        );
    }
    onChange = date => this.setState({ date })

    render() {
        const { classes, theme } = this.props;
        return (
            <React.Fragment>
                <CssBaseline />
                {/* <div >
                    <Calendar
                    onChange={this.onChange}
                    value={this.state.date}
                    />
                </div> */}
                
                <div id="div1">
                <Card> <Clock
                    value={this.state.date}
                    /></Card>
                </div>
              
                <div id="div3">
                    <Calendar
                    onChange={this.onChange}
                    value={this.state.date}
                    />
                </div>
                
                <Card>
                <Agenda/>
                </Card>
                
               
            </React.Fragment>
            
        )
    }
}

export default withStyles(styles)(Dash);