import React, { Component } from "react";
import API from "../utils/API";
import { withStyles } from '@material-ui/core/styles';
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

class hackJobs extends Component {
    state = {
        open: false,
        hackJob: [],
    }

    componentWillMount() {
        this.hackerJobs();
    }
    hackerJobs = () => {
        // this.setState({
        //     showNews: !this.state.show
        // });
        API.getHackerJobs()
            .then(res => {
                console.log(res.data[0].title);
                this.setState({ hackJob: res.data[0].title })
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
                <CardHeader title="Jobs From HackerNews"/>

                <CardContent>
                    <Typography>
                        {this.state.hackJob}
                    </Typography>
                </CardContent>
            </Card>
          );
    }
}
export default withStyles(styles)(hackJobs);