import React, { Component } from "react";
import API from "../utils/API";
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add'
import EventIC from "./InformationCards/EventIC"
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

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
        if(this.props.authenticated) {

        } 
        else 
        {
            this.setState({ eventList: ['sanfrancisco']});
        }
    }

    eventsListed = () => {
        // this.setState({
        //     showNews: !this.state.show
        // });
        API.getEvents('sanfrancisco')
            .then(res => {
                console.log(res);
                // this.setState({ eventList: res.data.results[0] })
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
            <React.Fragment>
                <CssBaseline />
                {/* <Button
                        onClick={() => this.getEvents()}
                    >Get Events</Button> */}
                <Grid container spacing={8} alignItems="flex-start" className={classes.informationCard}>

                    {this.state.eventList.map(place =>
                        <Grid item xs={12} md={6} lg={4} xl={3}>
                    <EventIC zip={place} />
                        </Grid>
                    )
                    }
                </Grid>
                <Button variant="fab" color="primary" aria-label="Add" className={classes.fab} onClick={this.handleClickOpen}>
                    <AddIcon />
                </Button>

                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Add Location</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To track the weather for a new location enter the name of a city
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="zip"
                            label="Place"
                            type="text"
                            fullWidth
                            onChange={this.handleInputChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="default">
                            Cancel
                        </Button>
                        <Button onClick={this.addLocation} color="primary">
                            Add
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
          );
    }
}
export default withStyles(styles)(allEvents);