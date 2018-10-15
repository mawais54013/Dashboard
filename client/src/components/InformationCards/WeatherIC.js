import React, { Component } from "react";
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import RefreshIcon from '@material-ui/icons/Refresh';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import API from "../../utils/API";
import Moment from 'react-moment';

const styles = theme => ({
    actions: {
        display: 'flex',
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
        marginLeft: 'auto',
        [theme.breakpoints.up('sm')]: {
            marginRight: -8,
        },
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
});

class Result extends Component {
    state = {
        expanded: false,
        title: "Current Weather in [City]"
        

    };

    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    };

    getWeather = () => {
        this.setState({
            show: this.state.show
        });
        API.getWeather(this.props.zip)
            .then(res => {
                console.log(res);
                let title = "Current Weather in " + res.data.city.name;
                this.setState({ title: title, date: res.data.list[0].dt_txt, icon: res.data.list[0].weather[0].icon, weathers: "http://openweathermap.org/img/w/" + res.data.list[0].weather[0].icon + ".png", weather1: "http://openweathermap.org/img/w/" + res.data.list[1].weather[0].icon + ".png", weather2: "http://openweathermap.org/img/w/" + res.data.list[2].weather[0].icon + ".png",
              weather3: "http://openweathermap.org/img/w/" + res.data.list[3].weather[0].icon + ".png", weather4: "http://openweathermap.org/img/w/" + res.data.list[0].weather[0].icon + ".png",
            time: res.data.list[0].dt_txt, time1: res.data.list[1].dt_txt, time2: res.data.list[2].dt_txt, time3: res.data.list[3].dt_txt, time4: res.data.list[4].dt_txt})
                console.log(this.state.icon);
            })
            .catch(err => console.log(err));
    }

    componentWillMount() {
        this.getWeather();
    }

    render() {
        const { classes } = this.props;
        
        return (
          // this.state.eventList.map(elem => { 
            <Card>
                <CardHeader
                    title={this.state.title}
                    subheader={this.state.date}
                />
                <CardContent>
                    <Typography paragraph variant="body2">
                        Today's Forecast: 
                        {/* {this.props.icons.map(elem => <img src={`http://openweathermap.org/img/w/${this.state.icon}.png`} alt="temp-icon"/>)} */}
                        </Typography>
<<<<<<< HEAD
                        
=======
                        <img src = {this.state.weathers}/>
                        <Moment format=" hh:mm a  " date={this.state.time} />
                        <img src = {this.state.weather1}/>
                        <Moment format=" hh:mm a  " date={this.state.time1} />
                        <img src = {this.state.weather2}/>
                        <Moment format=" hh:mm a  " date={this.state.time2} />
                        <img src = {this.state.weather3}/>
                        <Moment format=" hh:mm a  " date={this.state.time3} />
                        <img src = {this.state.weather4}/>
                        <Moment format=" hh:mm a  " date={this.state.time4} />
>>>>>>> deaedc3f154b228e3f3acf5f6c62a15b9664d087
                </CardContent>
                <CardActions className={classes.actions} disableActionSpacing>
                    <IconButton aria-label="Add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="Refresh">
                        <RefreshIcon />
                    </IconButton>
                    <IconButton
                        className={classnames(classes.expand, {
                            [classes.expandOpen]: this.state.expanded,
                        })}
                        onClick={this.handleExpandClick}
                        aria-expanded={this.state.expanded}
                        aria-label="Show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph variant="body2">
                            Extended Forecast:
                        </Typography>

                    </CardContent>
                </Collapse>
            </Card>
        
        )
    }
}

export default withStyles(styles)(Result);