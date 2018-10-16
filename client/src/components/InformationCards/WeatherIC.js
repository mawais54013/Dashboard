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
import FavoriteIconOutlined from '@material-ui/icons/FavoriteBorderOutlined';
import RefreshIcon from '@material-ui/icons/Refresh';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import API from "../../utils/API";
import moment from 'moment';
import 'moment-timezone';
import WeatherIcon from 'react-icons-weather';


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
        loaded: false,
        favorite: this.props.favorite,
    };

    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    };

    handleFavoriteClick = () => {
        API.setWeatherFavorite({"zip": this.props.zip, "favorite": !this.state.favorite})
        .then(this.setState(state => ({favorite: !state.favorite})))
        .catch(err => console.log(err));
    }

    getWeather = () => {
        API.getWeather(this.props.zip)
            .then(res => {
                const { current, forecast } = res.data;
                let display = {loaded: true};

                display.name =  current.name;
                moment.locale('en');
                display.subtitle = "as of ";
                display.subtitle += moment(current.dt * 1000).format("dddd, MMMM Do YYYY, h:mm:ss a");
                display.temp = current.main.temp + "°F";
                display.tempMax = current.main.temp_max + "°F";
                display.tempMin = current.main.temp_min + "°F";
                display.icon = current.weather[0].id.toString();
                display.description = current.weather[0].main;
                display.wind = current.wind.speed + "MPH " + this.degToCompass(current.wind.deg);
                display.sunrise = moment(current.sys.sunrise * 1000).format("h:mm:ss a");
                display.sunset = moment(current.sys.sunset * 1000).format("h:mm:ss a");
                display.humidity = current.main.humidity + "%";
                
                display.forecast = [];
                let times = forecast.list.map(data => {return(moment(data.dt * 1000).format("HH"))})
                let nearNoon = times.find(time => (time >= 11 && time <= 13));
                let offset = times.indexOf(nearNoon);
                for(let i = 0; i < 5; i++){
                   display.forecast[i] = {day: moment(forecast.list[(i * 8) + offset].dt * 1000).format("dddd")};
                   display.forecast[i].description = forecast.list[(i * 8) + offset].weather[0].main;
                   display.forecast[i].icon = forecast.list[(i * 8) + offset].weather[0].id.toString();;
                   display.forecast[i].temp = forecast.list[(i * 8) + offset].main.temp + "°F";
                   display.forecast[i].max = forecast.list[(i * 8) + offset].main.temp_max + "°F";
                   display.forecast[i].min = forecast.list[(i * 8) + offset].main.temp_min + "°F";
                }

                this.setState(display)
            })
            .catch(err => console.log(err));
    }

    componentDidMount() {
        this.getWeather();
    }
    
    degToCompass(num) {
        var val = Math.floor((num / 22.5) + 0.5);
        var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
        return arr[(val % 16)];
    }

    render() {
        const { classes } = this.props;

        return (
            <Card>
                {this.state.loaded ? (<>
                    <CardHeader
                        title={"Current Weather in " + this.state.name}
                        subheader={this.state.subtitle}
                    />
                    <CardContent>
                        <Grid container spacing={8}>
                            <Grid item xs={12} sm>
                                <Typography paragraph align="center" variant="title">
                                    <WeatherIcon name="owm" iconId={this.state.icon} />
                                </Typography>
                                <Typography paragraph align="center" variant="body1">
                                    {this.state.description}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm container direction="column">
                                <Grid item xs>
                                <Typography>Temp: {this.state.temp}</Typography>
                                <Typography gutterBottom color="textSecondary">Max: {this.state.tempMax}</Typography>
                                <Typography gutterBottom color="textSecondary">Min: {this.state.tempMin}</Typography>
                                <Typography>Humidity: {this.state.humidity}</Typography>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm container direction="column">
                                <Grid item xs>
                                <Typography>Wind: {this.state.wind}</Typography>
                                <Typography>Sunrise: {this.state.sunrise}</Typography>
                                <Typography>Sunset: {this.state.sunset}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                    </CardContent>
                    <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Typography paragraph variant="body2">
                                Extended Forecast:
                            </Typography>
                        <Grid container spacing={8}>
                        {this.state.forecast.map((day, i) => 
                            <Grid item xs={12} sm key={i}>
                            <Typography>{day.day}</Typography>
                            <Typography><WeatherIcon name="owm" iconId={day.icon} />{day.description}</Typography>
                            <Typography>Temp: {day.temp}</Typography>
                            <Typography>Max: {day.max}</Typography>
                            <Typography>Min: {day.min}</Typography>

                        </Grid>
                        )}
                        </Grid>

                        </CardContent>
                    </Collapse>
                    <CardActions className={classes.actions} disableActionSpacing>
                        <IconButton aria-label="Add to favorites"
                            onClick={this.handleFavoriteClick}>
                            {this.state.favorite ? (<FavoriteIcon color="primary" />) : (<FavoriteIconOutlined color="primary" />)}
                        </IconButton>
                        <IconButton aria-label="Refresh"
                            onClick={this.getWeather}>
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
                </>) : (<><LinearProgress variant="query" /></>)}
            </Card>

        )
    }
}

export default withStyles(styles)(Result);