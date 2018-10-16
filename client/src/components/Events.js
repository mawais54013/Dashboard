import React, { Component } from "react";
import API from "../utils/API";
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
// import EventIC from "./InformationCards/EventIC"
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
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

    componentDidMount() {

       this.eventsListed();

    }

    eventsListed = () => {
        API.getEvents('sanfrancisco')
            .then(res => {
                console.log(res);
                this.setState({ eventList: res.data.results })
                console.log(this.state.eventList);

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

          );
    }
}
export default withStyles(styles)(allEvents);