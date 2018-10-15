import React, { Component } from "react";
import API from "../utils/API";
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add'
import WeatherIC from "./InformationCards/WeatherIC"
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import "./weather.css"

const styles = theme => ({
    layout: {
        width: "auto",
        display: 'block', // Fix IE11 issue.
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            height: 700,
            marginLeft: 'auto',
            marginRight: 'auto',
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
        open: false,
        locations: [],
        zip: ""

    };

    componentWillMount() {
        if (this.props.authenticated) {
            this.setState({locations: ["94116", "48182"]});
        }
        else {
            this.setState({locations: ["94116", "48182"]});
        }
    }

    getWeather = () => {
        API.getWeather("94116")
            .then(res => {
                console.log(res);
            })
            .catch(err => console.log(err));
    }

    addLocation = () => {
        let locations = this.state.locations;
        locations.push(this.state.zip);
        this.setState({ locations: locations, zip: "", open: false })
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
            // <React.Fragment>
            <div className="weather-background">
                <CssBaseline />
                    {/* <Button
                        onClick={() => this.getWeather()}
                    >Get Weather</Button> */}

                    <Grid container spacing={8} alignItems="flex-start" className={classes.informationCard}>

                            {this.state.locations.map(zipcode =>
                                <Grid item xs={12} md={6} lg={4} xl={3}>
                        <WeatherIC zip={zipcode} />
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
                                To track the weather for a new location enter the zipcode
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                name="zip"
                                label="ZIP Code"
                                type="number"
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
            {/* </React.Fragment> */}
            </div>
        )

    }
}

export default withStyles(styles)(Weather);