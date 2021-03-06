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
            if (res.data.results){
              let title = "Current Events in " + res.data.results[0].venue.city;
              this.setState({ title: title })
              this.setState({ events: res.data.results[0].name})
            }
        })
        .catch(err => console.log(err));
    }
    componentDidMount() {
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
            </Card>
        )
    }
}
export default withStyles(styles)(Results);

