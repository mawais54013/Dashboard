import React, { Component } from "react";
import API from "../utils/API";
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

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
        this.jobsListed();
    }

    jobsListed = () => {
        API.getJobs('javascript')
            .then(res => {
                console.log(res);
                this.setState({ eventList: res.data[0].title })
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
        return (
            <React.Fragment>
                <CssBaseline />
                <Card>
                    <CardHeader title="Jobs"/>

                    <CardContent>
                        <Typography>
                            {this.state.eventList}
                        </Typography>
                    </CardContent>
                </Card>
            </React.Fragment>
            
          );
    }
}
export default withStyles(styles)(allEvents);