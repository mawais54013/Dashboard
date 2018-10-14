import React, { Component } from "react";
import API from "../utils/API";
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add'
import WeatherIC from "./InformationCards/WeatherIC"
import Dialog from '@material-ui/core/Dialog';
import ToggleDisplay from 'react-toggle-display';
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

class News extends Component {
    state = {
        open: false,
        // show: false,
        showNews: false,
        news: [],
    }

    componentWillMount() {
        this.getNews();
    }
    getNews = () => {
        // this.setState({
        //     showNews: !this.state.show
        // });
        API.getNews()
            .then(res => {
                console.log(res.data[0].title);
                this.setState({ news: res.data[0].title })
            })
    };
    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        return (
            <Card>
                <CardHeader title="News"/>

                <CardContent>
                    <Typography>
                        {this.state.news}
                    </Typography>
                </CardContent>
            </Card>
          );
    }
}
export default withStyles(styles)(News);