import React, { Component } from "react";
import API from "../utils/API";
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add'
// import EventIC from "./InformationCards/EventIC"
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import "./events.css";

const styles = theme => ({
    layout: {
        width: 'auto',
        display: 'block',
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing.unit * 10,
        right: theme.spacing.unit * 10,
    },
});

class allEvents extends Component {
    state = {
        open: false,
        eventList: [],
        place: '',
    }

    componentWillMount() {
        this.eventsListed();
    }

    eventsListed = () => {
        API.getEvents('sanfrancisco')
            .then(res => {
                console.log(res);
                this.setState({ eventList: res.data.results })
                console.log(this.state.eventList)
            })
            .catch(err => console.log(err));
    };

    addLocation = () => {
        let locations = this.state.eventList;
        locations.push(this.state.place);
        this.setState({ locations: locations, place: "", open: false })
    }
    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    render() {
        const { classes } = this.props;
        return (
        
            <Card>
            <CardHeader/>

            <CardContent>
                <Typography>
                
                </Typography>
            </CardContent>
        </Card>
          );
    }
}
export default withStyles(styles)(allEvents);