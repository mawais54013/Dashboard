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

class Results extends Component {
    state = {
        expanded: false,
        title: "Current Events in [City]",
        events: [],
    };
    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    };

    getEvents = () => {
        this.setState({
            show: this.state.show
        });
        API.getEvents(this.props.zip)
        .then(res => {
            console.log(res);
            let title = "Current Events in " + res.data.results[0].venue.city;
            this.setState({ title: title })
            this.setState({ events: res.data.results[0].name})
        })
        .catch(err => console.log(err));
    }
    componentWillMount() {
        this.getEvents();
    }

    render() {
        const { classes } = this.props;

        return (
            <Card>
                <CardHeader 
                    title={this.state.title}
                />
                <CardContent>
                    <Typography paragraph variant="body2">
                        Events
                    </Typography>
                        {this.state.events}
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
export default withStyles(styles)(Results);

