import React, { Component } from 'react';
import Calendar from 'react-calendar';
import Clock from 'react-clock';
import Card from '@material-ui/core/Card';
import Agenda from './agenda';
import './agenda.css'
import { CssBaseline } from '@material-ui/core';
import './dash.css'

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

    componentDidMount() {
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
        return (
            <div className="dash-background">
                <CssBaseline />
                <div id="div2">
                    <Calendar
                    onChange={this.onChange}
                    value={this.state.date}
                    />
                </div>
                <br></br>
                <br></br>
              
                
                <div id="div1">
                <Card> <Clock
                    value={this.state.date}
                    /></Card>
                </div>
              
                {/* <div id="div3">
                    <Calendar
                    onChange={this.onChange}
                    value={this.state.date}
                    />
                </div> */}
        
                <div id="div3">
                <Card>
                <Agenda/>
                </Card>
                </div>
                
               
            </div>
            
        )
    }
}

export default Dash;