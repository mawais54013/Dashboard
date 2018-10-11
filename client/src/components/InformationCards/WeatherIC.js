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
                this.setState({ title: title })
            })
            .catch(err => console.log(err));
    }

    componentWillMount() {
        this.getWeather();
    }

    render() {
        const { classes } = this.props;

        return (
            <Card>
                <CardHeader
                    title={this.state.title}
                    subheader="September 14, 2016"
                />
                <CardContent>
                    <Typography paragraph variant="body2">
                        Today's Forecast:
                        </Typography>
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