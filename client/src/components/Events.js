import React, { Component } from "react";
import API from "../utils/API";
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add'
<<<<<<< HEAD
// import EventIC from "./InformationCards/EventIC"
=======
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
>>>>>>> 95ee464663a168748716b73e62658dbc2416151f
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
<<<<<<< HEAD
        this.eventsListed();
=======
       this.eventsListed();
>>>>>>> 95ee464663a168748716b73e62658dbc2416151f
    }

    eventsListed = () => {
        API.getEvents('sanfrancisco')
            .then(res => {
                console.log(res);
                this.setState({ eventList: res.data.results })
<<<<<<< HEAD
                console.log(this.state.eventList)
=======
                console.log(this.state.eventList);
>>>>>>> 95ee464663a168748716b73e62658dbc2416151f
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

    openInNewTab = url => {
      window.open(url, '_blank');
    }

    render() {
        const { classes } = this.props;
        return (
<<<<<<< HEAD
        
            <Card>
            <CardHeader/>

            <CardContent>
                <Typography>
                
                </Typography>
            </CardContent>
        </Card>
=======
          this.state.eventList.map(elem => {
            return <Card >
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                 {elem.group.name}
                </Typography>
                <Typography>
                 {elem.name}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
            <Button size="small" color="primary" onClick={()=>this.openInNewTab(elem.event_url)}>
                Learn More
              </Button>
            </CardActions>
          </Card>
          })
>>>>>>> 95ee464663a168748716b73e62658dbc2416151f
          );
    }
}
export default withStyles(styles)(allEvents);